const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://admin:admin@gofoodnew.32hvyuj.mongodb.net/GoFoodMERN?retryWrites=true&w=majority&appName=GoFoodNew';

const testConnection = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("Connected Successfully to MongoDB");

    // Optionally, you can try to insert a test document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'Test' });

    console.log("Test document inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}

testConnection();
