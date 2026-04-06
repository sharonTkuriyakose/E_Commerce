import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB. Database: ${mongoose.connection.db.databaseName}`);

        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const orderCount = await Order.countDocuments();

        const admin = await User.findOne({ isAdmin: true });
        console.log(`Admin lastLogin: ${admin ? admin.lastLogin : 'N/A'}`);

        console.log(`Users: ${userCount}`);
        console.log(`Products: ${productCount}`);
        console.log(`Orders: ${orderCount}`);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkData();
