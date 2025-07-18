#!/usr/bin/env node

const https = require('https');
const http = require('http');

const urls = [
  'http://localhost:3002',
  'http://localhost:3002/narrative',
  'http://localhost:3002/worlds',
  'http://localhost:3002/about',
  'http://localhost:3002/photos',
  'http://localhost:3002/writing',
  'http://localhost:3002/tunes',
  'http://localhost:3002/movies'
];

function extractMetaTags(html) {
  const metaTags = {};
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) metaTags.title = titleMatch[1];
  
  // Extract description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) metaTags.description = descMatch[1];
  
  // Extract Open Graph tags
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitleMatch) metaTags.ogTitle = ogTitleMatch[1];
  
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  if (ogDescMatch) metaTags.ogDescription = ogDescMatch[1];
  
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) metaTags.ogImage = ogImageMatch[1];
  
  // Extract Twitter tags
  const twitterTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/i);
  if (twitterTitleMatch) metaTags.twitterTitle = twitterTitleMatch[1];
  
  const twitterDescMatch = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']+)["']/i);
  if (twitterDescMatch) metaTags.twitterDescription = twitterDescMatch[1];
  
  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  if (twitterImageMatch) metaTags.twitterImage = twitterImageMatch[1];
  
  return metaTags;
}

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const metaTags = extractMetaTags(data);
        resolve({ url, metaTags, status: res.statusCode });
      });
    }).on('error', (err) => {
      reject({ url, error: err.message });
    });
  });
}

async function testAllUrls() {
  console.log('🔍 Testing metadata for all pages...\n');
  
  for (const url of urls) {
    try {
      const result = await testUrl(url);
      console.log(`📄 ${result.url}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Title: ${result.metaTags.title || '❌ Missing'}`);
      console.log(`   Description: ${result.metaTags.description || '❌ Missing'}`);
      console.log(`   OG Title: ${result.metaTags.ogTitle || '❌ Missing'}`);
      console.log(`   OG Image: ${result.metaTags.ogImage || '❌ Missing'}`);
      console.log(`   Twitter Title: ${result.metaTags.twitterTitle || '❌ Missing'}`);
      console.log('');
    } catch (error) {
      console.log(`❌ ${error.url}: ${error.error}\n`);
    }
  }
  
  console.log('✅ Testing complete!');
  console.log('\n🌐 For live social media previews, visit:');
  console.log('   • Facebook: https://developers.facebook.com/tools/debug/');
  console.log('   • Twitter: https://cards-dev.twitter.com/validator');
  console.log('   • LinkedIn: https://www.linkedin.com/post-inspector/');
  console.log('   • Universal: https://metatags.io/');
}

// Run the test
testAllUrls().catch(console.error); 