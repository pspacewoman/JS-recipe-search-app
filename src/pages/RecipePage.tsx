import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChefHat, Clock, Users, Bookmark, Star, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface RecipeDetail {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      // In a real app, make an API call here
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock recipe data
      const mockRecipe: RecipeDetail = {
        id: id || "",
        title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        image: "https://spoonacular.com/recipeImages/511728-556x370.jpg",
        readyInMinutes: 30,
        servings: 4,
        summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs is a main course that serves 4. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.35 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. 25 people were glad they tried this recipe. A mixture of butter, cauliflower, white wine vinegar, and a handful of other ingredients are all it takes to make this recipe so flavorful. From preparation to the plate, this recipe takes roughly <b>30 minutes</b>.",
        instructions: "1. Begin by bringing a large pot of water to a boil. Add salt and pasta and cook until al dente. \n\n2. While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and red pepper flakes, cooking until fragrant, about 30 seconds. \n\n3. Add cauliflower florets and cook until they begin to soften, about 5 minutes, stirring occasionally. \n\n4. Add white wine (or broth) to the skillet and let it reduce by half. \n\n5. In a separate small skillet, toast breadcrumbs until golden brown. \n\n6. When pasta is done, reserve 1/2 cup of pasta water before draining. Add pasta to the cauliflower mixture, along with butter and half the pasta water. Stir until butter melts and a light sauce forms. \n\n7. Remove from heat and toss with scallions, parsley, and lemon zest. Season with salt and pepper to taste. \n\n8. Serve topped with toasted breadcrumbs and Parmesan cheese.",
        ingredients: [
          { name: "pasta", amount: 12, unit: "ounces" },
          { name: "olive oil", amount: 3, unit: "tablespoons" },
          { name: "garlic", amount: 4, unit: "cloves" },
          { name: "red pepper flakes", amount: 0.5, unit: "teaspoon" },
          { name: "cauliflower", amount: 1, unit: "head" },
          { name: "white wine", amount: 0.5, unit: "cup" },
          { name: "breadcrumbs", amount: 0.5, unit: "cup" },
          { name: "butter", amount: 2, unit: "tablespoons" },
          { name: "scallions", amount: 4, unit: "stalks" },
          { name: "parsley", amount: 0.25, unit: "cup" },
          { name: "lemon zest", amount: 1, unit: "lemon" },
          { name: "parmesan cheese", amount: 0.5, unit: "cup" }
        ],
        nutrition: {
          calories: "543 kcal",
          protein: "17g",
          carbs: "75g",
          fat: "16g"
        }
      };
      
      setRecipe(mockRecipe);
      setLoading(false);
    };
    
    fetchRecipe();
  }, [id]);
  
  const toggleSave = () => {
    setSaved(!saved);
    
    toast({
      title: saved ? "Recipe removed from saved recipes" : "Recipe saved to your collection",
      description: saved ? "You can always save it again later." : "You can find it in your saved recipes.",
      duration: 3000,
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-recipe-orange border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">Recipe not found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the recipe you were looking for.</p>
            <Button asChild>
              <Link to="/search">
                <ArrowLeft className="h-4 w-4 mr-2" /> Return to Search
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/search">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
              </Link>
            </Button>
          </div>
          
          {/* Recipe header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Save button */}
              <Button
                onClick={toggleSave}
                className={`absolute top-4 right-4 ${
                  saved 
                    ? 'bg-recipe-orange hover:bg-recipe-orange/90' 
                    : 'bg-white/90 text-recipe-orange hover:bg-white'
                }`}
                size="sm"
              >
                <Bookmark className={`h-4 w-4 ${saved ? 'fill-white' : ''} mr-2`} />
                {saved ? 'Saved' : 'Save Recipe'}
              </Button>
              
              {/* Recipe title and basic info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400/40 text-yellow-400" />
                  </div>
                  <span className="text-sm">(4.6)</span>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-bold mb-3">{recipe.title}</h1>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{recipe.readyInMinutes} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-5 w-5" />
                    <span>Easy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Recipe summary */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">About</h2>
                <div 
                  className="text-muted-foreground" 
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                ></div>
              </div>
              
              {/* Nutrition info */}
              {recipe.nutrition && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Nutrition (per serving)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-recipe-cream rounded-lg p-4 text-center">
                      <p className="text-lg font-medium">{recipe.nutrition.calories}</p>
                      <p className="text-sm text-muted-foreground">Calories</p>
                    </div>
                    <div className="bg-recipe-cream rounded-lg p-4 text-center">
                      <p className="text-lg font-medium">{recipe.nutrition.protein}</p>
                      <p className="text-sm text-muted-foreground">Protein</p>
                    </div>
                    <div className="bg-recipe-cream rounded-lg p-4 text-center">
                      <p className="text-lg font-medium">{recipe.nutrition.carbs}</p>
                      <p className="text-sm text-muted-foreground">Carbs</p>
                    </div>
                    <div className="bg-recipe-cream rounded-lg p-4 text-center">
                      <p className="text-lg font-medium">{recipe.nutrition.fat}</p>
                      <p className="text-sm text-muted-foreground">Fat</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Ingredients */}
                <div className="md:col-span-1">
                  <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                  <p className="text-sm text-muted-foreground mb-4">For {recipe.servings} servings</p>
                  
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 pb-2 border-b border-gray-100 last:border-0">
                        <span className="w-6 h-6 rounded-full bg-recipe-orange/10 flex items-center justify-center text-xs text-recipe-orange">
                          {index + 1}
                        </span>
                        <span>
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Instructions */}
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                  
                  <div className="whitespace-pre-line">
                    {recipe.instructions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
