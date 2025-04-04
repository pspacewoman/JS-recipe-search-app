import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ChefHat, Clock, Utensils, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import IngredientInput from "@/components/IngredientInput";

const featuredRecipes = [
  {
    id: "656329",
    title: "Pasta With Tuna",
    image: "https://spoonacular.com/recipeImages/656329-556x370.jpg",
    readyInMinutes: 20,
    servings: 2
  },
  {
    id: "511728",
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/511728-556x370.jpg",
    readyInMinutes: 25,
    servings: 4
  },
  {
    id: "654812",
    title: "Pasta and Seafood",
    image: "https://spoonacular.com/recipeImages/654812-556x370.jpg",
    readyInMinutes: 45,
    servings: 3
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleSearch = () => {
    if (ingredients.length > 0) {
      const queryParams = new URLSearchParams();
      ingredients.forEach(ing => queryParams.append('ingredients', ing));
      navigate(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-recipe-orange to-recipe-plum py-16 md:py-24">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
          <div className="container relative text-white mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Find Delicious Recipes With Ingredients You Already Have
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Turn your available ingredients into amazing meals. No more wasted food or trips to the grocery store.
              </p>
              
              <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-xl mx-auto">
                <IngredientInput 
                  ingredients={ingredients} 
                  setIngredients={setIngredients} 
                />
                
                <Button 
                  onClick={handleSearch}
                  disabled={ingredients.length === 0}
                  className="w-full mt-4 bg-white text-recipe-orange hover:bg-white/90 hover:text-recipe-orange/90"
                >
                  <Search className="w-4 h-4 mr-2" /> Find Recipes
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-recipe-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-recipe-plum">
              How Recipe Alchemy Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-recipe-orange/10 w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-recipe-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Your Ingredients</h3>
                <p className="text-muted-foreground">Enter the ingredients you have on hand in your pantry and fridge.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-recipe-green/10 w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-6 h-6 text-recipe-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Recipes</h3>
                <p className="text-muted-foreground">Our algorithm finds the perfect recipes that match your ingredients.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-recipe-plum/10 w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-recipe-plum" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Cooking</h3>
                <p className="text-muted-foreground">Follow the simple instructions and enjoy your delicious creation.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Recipes */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Popular Recipes
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-card animate-fade-in" style={{ animationDelay: `${parseInt(recipe.id) % 3 * 100}ms` }}>
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.readyInMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="h-4 w-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/recipe/${recipe.id}`);
                        }}
                        variant="outline"
                        className="w-full mt-4 border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white"
                      >
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-recipe-plum text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-white p-1 rounded">
              <BookOpen className="h-5 w-5 text-recipe-plum" />
            </div>
            <span className="text-xl font-bold">Recipe Alchemy</span>
          </div>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Recipe Alchemy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
