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

const categories = ['smartphones', 'laptops', 'audio', 'wearables', 'gaming', 'cameras'];

const imageMap = {
  smartphones: ['/images/products/iphone.png', '/images/products/samsung.png', '/images/products/pixel.png', '/images/products/xiaomi.png', '/images/products/oneplus.png', '/images/products/rogphone.png'],
  laptops: ['/images/products/macbook.png', '/images/products/dell.png', '/images/products/razer.png', '/images/products/surface.png', '/images/products/thinkpad.png', '/images/products/zephyrus.png'],
  audio: ['/images/products/headphones.png', '/images/products/airpods.png', '/images/products/bose.png', '/images/products/sennheiser.png', '/images/products/beats.png'],
  wearables: ['/images/products/watch.png', '/images/products/galaxy_watch.png', '/images/products/garmin.png', '/images/products/fitbit.png', '/images/products/amazfit.png'],
  gaming: ['/images/products/controller.png', '/images/products/xbox_controller.png'],
  cameras: ['/images/products/camera.png', '/images/products/sonya7.png']
};

const words = ['Pro', 'Ultra', 'Max', 'Lite', 'Edition', 'Gen 2', 'Plus', 'X', 'Series', 'V', 'Elite'];
const brands = {
  smartphones: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Sony', 'Oppo'],
  laptops: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer'],
  audio: ['Sony', 'Bose', 'Apple', 'Sennheiser', 'JBL'],
  wearables: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit'],
  gaming: ['Sony', 'Microsoft', 'Nintendo', 'Razer', 'Logitech'],
  cameras: ['Canon', 'Nikon', 'Sony', 'Panasonic', 'Fujifilm']
};

const newProducts = [];
let adminUser = null;

// Generate 10 products per category
categories.forEach(category => {
  for (let i = 1; i <= 10; i++) {
    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
    const word = words[Math.floor(Math.random() * words.length)];
    const imageList = imageMap[category];
    const image = imageList[Math.floor(Math.random() * imageList.length)];
    
    newProducts.push({
      name: `${brand} ${category.substring(0, category.length-1).charAt(0).toUpperCase() + category.substring(1, category.length-1)} ${word} ${Math.floor(Math.random() * 100)}`,
      price: Math.floor(Math.random() * 900) + 99,
      rating: +(Math.random() * 1 + 4).toFixed(1),
      category: category,
      description: `Incredible new ${category.substring(0, category.length-1)} by ${brand} offering uncompromised performance and sleek design.`,
      image: image,
      brand: brand,
      countInStock: Math.floor(Math.random() * 50) + 1,
      numReviews: Math.floor(Math.random() * 200) + 5
    });
  }
});

const allProducts = [...existingProducts, ...newProducts];

// 1. Update the physical array file so it's saved forever
const fileContent = `const products = ${JSON.stringify(allProducts, null, 2)};\n\nexport default products;\n`;
fs.writeFileSync(path.join(__dirname, 'products.js'), fileContent);
console.log('Upgraded local products.js file.');

// 2. Insert into MongoDB immediately
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Pushing new products to DB...');
    // Only grab admin user or first user to set as the user who created it
    const User = (await import('./models/User.js')).default;
    const admin = await User.findOne({ isAdmin: true });
    
    const dbProducts = newProducts.map(p => ({
      ...p,
      user: admin ? admin._id : undefined
    }));

    await Product.insertMany(dbProducts);
    console.log(`Successfully added ${dbProducts.length} new products to the database!`);
    process.exit();
  })
  .catch(err => {
    console.error('Failed to update db:', err);
    process.exit(1);
  });
