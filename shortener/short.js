const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const shortLinks = new Map();

function generateShortLink(url) {
  const shortId = Math.random().toString(36).substr(2, 7);
  const shortLink = `http://short.ie/${shortId}`;
  shortLinks.set(shortLink, url);
  return shortLink;
}

rl.question('Enter the URL: ', (url) => {
  const shortLink = generateShortLink(url);
  console.log('Short link:', shortLink);
  rl.close();
});
