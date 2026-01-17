// testScraper.js
import JinaScraper from './src/scraper/jinaScraper.js';

async function testScraper() {
  console.log('Testing LinkedIn Scraper...\n');
  
  const scraper = new JinaScraper();
  
  // Test with a public LinkedIn profile
  const testUrl = 'https://www.linkedin.com/in/ajay1b44888/';
  
  try {
    console.log('Scraping profile:', testUrl);
    const result = await scraper.scrapeProfile(testUrl);
    
    console.log('\n=== SCRAPING RESULTS ===');
    console.log('Name:', result?.name || 'Not found');
    console.log('Direct Bio:', result?.directBio || 'Not found');
    console.log('\nPosts found:', result?.posts?.length || 0);
    
    if (result?.posts && result.posts.length > 0) {
      console.log('\n=== FIRST 3 POSTS ===');
      result.posts.slice(0, 3).forEach((post, index) => {
        console.log(`\nPost ${index + 1}:`);
        console.log('Time:', post.time || 'No time');
        console.log('Text:', post.text || 'No text');
        console.log('---');
      });
    }
    
    console.log('\n=== FULL RESULT OBJECT ===');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the test
testScraper();
