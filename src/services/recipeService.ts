import { supabase } from "../lib/supabaseClient";
import type { NewRecipe, Recipe } from "../types/recipe";

// Upload image file to Supabase Storage and return public URL
export async function uploadRecipeImage(file: File, recipeName: string) {
  try {
    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${recipeName}-${timestamp}.${file.name.split('.').pop()}`;
    const filePath = `recipe-images/${fileName}`;

    // Upload file to Storage
    const { error: uploadError, data } = await supabase.storage
      .from("recipes")
      .upload(filePath, file);

    if (uploadError) {
      return { url: null, error: uploadError };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("recipes")
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    return { url: null, error };
  }
}

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