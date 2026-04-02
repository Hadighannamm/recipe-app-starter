type SummaryProps = {
  totalSystemRecipes: number;
  totalCategoryRecipes: number;
  favoriteCount: number;
  isLoggedIn: boolean;
};

export default function Summary({
  totalSystemRecipes,
  totalCategoryRecipes,
  favoriteCount,
  isLoggedIn,
}: SummaryProps) {
  return (
    <div className="summary-panel">
      <h2>Dashboard Overview</h2>
      <div className="summary-stats">
        <div className="stat-box">
          <div className="stat-value">{totalSystemRecipes}</div>
          <div className="stat-label">Total Recipes</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalCategoryRecipes}</div>
          <div className="stat-label">Current Category</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{isLoggedIn ? favoriteCount : "-"}</div>
          <div className="stat-label">
            {isLoggedIn ? "Your Favorites" : "Log in to save favorites"}
          </div>
        </div>
      </div>
    </div>
  );
}
