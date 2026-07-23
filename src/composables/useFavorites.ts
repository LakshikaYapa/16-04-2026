import { ref } from "vue";
import type { Recipe } from "../types";

const readFavorites = (): Recipe[] => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]") as Recipe[];
  } catch {
    return [];
  }
};

const favorites = ref<Recipe[]>(readFavorites());

// Save to localStorage
const saveFavorites = () => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites.value)
  );
};

// Add or Remove Favorite
const toggleFavorite = (recipe: Recipe): void => {

  const index = favorites.value.findIndex(
    (item) => item.id === recipe.id
  );

  if (index === -1) {

    favorites.value.push(recipe);

  } else {

    favorites.value.splice(index, 1);

  }

  saveFavorites();
};

// Check Favorite
const isFavorite = (id: number): boolean => {

  return favorites.value.some(
    (item) => item.id === id
  );

};

// Remove
const removeFavorite = (id: number): void => {

  favorites.value = favorites.value.filter(
    (item) => item.id !== id
  );

  saveFavorites();

};

export function useFavorites() {

  return {

    favorites,

    toggleFavorite,

    isFavorite,

    removeFavorite

  };

}