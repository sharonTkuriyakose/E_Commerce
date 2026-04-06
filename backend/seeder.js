import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './products.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    });

    // Create Regular User
    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
      isAdmin: false,
    });

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    // Create Sample Orders
    const orderItems = [
      {
        name: createdProducts[0].name,
        quantity: 1,
        image: createdProducts[0].image,
        price: createdProducts[0].price,
        product: createdProducts[0]._id,
      },
      {
        name: createdProducts[1].name,
        quantity: 1,
        image: createdProducts[1].image,
        price: createdProducts[1].price,
        product: createdProducts[1]._id,
      },
    ];

    const totalPrice = createdProducts[0].price + createdProducts[1].price + 25.0;

    const sampleOrder = {
      user: regularUser._id,
      orderItems,
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      paymentMethod: 'PayPal',
      taxPrice: 15.0,
      shippingPrice: 10.0,
      totalPrice: totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      isDelivered: false,
    };

    await Order.create(sampleOrder);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
