import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import User from './models/User.js';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({});
        
        let output = '--- USERS IN DATABASE ---\n';
        users.forEach(u => {
            output += `Name: ${u.name}, Email: ${u.email}\n`;
        });
        output += '--- END USERS ---\n';
        
        fs.writeFileSync('u_list.txt', output);
        process.exit();
    } catch (error) {
        process.exit(1);
    }
};

checkUsers();
