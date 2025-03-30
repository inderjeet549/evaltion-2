document.getElementById("recipe-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let ingredients = document.getElementById("ingredients").value.split("\n");
    let category = document.getElementById("category").value;
    let steps = document.getElementById("steps").value;
    let recipe = { name, ingredients, category, steps };
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();
    this.reset();
});
function displayRecipes(categoryFilter = "All") {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";
    let filteredRecipes = categoryFilter === "All"
        ? recipes
        : recipes.filter(recipe => recipe.category === categoryFilter);
    filteredRecipes.forEach(recipe => {
        let recipeCard = `
          <div class="recipe-card">
            <h3>${recipe.name}</h3>
            <p><b>Category:</b> ${recipe.category}</p>
            <h4>Ingredients:</h4>
            <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
            <h4>Preparation Steps:</h4>
            <p>${recipe.steps}</p>
          </div>
        `;
        recipeList.innerHTML += recipeCard;
    });
}
document.getElementById("category-filter").addEventListener("change", function() {
    displayRecipes(this.value);
});
document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
window.onload = displayRecipes;
