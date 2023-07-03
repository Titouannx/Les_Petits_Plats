const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    if(searchInput.value.length >= 3 || searchInput.value.length === 0) {
    performSearch();
  }
  hideAllDropdowns();
  setButtonsWidth(ingredientsDropdown, ingredientsButton, '');
  setButtonsWidth(appliancesDropdown, appliancesButton, '');
  setButtonsWidth(ustensilsDropdown, ustensilsButton, '');
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  //const selectedTags = Array.from(document.querySelectorAll('.selected-tag')).map(tag => tag.textContent.toLowerCase());
  
  const filteredRecipes = searchRecipesLoop(searchTerm);

  // Mettre à jour l'affichage des recettes filtrées
  displayRecipes(filteredRecipes);

   // Vérifier si des recettes ont été trouvées
   if (filteredRecipes.length === 0) {
    // Afficher le message "Pas de recette correspondante"
    const noResultsMessage = document.createElement('p');
    noResultsMessage.classList.add('no-results-message');
    noResultsMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    // Ajouter le message à l'élément d'affichage des recettes
    const recipesContainer = document.getElementById('recipes-list');
    recipesContainer.innerHTML = '';
    recipesContainer.appendChild(noResultsMessage);
  }

  // Mettre à jour les tags dans les menus déroulants
  updateTagsDropdowns(filteredRecipes);
}

function searchRecipesLoop(searchTerm) {
  let result = [];

  for (let index = 0; index < recipes.length; index++) {
    let recipe = recipes[index];

    if (recipeMatchesSearchTerm(recipe, searchTerm)) {
      result.push(recipe);
    }
  }

  return result;
}

function recipeMatchesSearchTerm(recipe, searchTerm) {
  const titleMatch = recipe.name.toLowerCase().includes(searchTerm);
  const ingredientsMatch = recipe.ingredients.some(ingredient =>
    ingredient.ingredient.toLowerCase().includes(searchTerm)
  );
  const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);

  return titleMatch || ingredientsMatch || descriptionMatch;
}