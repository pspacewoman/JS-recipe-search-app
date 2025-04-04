
import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientInput = ({ ingredients, setIngredients }: IngredientInputProps) => {
  const [currentIngredient, setCurrentIngredient] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addIngredient = () => {
    const trimmed = currentIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentIngredient("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Add ingredient (e.g. chicken, tomatoes, etc.)"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          onClick={addIngredient}
          disabled={!currentIngredient.trim()}
          className="bg-recipe-green hover:bg-recipe-green/90"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {ingredients.map((ingredient) => (
            <div key={ingredient} className="ingredient-badge group">
              <span>{ingredient}</span>
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-1 text-white rounded-full hover:bg-white/20 p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
