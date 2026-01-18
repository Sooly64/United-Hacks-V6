from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import openai
import os
import asyncio
from dotenv import load_dotenv

# Load environment variables from config file
load_dotenv('config.env')

# API keys should only be loaded from environment variables
FEATHERLESS_API_KEY = os.environ.get('FEATHERLESS_API_KEY')

if not FEATHERLESS_API_KEY:
    raise ValueError("FEATHERLESS_API_KEY environment variable is required")

# Initialize OpenAI client
client = openai.OpenAI(
    base_url='https://api.featherless.ai/v1',
    api_key=FEATHERLESS_API_KEY
)

# 1. Make your FastAPI app
app = FastAPI()

# 2. Allow React to call your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define request bodies
class ProfileRequest(BaseModel):
    profile_urls: List[str]

# 4. The API endpoints
@app.post("/scrape/profile")
async def scrape_profile(req: ProfileRequest):
    """Return simplified Bill Gates profile data"""
    try:
        # Minimal profile data for low token usage
        profile_data = {
            "name": "Bill Gates",
            "jobTitle": "Technology Advisor, Co-chair Bill & Melinda Gates Foundation",
            "location": "Seattle, Washington",
            "education": "Harvard University",
            "description": "Co-founder of Microsoft, philanthropist, global health and education advocate"
        }
        
        return {"success": True, "data": [profile_data]}
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Profile data failed: {str(e)}"
        )


@app.post("/analyze/profile")
async def analyze_profile(req: ProfileRequest):
    try:
        # Get simplified profile data
        profile_data = await scrape_profile(req)
        
        if not profile_data["success"] or not profile_data["data"]:
            raise HTTPException(status_code=400, detail="No profile data available")
        
        profile = profile_data["data"][0]
        
        # Simple AI analysis prompt with minimal data
        analysis_prompt = f"""
Analyze this profile and give student networking advice:
Name: {profile.get('name')}
Role: {profile.get('jobTitle')}
Location: {profile.get('location')}
Education: {profile.get('education')}
About: {profile.get('description')}

Give specific networking advice in 2-3 sentences. Focus on how students should connect.
"""
        
        print(f"Sending to AI: {analysis_prompt[:100]}...")
        
        # Get AI analysis with proper timeout
        try:
            # Create the coroutine by running sync call in thread
            api_call = asyncio.to_thread(
                client.chat.completions.create,
                model="deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
                messages=[{"role": "user", "content": analysis_prompt}],
                max_tokens=150
            )
            
            # Wait for the coroutine with timeout
            response = await asyncio.wait_for(api_call, timeout=30.0)
            
            ai_analysis = response.choices[0].message.content
            # Clean up any thinking tags or special formatting
            ai_analysis = ai_analysis.replace('</think>', '').replace('</think>', '').strip()
            print(f"AI Response: {ai_analysis[:100]}...")
        except asyncio.TimeoutError:
            raise HTTPException(status_code=500, detail="AI request timed out after 30 seconds")
        except Exception as ai_error:
            raise HTTPException(status_code=500, detail=f"AI API error: {str(ai_error)}")
        
        return {
            "success": True, 
            "profile": profile,
            "ai_analysis": ai_analysis
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")


@app.get("/")
def root():
    return {"message": "LinkedIn Profile Analyzer API", "endpoints": [
        "/scrape/profile",
        "/analyze/profile"
    ]}
