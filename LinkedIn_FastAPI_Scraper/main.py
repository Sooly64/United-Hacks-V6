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
    allow_origins=[
        "https://united-hacks-v6.vercel.app",
        "http://localhost:3000",
    ],
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
        
        # Detailed AI analysis prompt using scraped data
        analysis_prompt = f"""Based on this detailed profile data, provide comprehensive networking advice for students:

Name: {profile.get('name')}
Role: {profile.get('jobTitle')}
Location: {profile.get('location')}
Education: {profile.get('education')}
About: {profile.get('description')}

Using this specific information, give detailed networking advice including:
1. **Conversation Starters**: Specific topics to mention based on their background
2. **Timing & Approach**: When and how to reach out effectively
3. **Value Proposition**: What students can offer in return
4. **Follow-up Strategy**: How to maintain the connection
5. **Leverage Points**: How to use their education, location, and work history
6. **Networking Pitfalls to Avoid**: Common mistakes to prevent

Format your response in markdown with clear sections. Be specific and actionable based on actual profile data provided. Avoid generic advice."""
        
        print(f"Sending to AI: {analysis_prompt[:100]}...")
        
        # Get AI analysis with proper timeout
        try:
            # Create coroutine by running sync call in thread
            api_call = asyncio.to_thread(
                client.completions.create,
                model="deepseek-ai/DeepSeek-R1-0528",
                prompt=analysis_prompt
            )
            
            # Wait for the coroutine with timeout
            response = await asyncio.wait_for(api_call, timeout=60.0)
            
            ai_analysis = response.choices[0].text
            # Clean up any thinking tags or special formatting
            ai_analysis = ai_analysis.replace('</think>', '').replace('</think>', '').strip()
            
            # Remove the prompt from the response if it's included
            # Look for the first line of the prompt to find where the actual response starts
            prompt_first_line = "Based on this detailed profile data"
            prompt_start = ai_analysis.find(prompt_first_line)
            if prompt_start != -1:
                # Find the end of the prompt by looking for the first section header
                sections_start = ai_analysis.find("1. **Conversation Starters**")
                if sections_start != -1:
                    ai_analysis = ai_analysis[sections_start:].strip()
                else:
                    # Fallback: remove everything before the first numbered item
                    first_number = ai_analysis.find("1.")
                    if first_number != -1:
                        ai_analysis = ai_analysis[first_number:].strip()
            
            # Add disclaimer
            ai_analysis += "\n\n---\n\n*⚠️ **Demo Notice**: This demo only works with Bill Gates' profile. Full LinkedIn scraping requires additional API keys and setup.*"
            
            print(f"AI Response: {ai_analysis[:100]}...")
        except asyncio.TimeoutError:
            raise HTTPException(status_code=500, detail="AI request timed out after 60 seconds")
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
