import type { Recipe } from "../types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
  categoryName: string;
  isOwner: boolean;
  isLoggedIn: boolean;
  isFavorite: boolean;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: number) => void;
  onToggleFavorite: (recipeId: number, isFavorite: boolean) => void;
};

export default function RecipeCard({
  recipe,
  categoryName,
  isOwner,
  isLoggedIn,
  isFavorite,
  onEdit,
  onDelete,
  onToggleFavorite
}: RecipeCardProps) {
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23e0e0e0' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='18' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
  
const imageUrl = recipe.image_path && recipe.image_path.trim() ? recipe.image_path : placeholderImage;

  return (
    <div className="recipe-card">
      {imageUrl && (
        <div style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          borderRadius: "8px 8px 0 0",
          marginBottom: "1rem",
          backgroundColor: "#f0f0f0"
        }}>
          <img
            src={imageUrl}
            alt={recipe.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>
      )}
      
      <div className="recipe-card-badge">{categoryName}</div>
      <h3 className="recipe-card-title">{recipe.title}</h3>
      <div className="recipe-card-meta">
        <span>By: {recipe.owner_email || recipe.user_id}</span>
        <span>•</span>
        <span>{recipe.prep_time} mins prep</span>
      </div>
      
      <div className="recipe-card-desc">
        <p>{recipe.description}</p>
      </div>
      
      <div className="recipe-card-actions">
        {isOwner && (
          <>
            <button className="btn-outline" onClick={() => onEdit(recipe)}>Edit Recipe</button>
            <button className="btn-danger" onClick={() => onDelete(recipe.id)}>Delete</button>
          </>
        )}
        
        {isLoggedIn ? (
          <button 
            className={isFavorite ? "btn-favorite" : "btn-outline"} 
            onClick={() => onToggleFavorite(recipe.id, isFavorite)}
          >
            {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
          </button>
        ) : (
          <span style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", marginLeft: "auto" }}>
            Login required for favorite actions
          </span>
        )}
      </div>
    </div>
  );
}