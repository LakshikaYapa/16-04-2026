import { ref } from "vue";
import type { Recipe } from "../types";

/*
  Name of the custom event used to inform other components
  when the favorites list changes.
*/
export const FAVORITES_UPDATED_EVENT =
  "kitchen-magic-favorites-updated";

/*
  Safely loads favorite recipes from localStorage.
*/
const readFavorites = (): Recipe[] => {
  try {
    const storedFavorites =
      localStorage.getItem("favorites");

    if (!storedFavorites) {
      return [];
    }

    return JSON.parse(storedFavorites) as Recipe[];
  } catch {
    return [];
  }
};

/*
  Shared reactive favorites state.
*/
const favorites = ref<Recipe[]>(readFavorites());

/*
  Saves favorites and informs components such as NavBar
  that the favorites list has changed.
*/
const saveFavorites = (): void => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites.value)
  );

  window.dispatchEvent(
    new Event(FAVORITES_UPDATED_EVENT)
  );
};

/*
  Adds a recipe if it is not already saved.
  Removes it if it is already in favorites.
*/
const toggleFavorite = (recipe: Recipe): void => {
  const existingIndex = favorites.value.findIndex(
    (item) => item.id === recipe.id
  );

  if (existingIndex === -1) {
    favorites.value.push(recipe);
  } else {
    favorites.value.splice(existingIndex, 1);
  }

  saveFavorites();
};

/*
  Checks whether a recipe is already saved.
*/
const isFavorite = (id: number): boolean => {
  return favorites.value.some(
    (item) => item.id === id
  );
};

/*
  Removes a recipe using its ID.
*/
const removeFavorite = (id: number): void => {
  favorites.value = favorites.value.filter(
    (item) => item.id !== id
  );

  saveFavorites();
};

/*
  Exposes favorites state and related functions
  to Vue components.
*/
export function useFavorites() {
  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  };
}