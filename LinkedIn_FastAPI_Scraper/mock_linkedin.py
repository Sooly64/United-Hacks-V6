"""
Mock LinkedIn scraper for testing without SCRAPFLY API
"""

import asyncio
from typing import Dict, List

def refine_profile(data: Dict) -> Dict: 
    """refine and clean the parsed profile data"""
    return {
        "profile": data,
        "posts": []
    }

async def scrape_profile(urls: List[str]) -> List[Dict]:
    """mock scrape public linkedin profile pages"""
    mock_data = {
        "name": "John Doe",
        "description": "Senior Software Engineer at Tech Company",
        "jobTitle": "Senior Software Engineer",
        "address": {
            "addressLocality": "San Francisco, CA"
        },
        "worksFor": [{
            "name": "Tech Company"
        }],
        "alumniOf": [{
            "name": "University of Technology"
        }],
        "knowsAbout": ["Software Development", "Python", "JavaScript", "Cloud Computing"]
    }
    
    # Return mock data for each URL
    result = []
    for url in urls:
        result.append(refine_profile(mock_data))
    
    return result

async def scrape_company(urls: List[str]) -> List[Dict]:
    """mock scrape company pages"""
    return [{"overview": {}, "life": {}} for _ in urls]
 
async def scrape_job_search(keyword: str, location: str, max_pages: int = None) -> List[Dict]:
    """mock scrape job search"""
    return []

async def scrape_jobs(urls: List[str]) -> List[Dict]:
    """mock scrape job pages"""
    return []

async def scrape_articles(urls: List[str]) -> List[Dict]:
    """mock scrape articles"""
    return []
