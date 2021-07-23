const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://root:root@cluster0.drnfm.mongodb.net/FaceRecognitionDB?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;