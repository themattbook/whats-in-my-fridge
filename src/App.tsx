import { useState } from "react";
import { Recipes, RecipeArray } from "./models/RecipeModel";

function App() {
	const [ingredient, setIngredient] = useState<Array<string>>([]);
	const [newIngredient, setNewIngredient] = useState("");
	const [recipes, setRecipes] = useState<RecipeArray>([]);

	function handleNewIngredientEvent() {
		const data: string = newIngredient;
		if (newIngredient !== "") {
			setIngredient([...ingredient, data]);
		} else {
			console.error("Cannot set empty ingredient.");
		}
		setNewIngredient("");
	}

	function fetchRecipes() {
		fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=${
			import.meta.env.VITE_RECIPE_API_KEY
		}
    `)
			.then((response) => response.json())
			.then((data) => setRecipes(data))
			.catch((error) => console.error(error));
	}
	return (
		<div className="container">
			<div className="todo-list">
				<div className="todo-input">
					<h3>Recipe Finder</h3>
					<input
						type="text"
						placeholder="Enter ingredients"
						value={newIngredient}
						onChange={(e) => setNewIngredient(e.target.value)}
					/>
					<button
						className="btn-default"
						onClick={() => handleNewIngredientEvent()}
					>
						Add Ingredient
					</button>
					<button className="btn-success" onClick={() => fetchRecipes()}>
						Get Recipes
					</button>
				</div>
				<div className="todo-items">
					<ul>
						{ingredient.map((item: string) => {
							return <li key={item}>{item}</li>;
						})}
					</ul>
				</div>
			</div>
			<div className="recipe-list">
				<div className="flex-items">
					{recipes.map((item: Recipes) => {
						return (
							<div
								className="recipe-card"
								key={item.id}
								style={{
									backgroundImage: `url(${item.image})`,
									backgroundSize: "cover",
									backgroundPosition: "center center",
								}}
							>
								<div className="recipe-info">
									<h3>{item.title}</h3>
									<p>
										You have {item.usedIngredientCount} ingredients on hand.
									</p>
									<p>You need {item.missedIngredientCount} more.</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
