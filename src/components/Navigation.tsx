import { Link } from "react-router-dom";
import { Home, Search, BookOpen } from "lucide-react";

const Navigation = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-recipe-orange p-1 rounded">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-recipe-plum">Recipe Alchemy</span>
        </Link>
        
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Find Recipes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
