export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    
  }
  
  export interface MealsState {
    data: Meal[];
    loading: boolean;
    error: string | null;
    meal: Meal[];
    mealLoading: boolean;
    mealError: string | null;
  }
  