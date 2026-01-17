// src/scraper/linkedinScraper.js
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

class LinkedInScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    // TODO: Add proper browser setup and configuration
    this.browser = await puppeteer.launch({
      headless: false, // Show browser for debugging
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    this.page = await this.browser.newPage();
    
    // Set realistic user agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set viewport and extra headers
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache'
    });
  }

  async scrapeProfile(profileUrl) {
    try {
      await this.initialize();
      
      console.log(`Scraping LinkedIn profile: ${profileUrl}`);
      
      // Strategy 1: Try direct profile URL first
      console.log('Attempting direct profile access...');
      await this.page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 10000 });
      
      // Wait and check if we hit login wall
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check if we're on login page
      const isLoginPage = await this.page.evaluate(() => {
        return document.location.href.includes('/login') || 
               document.querySelector('.login__form') !== null;
      });
      
      if (isLoginPage) {
        console.log('Hit login wall, trying public profile view...');
        
        // Strategy 2: Try public profile view
        const publicUrl = profileUrl.replace('https://www.linkedin.com/in/', 'https://r.jina.ai/http://www.linkedin.com/in/');
        
        try {
          const response = await fetch(publicUrl);
          if (response.ok) {
            const text = await response.text();
            const profileData = this.parsePublicProfile(text);
            
            await this.cleanup();
            
            return {
              name: profileData.name,
              directBio: profileData.bio,
              posts: profileData.posts
            };
          }
        } catch (error) {
          console.log('Public view failed, continuing with page scraping...');
        }
      }
      
      // If not login page, proceed with normal scraping
      if (!isLoginPage) {
        // Take screenshot for debugging
        await this.page.screenshot({ path: 'profile-screenshot.png' });
        console.log("Profile screenshot saved as profile-screenshot.png");
        
        // Extract profile data
        const profileData = await this.page.evaluate(() => {
        const data = {};
        
        // Extract name
        const nameElement = document.querySelector('h1.t-24.v-align-middle.break-words');
        data.name = nameElement ? nameElement.innerText.trim() : '';
        
        // Extract headline/title
        const headlineElement = document.querySelector('div.text-body-medium.break-words');
        data.headline = headlineElement ? headlineElement.innerText.trim() : '';
        
        // Extract bio/description
        const bioElement = document.querySelector('div.text-color-text');
        data.bio = bioElement ? bioElement.innerText.trim() : '';
        
        // Extract location
        const locationElement = document.querySelector('span.text-body-small.inline.t-black--light.break-words');
        data.location = locationElement ? locationElement.innerText.trim() : '';
        
        return data;
      });
      
      // Extract posts
      const posts = await this.extractPosts();
      
      await this.cleanup();
      
      return {
        name: profileData.name,
        directBio: profileData.bio,
        posts: posts
      };
      
    } catch (error) {
      console.error('Error scraping LinkedIn profile:', error);
      await this.cleanup();
      return null;
    }
  }

  async extractPosts() {
    try {
      // Scroll to load more posts
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract posts from the page
      const posts = await this.page.evaluate(() => {
        const postElements = document.querySelectorAll('[data-urn^="post:"]');
        const postsArray = [];
        
        postElements.forEach((element, index) => {
          if (index < 10) { // Limit to first 10 posts
            const postText = element.querySelector('.feed-shared-text')?.innerText || '';
            const postTime = element.querySelector('.feed-shared-time__text')?.innerText || '';
            
            if (postText) {
              postsArray.push({
                text: postText.trim(),
                time: postTime.trim()
              });
            }
          }
        });
        
        return postsArray;
      });
      
      return posts;
      
    } catch (error) {
      console.error('Error extracting posts:', error);
      return [];
    }
  }

  async cleanup() {
    if (this.page) {
      await this.page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export default LinkedInScraper;
