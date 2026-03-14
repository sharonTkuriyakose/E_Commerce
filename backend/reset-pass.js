import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: 'rdxsharon10@gmail.com' });
        
        if (user) {
            user.password = '123456';
            await user.save();
            console.log('PASSWORD_RESET_SUCCESS');
        } else {
            // Create user if doesn't exist
            await User.create({
                name: 'Sharon',
                email: 'rdxsharon10@gmail.com',
                password: '123456'
            });
            console.log('USER_CREATED_WITH_PASSWORD_123456');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetPassword();
