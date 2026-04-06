import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import existingProducts from './products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const mapImage = (category, brand) => {
  brand = brand.toLowerCase();
  
  if (category === 'smartphones') {
    if (brand === 'apple') return '/images/products/iphone.png';
    if (brand === 'samsung') return '/images/products/samsung.png';
    if (brand === 'google') return '/images/products/pixel.png';
    if (brand === 'xiaomi') return '/images/products/xiaomi.png';
    if (brand === 'oneplus') return '/images/products/oneplus.png';
    return '/images/products/rogphone.png'; // default generic
  }
  
  if (category === 'laptops') {
    if (brand === 'apple') return '/images/products/macbook.png';
    if (brand === 'dell') return '/images/products/dell.png';
    if (brand === 'lenovo') return '/images/products/thinkpad.png';
    if (brand === 'asus') return '/images/products/zephyrus.png';
    if (brand === 'hp') return '/images/products/surface.png'; // fallback
    return '/images/products/razer.png'; // default generic
  }

  if (category === 'audio') {
    if (brand === 'apple') return '/images/products/airpods.png';
    if (brand === 'sony') return '/images/products/headphones.png';
    if (brand === 'bose') return '/images/products/bose.png';
    if (brand === 'sennheiser') return '/images/products/sennheiser.png';
    return '/images/products/beats.png'; // fallback
  }

  if (category === 'wearables') {
    if (brand === 'apple') return '/images/products/watch.png';
    if (brand === 'samsung') return '/images/products/galaxy_watch.png';
    if (brand === 'garmin') return '/images/products/garmin.png';
    if (brand === 'fitbit') return '/images/products/fitbit.png';
    if (brand === 'amazfit') return '/images/products/amazfit.png';
  }

  if (category === 'gaming') {
    if (brand === 'sony') return '/images/products/controller.png';
    if (brand === 'microsoft') return '/images/products/xbox_controller.png';
    if (brand === 'nintendo') return '/images/products/xbox_controller.png'; // fallback
    return '/images/products/controller.png'; 
  }

  if (category === 'cameras') {
    if (brand === 'sony') return '/images/products/sonya7.png';
    if (brand === 'fujifilm') return '/images/products/sonya7.png';
    return '/images/products/camera.png'; // default canon/nikon
  }

  return '/images/products/iphone.png'; // absolute bare minimum fallback
};

console.log('Fixing generated products...');

// Clean and fix products
const fixedProducts = existingProducts.map((p, index) => {
  // Only fix the 60 new ones (index 26 and above) because the originals are already strictly styled
  // Or fallback if brand is undefined
  if (index >= 26 && p.brand) {
    p.image = mapImage(p.category, p.brand);
  }
  return p;
});

// Write to products.js
const fileContent = `const products = ${JSON.stringify(fixedProducts, null, 2)};\n\nexport default products;\n`;
fs.writeFileSync(path.join(__dirname, 'products.js'), fileContent);
console.log('Overwritten products.js file with correct brand mappings.');

// Update Mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Wiping current products...');
    await Product.deleteMany({});
    
    console.log('Inserting fixed products...');
    await Product.insertMany(fixedProducts);
    console.log('Database synced successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
    process.exit(1);
  });
