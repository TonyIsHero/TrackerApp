export interface MealModel {
    userId?: number;
    carbs?: number;
    proteins?: number;
    fats?: number;
    calories?: number;
    fibre?: number;
    meal_name?: string;
}

export interface DailySummaryModel {
    carbs?: number;
    proteins?: number;
    fats?: number;
    calories?: number;
}

export interface MealResponseModel {
    mealId?: number;
    userId?: number;
    carbs?: number;
    proteins?: number;
    fats?: number;
    calories?: number;
    fibre?: number;
    meal_name?: string;
    meal_time?: string; 
}