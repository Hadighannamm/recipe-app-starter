import type { Category } from "../types/category";

type FilterPanelProps = {
  categories: Category[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
};

export default function FilterPanel({ categories, selectedCategoryId, onCategoryChange }: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <label>Filter by Category:</label>
      <select 
        value={selectedCategoryId} 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
