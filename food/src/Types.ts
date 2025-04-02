export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface Food {
    id: number;
    name: string;
    price: number; // Optional since it's not in the provided data
    image: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId?: number;
    rating: number;
    reviewCount: number;
    mealType: string[];
}

export interface Cart {
    id?: string;
    food: Food;
    qty: number;
    userId: string;
}

export interface Review {
    id?: string;
    foodId: string;
    userId: string;
    rating: number;
    review: string;
}
