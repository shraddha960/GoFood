const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://admin:admin@gofoodnew.32hvyuj.mongodb.net/GoFoodMERN?retryWrites=true&w=majority&appName=GoFoodNew'

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected Successfully");

        const db = mongoose.connection.db;
        const foodItemsCollection = db.collection('food_items');
        const data = await foodItemsCollection.find({}).toArray();

        const foodCategoryCollection = db.collection('food_category');
        const categoryData = await foodCategoryCollection.find({}).toArray();
        // console.log(categoryCata

        global.food_items = data
        global.food_category = categoryData
        // console.log(global.food_items)

    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }


module.exports = mongoDB
