export interface Recipes {
	id: number;
	image: string;
	imageType: string;
	likes: number;
	missedIngredientCount: number;
	missedIngredients?: IngredientDetail[];
	title: string;
	unusedIngredients?: IngredientDetail[];
	usedIngredientCount: number;
	usedIngredients?: IngredientDetail[];
}

interface IngredientDetail {
	id: number;
	aisle: string;
	amount: number;
	unit: string;
	unitLong: string;
	unitShort: string;
	name: string;
	original: string;
	originalName: string;
	image: string;
	meta?: string[]; // Assuming meta is an array of strings
}

export interface RecipeArray extends Array<Recipes> {}
