import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, Filter, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import RecipeCard, { RecipeProps } from "@/components/RecipeCard";
import IngredientInput from "@/components/IngredientInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock search API function
const searchRecipes = async (ingredients: string[], filters: any): Promise<RecipeProps[]> => {
  // In a real app, you'd make an API call here
  // For now, we'll simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock recipes data
  const mockRecipes = [
    {
      id: "656329",
      title: "Pasta With Tuna",
      image: "https://spoonacular.com/recipeImages/656329-556x370.jpg",
      readyInMinutes: 20,
      servings: 2,
      matchedIngredients: 3,
      totalIngredients: 5
    },
    {
      id: "511728",
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      image: "https://spoonacular.com/recipeImages/511728-556x370.jpg",
      readyInMinutes: 25,
      servings: 4,
      matchedIngredients: 4,
      totalIngredients: 8
    },
    {
      id: "654812",
      title: "Pasta and Seafood",
      image: "https://spoonacular.com/recipeImages/654812-556x370.jpg",
      readyInMinutes: 45,
      servings: 3,
      matchedIngredients: 2,
      totalIngredients: 6
    },
    {
      id: "511803",
      title: "Greek Pasta with Tomatoes and White Beans",
      image: "https://spoonacular.com/recipeImages/511803-556x370.jpg",
      readyInMinutes: 25,
      servings: 4,
      matchedIngredients: 5,
      totalIngredients: 7
    },
    {
      id: "654857",
      title: "Pasta On The Border",
      image: "https://spoonacular.com/recipeImages/654857-556x370.jpg",
      readyInMinutes: 30,
      servings: 3,
      matchedIngredients: 4,
      totalIngredients: 9
    },
    {
      id: "511748",
      title: "Spicy Chicken and Broccoli",
      image: "https://spoonacular.com/recipeImages/511748-556x370.jpg", 
      readyInMinutes: 35,
      servings: 4,
      matchedIngredients: 3,
      totalIngredients: 8
    },
    {
      id: "795751",
      title: "Chicken Spinach Mozzarella",
      image: "https://spoonacular.com/recipeImages/795751-556x370.jpg",
      readyInMinutes: 40,
      servings: 6,
      matchedIngredients: 4,
      totalIngredients: 9
    },
    {
      id: "716429",
      title: "Sweet & Spicy Roasted Carrots",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      readyInMinutes: 25,
      servings: 4, 
      matchedIngredients: 2,
      totalIngredients: 5
    }
  ];
  
  // Apply very basic filtering (in a real app, the API would handle this)
  let filteredRecipes = [...mockRecipes];
  
  // Sort based on selection
  if (filters.sort === 'match') {
    filteredRecipes.sort((a, b) => {
      const matchA = a.matchedIngredients! / a.totalIngredients!;
      const matchB = b.matchedIngredients! / b.totalIngredients!;
      return matchB - matchA;
    });
  } else if (filters.sort === 'time') {
    filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  }
  
  return filteredRecipes;
};

const SearchPage = () => {
  const location = useLocation();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    sort: "match", // match, time, default
    maxTime: "", // max cooking time in minutes
    excludeIngredients: [] as string[],
  });
  
  // Current excluded ingredient input
  const [currentExcluded, setCurrentExcluded] = useState("");
  
  // Parse ingredients from URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ingredientsFromUrl = params.getAll('ingredients');
    
    if (ingredientsFromUrl.length > 0) {
      setIngredients(ingredientsFromUrl);
      handleSearch(ingredientsFromUrl);
    }
  }, [location.search]);
  
  const handleSearch = async (ings = ingredients) => {
    if (ings.length > 0) {
      setLoading(true);
      setSearched(true);
      
      try {
        const results = await searchRecipes(ings, filters);
        setRecipes(results);
      } catch (error) {
        console.error("Error searching recipes:", error);
        // In a real app, display an error message to the user
      } finally {
        setLoading(false);
      }
    }
  };
  
  const addExcludedIngredient = () => {
    if (currentExcluded.trim() && !filters.excludeIngredients.includes(currentExcluded.trim())) {
      setFilters({
        ...filters,
        excludeIngredients: [...filters.excludeIngredients, currentExcluded.trim()]
      });
      setCurrentExcluded("");
    }
  };
  
  const removeExcludedIngredient = (ingredient: string) => {
    setFilters({
      ...filters,
      excludeIngredients: filters.excludeIngredients.filter(ing => ing !== ingredient)
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar with search inputs and filters */}
            <aside className="md:col-span-1">
              <div className="bg-white p-5 rounded-lg shadow-sm sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Find Recipes</h2>
                
                {/* Ingredient input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Ingredients</label>
                  <IngredientInput 
                    ingredients={ingredients} 
                    setIngredients={setIngredients} 
                  />
                </div>
                
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="filters">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" /> Filter Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* Sorting option */}
                      <div className="mb-4">
                        <label className="block text-sm mb-2">Sort By</label>
                        <Select 
                          defaultValue={filters.sort}
                          onValueChange={(value) => setFilters({...filters, sort: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sort by..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="match">Best Match</SelectItem>
                            <SelectItem value="time">Cooking Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Max cooking time */}
                      <div className="mb-4">
                        <label className="block text-sm mb-2">Max Cooking Time (min)</label>
                        <Input 
                          type="number" 
                          placeholder="e.g. 30" 
                          value={filters.maxTime}
                          onChange={(e) => setFilters({...filters, maxTime: e.target.value})}
                        />
                      </div>
                      
                      {/* Exclude ingredients */}
                      <div>
                        <label className="block text-sm mb-2">Exclude Ingredients</label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="e.g. nuts, dairy"
                            value={currentExcluded}
                            onChange={(e) => setCurrentExcluded(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addExcludedIngredient();
                              }
                            }}
                          />
                          <Button 
                            onClick={addExcludedIngredient} 
                            variant="outline" 
                            size="icon"
                            disabled={!currentExcluded.trim()}
                          >
                            <span className="sr-only">Add excluded ingredient</span>
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {filters.excludeIngredients.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {filters.excludeIngredients.map(ing => (
                              <div key={ing} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center">
                                <span>{ing}</span>
                                <button 
                                  onClick={() => removeExcludedIngredient(ing)}
                                  className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                                >
                                  <span className="sr-only">Remove</span>
                                  <Filter className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Button 
                  className="w-full bg-recipe-orange hover:bg-recipe-orange/90"
                  onClick={() => handleSearch()}
                  disabled={ingredients.length === 0 || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Search Recipes'
                  )}
                </Button>
              </div>
            </aside>
            
            {/* Recipe results */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin mx-auto text-recipe-orange mb-2" />
                    <p className="text-muted-foreground">Finding the perfect recipes for you...</p>
                  </div>
                </div>
              ) : searched ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    {recipes.length > 0 
                      ? `Found ${recipes.length} recipes with your ingredients` 
                      : 'No recipes found'}
                  </h2>
                  
                  {recipes.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recipes.map((recipe, idx) => (
                        <div key={recipe.id} className="animate-bounce-in" style={{animationDelay: `${idx * 100}ms`}}>
                          <RecipeCard {...recipe} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                      <p className="text-lg mb-2">No recipes found with these ingredients.</p>
                      <p className="text-muted-foreground mb-4">Try adding more ingredients or removing some filters.</p>
                      <Button variant="outline" onClick={() => setIngredients([])}>
                        Clear All Ingredients
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="mb-4 mx-auto w-16 h-16 bg-recipe-orange/10 rounded-full flex items-center justify-center">
                    <ChevronDown className="h-8 w-8 text-recipe-orange" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    What's in your kitchen?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Enter the ingredients you have, and we'll find recipes that match them. The more ingredients you add, the better results you'll get.
                  </p>
                  <Button 
                    className="bg-recipe-orange hover:bg-recipe-orange/90"
                    onClick={() => {
                      if (ingredients.length > 0) handleSearch();
                    }}
                    disabled={ingredients.length === 0}
                  >
                    Find Recipes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
