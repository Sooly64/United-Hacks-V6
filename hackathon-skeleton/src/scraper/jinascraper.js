// src/scraper/jinaScraper.js
// Jina AI scraper for LinkedIn profiles

class JinaScraper {
  constructor() {
    this.apiKey = 'jina_3513989e7b0344b4b09aa90f46505556acFC2JPS40JOO5XLlLmU1x4Eq7ff';
    this.baseUrl = 'https://r.jina.ai/http://';
  }

  async scrapeProfile(profileUrl) {
    try {
      console.log(`Scraping LinkedIn profile via Jina AI: ${profileUrl}`);
      
      // Use Jina AI with API key - remove https:// from profile URL
      const cleanUrl = profileUrl.replace('https://', '');
      const jinaUrl = `${this.baseUrl}${cleanUrl}`;
      
      const response = await fetch(jinaUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Jina AI API error:', errorText);
        throw new Error(`Jina AI request failed: ${response.status} - ${errorText}`);
      }
      
      const text = await response.text();
      console.log('Jina AI raw response length:', text.length);
      console.log('First 500 chars:', text.substring(0, 500));
      
      // Parse the extracted content
      const profileData = this.parseProfileData(text);
      
      console.log('✅ Jina AI extraction successful!');
      console.log(`📝 Found name: ${profileData.name}`);
      console.log(`📝 Found bio: ${profileData.bio.substring(0, 100)}...`);
      console.log(`📝 Found ${profileData.posts.length} posts`);
      
      return {
        name: profileData.name,
        directBio: profileData.bio,
        posts: profileData.posts
      };
      
    } catch (error) {
      console.error('❌ Error scraping with Jina AI:', error.message);
      return null;
    }
  }

  parseProfileData(text) {
    const data = {
      name: '',
      bio: '',
      posts: []
    };
    
    // Extract name - look for LinkedIn name patterns
    const namePatterns = [
      /([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:is|works at|is a|has been))/,
      /([A-Z][a-z]+ [A-Z][a-z]+)/,
      /^([A-Z][a-z]+ [A-Z][a-z]+)/
    ];
    
    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match) {
        data.name = match[1] || match[0];
        console.log(`Found name: ${data.name}`);
        break;
      }
    }
    
    // Extract bio - look for About/Summary sections
    const bioPatterns = [
      /(?:About|Summary|Experience|Bio)[:\s]*([^]+?)(?=\n|$)/i,
      /(?:is a|works as|has been)[^]+?(?:\n|$)/i,
      /(?:Software Engineer|Developer|Manager|Director)[^]+?(?:\n|$)/i
    ];
    
    for (const pattern of bioPatterns) {
      const match = text.match(pattern);
      if (match) {
        data.bio = match[1]?.trim() || match[0];
        console.log(`Found bio: ${data.bio.substring(0, 100)}...`);
        break;
      }
    }
    
    // Extract posts - look for recent activity
    const postPatterns = [
      /(?:posted|shared|commented)[^]+?(?:\n|$)/gi,
      /(?:🔍|💼|📝|📊)[^]+?(?:\n|$)/g,
      /(?:excited|proud|happy|great)[^]+?(?:\n|$)/gi
    ];
    
    let posts = [];
    for (const pattern of postPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        matches.slice(0, 5).forEach((match, index) => {
          posts.push({
            text: match.trim(),
            time: `Recently ${index + 1}`
          });
        });
        break;
      }
    }
    
    console.log(`Parsed: ${posts.length} posts`);
    
    return data;
  }
}

export default JinaScraper;
