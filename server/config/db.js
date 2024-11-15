const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log('MongoDB connected');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
