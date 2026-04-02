import { supabase } from "../lib/supabaseClient";
import type { NewRecipe, Recipe } from "../types/recipe";

export async function createRecipe(recipe: NewRecipe) {
  return await supabase.from("recipes").insert([recipe]);
}

// Get all recipes for the public dashboard
export async function getAllRecipes() {
  return await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function updateRecipe(recipeId: number, updatedRecipe: Partial<NewRecipe>) {
  return await supabase
    .from("recipes")
    .update(updatedRecipe)
    .eq("id", recipeId);
}

export async function deleteRecipe(recipeId: number) {
  return await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);
}