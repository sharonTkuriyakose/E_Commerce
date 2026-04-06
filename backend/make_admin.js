import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, required: true, default: false }
}, { strict: false });

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Upgrading all users to Admin...');
    const result = await User.updateMany({}, { $set: { isAdmin: true } });
    console.log(`Success! Modified ${result.modifiedCount} user(s) to be Admins.`);
    process.exit();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
