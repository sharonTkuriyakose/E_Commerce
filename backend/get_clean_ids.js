import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const p1 = await Product.findOne({ name: /iPhone/i });
        const p2 = await Product.findOne({ name: /Sony WH-1000XM5/i });
        
        console.log('---START_IDS---');
        if (p1) console.log(`IPHONE:${p1._id.toString()}`);
        if (p2) console.log(`HEADPHONES:${p2._id.toString()}`);
        console.log('---END_IDS---');

        process.exit();
    } catch (error) {
        process.exit(1);
    }
};

connectDB();
