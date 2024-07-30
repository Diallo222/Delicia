import { Meal } from "../meal/types";

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }

  
  export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    filteredData: Meal[];
    filterLoading: boolean;
    filterError: string | null;
  }
  