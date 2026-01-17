from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import asyncio
import linkedin

# 1. Make your FastAPI app
app = FastAPI()

# 2. Allow React to call your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define request bodies
class ProfileRequest(BaseModel):
    profile_urls: List[str]

class CompanyRequest(BaseModel):
    company_urls: List[str]

class JobSearchRequest(BaseModel):
    keyword: str
    location: str
    max_pages: Optional[int] = None

class JobsRequest(BaseModel):
    job_urls: List[str]

class ArticlesRequest(BaseModel):
    article_urls: List[str]

# 4. The API endpoints
@app.post("/scrape/profile")
async def scrape_profile(req: ProfileRequest):
    try:
        # Configure scraper
        linkedin.BASE_CONFIG["cache"] = False
        linkedin.BASE_CONFIG["debug"] = True
        
        # Scrape profiles
        result = await linkedin.scrape_profile(urls=req.profile_urls)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scrape/company")
async def scrape_company(req: CompanyRequest):
    try:
        # Configure scraper
        linkedin.BASE_CONFIG["cache"] = False
        linkedin.BASE_CONFIG["debug"] = True
        
        # Scrape companies
        result = await linkedin.scrape_company(urls=req.company_urls)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scrape/job-search")
async def scrape_job_search(req: JobSearchRequest):
    try:
        # Configure scraper
        linkedin.BASE_CONFIG["cache"] = False
        linkedin.BASE_CONFIG["debug"] = True
        
        # Scrape job search
        result = await linkedin.scrape_job_search(
            keyword=req.keyword,
            location=req.location,
            max_pages=req.max_pages
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scrape/jobs")
async def scrape_jobs(req: JobsRequest):
    try:
        # Configure scraper
        linkedin.BASE_CONFIG["cache"] = False
        linkedin.BASE_CONFIG["debug"] = True
        
        # Scrape individual jobs
        result = await linkedin.scrape_jobs(urls=req.job_urls)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scrape/articles")
async def scrape_articles(req: ArticlesRequest):
    try:
        # Configure scraper
        linkedin.BASE_CONFIG["cache"] = False
        linkedin.BASE_CONFIG["debug"] = True
        
        # Scrape articles
        result = await linkedin.scrape_articles(urls=req.article_urls)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "LinkedIn Scraper API", "endpoints": [
        "/scrape/profile",
        "/scrape/company", 
        "/scrape/job-search",
        "/scrape/jobs",
        "/scrape/articles"
    ]}
