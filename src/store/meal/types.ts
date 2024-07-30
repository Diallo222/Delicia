export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string | null;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient?: string;
  strMeasure?: string;
  strSource?: string;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
    
  }
  
  export interface MealsState {
    data: Meal[];
    loading: boolean;
    error: string | null;
    meal: Meal[];
    mealLoading: boolean;
    mealError: string | null;
    details: Meal | null;
    detailsLoading: boolean;
    detailsError: string | null;
  }
  