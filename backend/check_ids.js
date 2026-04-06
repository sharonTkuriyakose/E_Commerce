import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = mongoose.model('Product', new mongoose.Schema({ name: String }));

const checkIds = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e_commerce';
    await mongoose.connect(mongoUri);
    const targetNames = ['iPhone 15 Pro', 'Sony WH-1000XM5', 'Apple Watch Ultra 2', 'MacBook Pro M3 Max'];
    const p = await Product.find({ name: { $in: targetNames } });
    console.log(JSON.stringify(p.map(x => ({ name: x.name, id: x._id })), null, 2));
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};

checkIds();
