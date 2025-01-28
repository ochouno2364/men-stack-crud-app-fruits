//models/fruit.js

// Import mongoose
const mongoose = require('mongoose'); 

// Define The Fruit Schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,

});


// Create the Fruit Model 
const Fruit = mongoose.model('Fruit', fruitSchema);

// Export Fruit Model
module.export = Fruit;  // must import into server.js

