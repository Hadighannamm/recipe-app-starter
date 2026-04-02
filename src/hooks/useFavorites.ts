import { useEffect, useState } from "react";
import type { Favorite } from "../types/favorite";
import { getFavoritesByUser, addFavorite as addFavService, removeFavorite as removeFavService } from "../services/favoriteService";

export function useFavorites(userId: string | null) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadFavorites() {
    if (!userId) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    setError("");

    const { data, error } = await getFavoritesByUser(userId);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setFavorites(data as Favorite[] ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadFavorites();
  }, [userId]);

  async function addFavorite(recipeId: number) {
    if (!userId) return false;
    const { error } = await addFavService(userId, recipeId);
    if (!error) {
      await loadFavorites();
      return true;
    }
    setError(error.message);
    return false;
  }

  async function removeFavorite(recipeId: number) {
    if (!userId) return false;
    const { error } = await removeFavService(userId, recipeId);
    if (!error) {
      await loadFavorites();
      return true;
    }
    setError(error.message);
    return false;
  }

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    refreshFavorites: loadFavorites
  };
}
