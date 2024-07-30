import { Meal } from "../meal/types";

export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: string;
}

export interface IngredientsState {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
    filteredData: Meal[];
    filterLoading: boolean;
    filterError: string | null;
}