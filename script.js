const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function searchRecipe() {
    const query = document.getElementById("searchInput").value;
    if (!query) {
        alert("Please enter a search term!");
        return;
    }

    try {
        const response = await fetch(apiUrl + query);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Failed to load recipes. Try again later.");
    }
}

function displayRecipes(meals) {
    const container = document.getElementById("recipesContainer");
    container.innerHTML = "";

    if (!meals) {
        container.innerHTML = "<p>No recipes found. Try something else!</p>";
        return;
    }

    meals.forEach(meal => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
        `;

        container.appendChild(recipeCard);
    });
}

function viewRecipe(id) {
    window.open(`https://www.themealdb.com/meal/${id}`, "_blank");
}
