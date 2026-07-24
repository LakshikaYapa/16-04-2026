import type {
  Recipe,
  RecipesResponse,
} from "../types";

const RECIPES_API_URL =
  "https://dummyjson.com/recipes";

/*
  Ensures that an API request completed successfully.
*/
const ensureSuccessfulResponse = (
  response: Response
): void => {
  if (!response.ok) {
    throw new Error(
      `Recipe request failed with status ${response.status}.`
    );
  }
};

/*
  Retrieves all recipes from DummyJSON.
*/
export const getAllRecipes =
  async (): Promise<Recipe[]> => {
    const response = await fetch(
      `${RECIPES_API_URL}?limit=0`
    );

    ensureSuccessfulResponse(response);

    const data =
      (await response.json()) as RecipesResponse;

    return data.recipes;
  };

/*
  Retrieves one recipe using its ID.
*/
export const getRecipeById =
  async (
    recipeId: number
  ): Promise<Recipe> => {
    const response = await fetch(
      `${RECIPES_API_URL}/${recipeId}`
    );

    ensureSuccessfulResponse(response);

    return (await response.json()) as Recipe;
  };