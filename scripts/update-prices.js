// scripts/update-prices.js
const fs = require('fs');
const path = require('path');

const pricesPath = path.join(__dirname, '../prices.json');
const htmlPath = path.join(__dirname, '../fuel-finder.html');

const prices = JSON.parse(fs.readFileSync(pricesPath, 'utf8'));
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace figures inside specific span IDs
html = html.replace(/id="price-unleaded">[^<]*</g, `id="price-unleaded">${prices.unleaded}<`);
html = html.replace(/id="price-diesel">[^<]*</g, `id="price-diesel">${prices.diesel}<`);
html = html.replace(/id="price-supreme">[^<]*</g, `id="price-supreme">${prices.supreme_unleaded}<`);

const dateString = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});
html = html.replace(/id="price-updated">[^<]*</g, `id="price-updated">${dateString}<`);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fuel prices updated successfully for', dateString);
