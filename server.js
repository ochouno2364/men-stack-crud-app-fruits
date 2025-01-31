// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require("dotenv");
dotenv.config(); //loads env variables
const port = process.env.PORT;



// MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI) // database connection
// Connection Status in Terminal
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// Import Fruit Model!
const Fruit = require("./models/fruit.js")

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('morgan'));

// ROUTES

// GET/TEST ROUTE
// app.get("/", async (req, res) => {
//     res.send("HELLO WORLD!")
// });

// HOME / LANDING
app.get("/", async (req, res) => {
    res.render('index.ejs');
});

// INDEX  ROUTE
app.get("/fruits", async (req, res) => {
    // res.render("index.ejs")
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', {fruits: allFruits});
});

// NEW   ROUTE
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");

});

// (D)ELETE ROUTE
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

// (U)PDATE   ROUTE
// server.js

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  

// (C)REATE ROUTE
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);

    res.redirect("/fruits")
});

// (E)DIT ROUT
app.get('/fruits/:fruitId/edit', async (req,res)=> {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit);
    res.render('fruits/edit.ejs', {
        fruit: foundFruit,
    });
})

// (S)HOW ROUTE
app.get('/fruits/:fruitId', async (req, res)=> {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {fruit: foundFruit});
})


// PORT - One of 3 ways to use the port variable
app.listen(port, () => {
    console.log(`Listening on port: `, port)
});