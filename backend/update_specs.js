import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  specs: { type: Map, of: String },
  countInStock: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

const categorySpecs = {
  smartphones: {
    display: "6.7-inch Super AMOLED, 120Hz",
    chip: "Snapdragon 8 Gen 3 / Apple A17 Pro",
    camera: "50MP Triple System with OIS",
    battery: "5000mAh with 65W Fast Charging",
    os: "Android 14 / iOS 17"
  },
  laptops: {
    display: "15.6-inch 4K OLED / Liquid Retina",
    processor: "Intel Core i9 / Apple M3 Max",
    ram: "32GB LPDDR5X",
    storage: "1TB Gen4 NVMe SSD",
    graphics: "NVIDIA RTX 4080 / 40-Core GPU"
  },
  audio: {
    type: "Over-ear / TWS Wireless",
    battery: "Up to 40 Hours with ANC",
    noise_cancelling: "Active Noise Cancellation Pro",
    connectivity: "Bluetooth 5.3, Multi-point",
    water_resistance: "IPX4 Sweat Resistant"
  },
  wearables: {
    display: "1.4-inch AMOLED Always-on",
    battery: "Up to 14 Days (Standard Mode)",
    sensors: "Heart Rate, SpO2, ECG, Sleep Tracking",
    gps: "Dual-band Multi-GNSS",
    durability: "5ATM Water Resistant, Sapphire Glass"
  },
  gaming: {
    connectivity: "Low-latency Wireless / Wired",
    features: "Adaptive Triggers, Haptic Feedback",
    compatibility: "PC, PS5, Xbox Series X/S",
    battery: "Up to 30 Hours Playtime",
    sensor: "20,000 DPI Optical Sensor"
  },
  cameras: {
    sensor: "33MP Full-frame CMOS",
    video: "4K 120fps / 8K 30fps",
    autofocus: "Real-time Eye AF (Human/Animal)",
    stabilization: "5-axis In-body Image Stabilization",
    iso_range: "100 - 51,200 (Expandable)"
  }
};

const updateProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e_commerce';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    let updatedCount = 0;
    for (const product of products) {
      if (!product.specs || product.specs.size === 0) {
        const specs = categorySpecs[product.category.toLowerCase()] || {
          build: "Premium Industrial Grade",
          performance: "Optimized High-Efficiency",
          warranty: "1 Year Global Coverage"
        };
        
        product.specs = specs;
        await product.save();
        updatedCount++;
      }
    }

    console.log(`Updated specs for ${updatedCount} products`);
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
};

updateProducts();
