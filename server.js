// DEPENDECIES
const express = require('express'); //Express Dependency
const app = express();// App Dependency
const mongoose = require('mongoose'); // Mongoose Dependency
const dotenv = require('dotenv'); // Dotenv Dependency
dotenv.config(); // loads env variables
const port = process.env.PORT; //Port Variable


// MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI); // Connect to mongodb using the connection string.
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`) // show that i am connedted to mongodb with the connecteon name
})


// Import Fruit Model!
const Fruit = require("./models/fruit.js")

app.use(express.urlencoded({ extended: false }));

// ROUTES

// GET/TEST ROUTE
// app.get("/", async (req, res) => {
//     res.send("HELLO WORLD!")
// });

// INDEX
app.get("/", async (req, res) => {
    res.render("index.ejs")
});

// NEW
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
});

// D.

// U.

// CREATE
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);

    res.redirect("/fruits/new")
});

// E.

// S.


// PORT - One of 3 ways to use the port variable
app.listen(3000, () => {
    console.log(`Listening on port 300`);
});

