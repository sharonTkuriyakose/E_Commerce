import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './backend/models/Order.js';

dotenv.config({ path: './backend/.env' });

const checkRecentOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const orders = await Order.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name email');
        console.log(JSON.stringify(orders.map(o => ({
            id: o._id,
            user: o.user ? o.user.name : 'GUEST',
            userId: o.user ? o.user._id : 'NULL',
            total: o.totalPrice,
            createdAt: o.createdAt
        })), null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkRecentOrders();
