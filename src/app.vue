<template>
  <div>
    <h2>Recipe Search</h2>
    <input v-model="query" placeholder="Enter ingredients (comma-separated)" />
    <button @click="searchRecipes">Search</button>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <h3>{{ recipe.title }}</h3>
        <p>Ingredients: {{ recipe.ingredients.join(", ") }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      query: "",
      recipes: [],
    };
  },
  methods: {
    async searchRecipes() {
      const res = await axios.get(`http://localhost:5000/recipes/search?ingredients=${this.query}`);
      this.recipes = res.data;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
