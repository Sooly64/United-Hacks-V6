// src/services/linkedinService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI server

const linkedinAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const linkedinService = {
  // Scrape profiles
  scrapeProfiles: async (profileUrls) => {
    const response = await linkedinAPI.post('/scrape/profile', {
      profile_urls: profileUrls
    });
    return response.data;
  },

  // Analyze profiles with AI
  analyzeProfile: async (profileUrls) => {
    const response = await linkedinAPI.post('/analyze/profile', {
      profile_urls: profileUrls
    });
    return response.data;
  },

  // Scrape companies
  scrapeCompanies: async (companyUrls) => {
    const response = await linkedinAPI.post('/scrape/company', {
      company_urls: companyUrls
    });
    return response.data;
  },

  // Search jobs
  searchJobs: async (keyword, location, maxPages = null) => {
    const response = await linkedinAPI.post('/scrape/job-search', {
      keyword,
      location,
      max_pages: maxPages
    });
    return response.data;
  },

  // Scrape specific jobs
  scrapeJobs: async (jobUrls) => {
    const response = await linkedinAPI.post('/scrape/jobs', {
      job_urls: jobUrls
    });
    return response.data;
  },

  // Scrape articles
  scrapeArticles: async (articleUrls) => {
    const response = await linkedinAPI.post('/scrape/articles', {
      article_urls: articleUrls
    });
    return response.data;
  }
};