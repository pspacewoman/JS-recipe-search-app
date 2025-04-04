import { Clock, ChefHat, Bookmark } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface RecipeProps {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  matchedIngredients?: number;
  totalIngredients?: number;
}

const RecipeCard = ({ 
  id, 
  title, 
  image, 
  readyInMinutes, 
  servings,
  matchedIngredients,
  totalIngredients
}: RecipeProps) => {
  const [saved, setSaved] = useState(false);
  
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  const matchPercentage = matchedIngredients && totalIngredients 
    ? Math.round((matchedIngredients / totalIngredients) * 100)
    : null;

  return (
    <Link to={`/recipe/${id}`} className="recipe-card group">
      <div className="relative overflow-hidden rounded-lg bg-white">
        {/* Image with gradient overlay */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Save button */}
          <button 
            onClick={toggleSave} 
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Bookmark 
              className={`h-5 w-5 ${saved ? 'fill-recipe-orange text-recipe-orange' : 'text-gray-600'}`} 
            />
          </button>
          
          {/* Match percentage indicator if provided */}
          {matchPercentage !== null && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-recipe-orange" 
                    style={{ width: `${matchPercentage}%` }}
                  ></div>
                </div>
                <span className="text-white text-xs font-medium">
                  {matchPercentage}% match
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readyInMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
