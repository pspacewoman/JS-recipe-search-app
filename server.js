const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Recipe = mongoose.model("Recipe", {
  title: String,
  ingredients: [String],
  instructions: String,
});

app.get("/recipes/search", async (req, res) => {
  const ingredients = req.query.ingredients.split(",");
  const recipes = await Recipe.find({ ingredients: { $in: ingredients } });
  res.json(recipes);
});

app.listen(5000, () => console.log("Server running on port 5000"));
