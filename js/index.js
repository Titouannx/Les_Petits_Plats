const ingredientsDropdown = document.getElementById("ingredients-dropdown");
const appliancesDropdown = document.getElementById("appliances-dropdown");
const ustensilsDropdown = document.getElementById("ustensils-dropdown");

const ingredientsTags = document.getElementById("ingredients-tags");
const appliancesTags = document.getElementById("appliances-tags");
const ustensilsTags = document.getElementById("ustensils-tags");

const ingredientsButton = document.getElementById('ingredients-button');
const ingredientsLabel = document.getElementById('ingredients-label');
const ingredientsInput = document.getElementById('ingredients-search');

const appliancesButton = document.getElementById('appliances-button');
const appliancesLabel = document.getElementById('appliances-label');
const appliancesInput = document.getElementById('appliances-search');

const ustensilsButton = document.getElementById('ustensils-button');
const ustensilsLabel = document.getElementById('ustensils-label');
const ustensilsInput = document.getElementById('ustensils-search');

const selectedTags = document.getElementById('selected-tags');

//Gestion bouttons ingrédients, appareils et ustensiles (hide/show label/input + dropdown menus)

function displayIngredientsDropdown() {
  ingredientsDropdown.style.display = "block";
  ingredientsLabel.style.display = 'none';
  ingredientsInput.style.display = 'inline-block';
}

function displayAppliancesDropdown() {
  appliancesDropdown.style.display = "block";
  appliancesLabel.style.display = 'none';
  appliancesInput.style.display = 'inline-block';
}

function displayUstensilsDropdown() {
  ustensilsDropdown.style.display = "block";
  ustensilsLabel.style.display = 'none';
  ustensilsInput.style.display = 'inline-block';
}

function hideIngredientsDropdown() {
  ingredientsDropdown.style.display = "none";
  ingredientsLabel.style.display = 'inline-block';
  ingredientsInput.style.display = 'none';
}

function hideAppliancesDropdown() {
  appliancesDropdown.style.display = "none";
  appliancesLabel.style.display = 'inline-block';
  appliancesInput.style.display = 'none';
}

function hideUstensilsDropdown() {
  ustensilsDropdown.style.display = "none";
  ustensilsLabel.style.display = 'inline-block';
  ustensilsInput.style.display = 'none';
}


ingredientsButton.addEventListener('click', () => {
  if(ingredientsDropdown.style.display === "block") {
    hideIngredientsDropdown()
  }
  else {
    displayIngredientsDropdown()
    hideAppliancesDropdown()
    hideUstensilsDropdown()
    clearAllDropdownsInputs()
  }
});

appliancesButton.addEventListener('click', () => {
  if(appliancesDropdown.style.display === "block") {
    hideAppliancesDropdown()
  }
  else {
    displayAppliancesDropdown()
    hideIngredientsDropdown()
    hideUstensilsDropdown()
    clearAllDropdownsInputs()
  }
});

ustensilsButton.addEventListener('click', () => {
  if(ustensilsDropdown.style.display === "block") {
    hideUstensilsDropdown()
  }
  else {
    displayUstensilsDropdown()
    hideIngredientsDropdown()   
    hideAppliancesDropdown()
    clearAllDropdownsInputs()
  }
});

// Empêcher la propagation de l'événement de clic vers le bouton
ingredientsInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

appliancesInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

ustensilsInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Gestion du formatage des tags
function formatLetterCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Populate the tag dropdown menus dynamically
const ingredients = new Set();
const appliances = new Set();
const ustensils = new Set();
recipes.forEach(recipe => {
  recipe.ingredients.forEach(ingredient => ingredients.add(formatLetterCase(ingredient.ingredient.toLowerCase())));
  recipe.appliance && appliances.add(formatLetterCase(recipe.appliance.toLowerCase()));
  recipe.ustensils.forEach(ustensil => ustensils.add(formatLetterCase(ustensil.toLowerCase())));
});

// Ajouter des tags pour les ingrédients
function addIngredientsTags(ingredients) {
  ingredients.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.textContent = tag;
    tagElement.addEventListener('click', () => {
      const text = tagElement.textContent;
      const selectedTagElement = document.createElement('div');
      const deleteTagElement = document.createElement('img');
      deleteTagElement.src = 'assets/images/remove-icon.png';
      deleteTagElement.classList.add('deleteTagImg');
      deleteTagElement.addEventListener('click', () => {
        selectedTagElement.remove();
        performSearch();
        updateTagsList(ingredientsInput, ingredientsTags);
      });
      tagElement.remove();
      selectedTagElement.textContent = text;
      selectedTagElement.id = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-ingredients');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
      updateTagsList(ingredientsInput, ingredientsTags);
    });
    //create array containing all tags in selectedTags and check if tag is already in it, if not add it to the dropdown
    const selectedTagsArray = Array.from(selectedTags.children);
    if (!selectedTagsArray.some(tag => tag.id === tagElement.textContent)) {
      ingredientsTags.appendChild(tagElement);
      //clear the input field
      ingredientsInput.value = '';
    }
  });
}

function clearAllDropdownsInputs() {
  ingredientsInput.value = '';
  appliancesInput.value = '';
  ustensilsInput.value = '';
  updateTagsList(ingredientsInput, ingredientsTags);
  updateTagsList(appliancesInput, appliancesTags);
  updateTagsList(ustensilsInput, ustensilsTags);
}

// Ajouter des tags pour les appareils
function addAppliancesTags(appliances) {
  appliances.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.textContent = tag;
    tagElement.addEventListener('click', () => {
      const text = tagElement.textContent;
      const selectedTagElement = document.createElement('div');
      const deleteTagElement = document.createElement('img');
      deleteTagElement.src = 'assets/images/remove-icon.png';
      deleteTagElement.classList.add('deleteTagImg');
      deleteTagElement.addEventListener('click', () => {
        selectedTagElement.remove();
        performSearch();
        updateTagsList(appliancesInput, appliancesTags);
      });
      tagElement.remove();
      selectedTagElement.textContent = text;
      selectedTagElement.id = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-appliances');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
      updateTagsList(appliancesInput, appliancesTags);
    });
    //create array containing all tags in selectedTags and check if tag is already in it, if not add it to the dropdown
    const selectedTagsArray = Array.from(selectedTags.children);
    if (!selectedTagsArray.some(tag => tag.id === tagElement.textContent)) {
      appliancesTags.appendChild(tagElement);
      //clear the input field
      appliancesInput.value = '';
    }
  });
}

// Ajouter des tags pour les ustensiles
function addUstensilsTags(ustensils) {
  ustensils.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.textContent = tag;
    tagElement.addEventListener('click', () => {
      const text = tagElement.textContent;
      const selectedTagElement = document.createElement('div');
      const deleteTagElement = document.createElement('img');
      deleteTagElement.src = 'assets/images/remove-icon.png';
      deleteTagElement.classList.add('deleteTagImg');
      deleteTagElement.addEventListener('click', () => {
        selectedTagElement.remove();
        performSearch();
        updateTagsList(ustensilsInput, ustensilsTags);
      });
      tagElement.remove();
      selectedTagElement.textContent = text;
      selectedTagElement.id = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-ustensils');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
      updateTagsList(ustensilsInput, ustensilsTags);
    });
    //create array containing all tags in selectedTags and check if tag is already in it, if not add it to the dropdown
    const selectedTagsArray = Array.from(selectedTags.children);
    if (!selectedTagsArray.some(tag => tag.id === tagElement.textContent)) {
      ustensilsTags.appendChild(tagElement);
      //clear the input field
      ustensilsInput.value = '';
    }
  });
}

// Mettre à jour la liste des tags en fonction de la valeur de l'input des tags
function updateTagsList(input, tagsList) {
  const value = input.value.toLowerCase();
  const tags = tagsList.querySelectorAll('.tag');
  tags.forEach((tag) => {
    const tagText = tag.textContent.toLowerCase();
    if (tagText.includes(value)) {
      tag.style.display = 'block';
    }
    else {
      tag.style.display = 'none';
    }
  });
  //Display a no tags found in the div containing the tags when the input of the tags dropdown menu doesn't find any tags corresponding to the input
  const noTagsFound = document.createElement('div');
  noTagsFound.textContent = 'Pas de tags correspondants';
  noTagsFound.classList.add('noTagsFound');
  if (tagsList.querySelectorAll('.tag').length === tagsList.querySelectorAll('.tag[style="display: none;"]').length) {
    //remove all "No tags found" divs
    const noTagsFoundArray = Array.from(tagsList.children);
    noTagsFoundArray.forEach((element) => {
      if (element.classList.contains('noTagsFound')) {
        element.remove();
      }
    }
    );
    tagsList.appendChild(noTagsFound);
    //change .tags-dropdown column-count to 1
    tagsList.style.columnCount = '1';
  }
  else {
    //remove all "No tags found" divs
    const noTagsFoundArray = Array.from(tagsList.children);
    noTagsFoundArray.forEach((element) => {
      if (element.classList.contains('noTagsFound')) {
        element.remove();
      }
    }
    );
    //change .tags-dropdown column-count to 3
    tagsList.style.columnCount = '3';
  }
}

// Gestion de la recherche d'ingrédients
ingredientsInput.addEventListener('input', () => {
  updateTagsList(ingredientsInput, ingredientsTags);
});

// Gestion de la recherche d'appareils
appliancesInput.addEventListener('input', () => {
  updateTagsList(appliancesInput, appliancesTags);
});

// Gestion de la recherche d'ustensiles
ustensilsInput.addEventListener('input', () => {
  updateTagsList(ustensilsInput, ustensilsTags);
});

// Sélectionnez l'élément conteneur pour les recettes dans le HTML
const recipeContainer = document.getElementById("recipes-list");

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  if(searchInput.value.length >= 3 || searchInput.value.length === 0) {
  performSearch();
  }
});

function updateTagsDropdowns(filteredRecipes) {
  // Réinitialiser les menus déroulants des tags
  ingredientsTags.innerHTML = '';
  appliancesTags.innerHTML = '';
  ustensilsTags.innerHTML = '';

  // Mettre à jour les tags des ingrédients, appareils et ustensiles
  const updatedIngredients = new Set();
  const updatedAppliances = new Set();
  const updatedUstensils = new Set();

  filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => updatedIngredients.add(formatLetterCase(ingredient.ingredient.toLowerCase())));
    recipe.appliance && updatedAppliances.add(formatLetterCase(recipe.appliance.toLowerCase()));
    recipe.ustensils.forEach(ustensil => updatedUstensils.add(formatLetterCase(ustensil.toLowerCase())));
  });
  addIngredientsTags(updatedIngredients);
  addAppliancesTags(updatedAppliances);
  addUstensilsTags(updatedUstensils);
}


function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTags = Array.from(document.querySelectorAll('.selected-tag')).map(tag => tag.textContent.toLowerCase());
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si le terme de recherche est présent dans le titre, les ingrédients ou la description
    const titleMatch = recipe.name.toLowerCase().includes(searchTerm);
    const ingredientsMatch = recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(searchTerm)
    );
    const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);

    // Vérifier si la recette correspond aux tags sélectionnés
    const selectedIngredients = selectedTags.filter(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag)));
    const selectedAppliances = selectedTags.filter(tag => recipe.appliance.toLowerCase().includes(tag));
    const selectedUstensils = selectedTags.filter(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag)));
    const tagsMatch = selectedIngredients.length + selectedAppliances.length + selectedUstensils.length === selectedTags.length;

    // Retourner la recette si elle correspond aux critères de recherche
    return (titleMatch || ingredientsMatch || descriptionMatch) && tagsMatch;
  });

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

// Fonction pour générer une carte de recette
function createRecipeCard(recipe) {
  // Créer un élément <div> pour la carte de recette
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  //Créer un élément <div> pour l'image (vide) de la recette
  const imageElement = document.createElement("div");
  imageElement.classList.add("recipe-image");

  // Créer un élément <h2> pour le nom de la recette
  const nameElement = document.createElement("h2");
  nameElement.textContent = recipe.name;

  //Créer un élément <p> pour le temps de préparation
  const timeElement = document.createElement("p");
  timeElement.textContent = recipe.time + " min";
  const timeIcon = document.createElement("img");
  timeIcon.src = "../assets/images/clock-regular.svg";
  timeIcon.alt = "Horloge";
  timeIcon.classList.add("time-icon");

  timeElement.prepend(timeIcon);

  // Créer un élément <ul> pour la liste des ingrédients
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("ingredients-list");

  // Parcourir la liste des ingrédients et créer des éléments <li> pour chaque ingrédient
  recipe.ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement("li");

    // Créer une chaîne de texte avec la quantité, l'unité (si disponible) et l'ingrédient
    let ingredientText = ingredient.ingredient + ": ";
    ingredientText += ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ""} ` : "";
    ingredientElement.textContent = ingredientText;

    ingredientsList.appendChild(ingredientElement);
    //Mettre le début de la string en gras
    ingredientElement.innerHTML = ingredientElement.innerHTML.replace(/^(.+?:)/, "<strong>$1</strong>");
    //if "grammes" is in the string, replace it with "g"
    ingredientElement.innerHTML = ingredientElement.innerHTML.replace(/grammes/g, "g");
  });

  // Créer un élément <p> pour la description de la recette
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = recipe.description;
  descriptionElement.classList.add("description");

  // Ajouter les éléments à la carte de recette
  card.appendChild(imageElement);

  const topInfos = document.createElement("div");
  topInfos.classList.add("top-infos");
  topInfos.appendChild(nameElement);
  topInfos.appendChild(timeElement);
  card.appendChild(topInfos);

  bottomInfos = document.createElement("div");
  bottomInfos.classList.add("bottom-infos");
  bottomInfos.appendChild(ingredientsList);
  bottomInfos.appendChild(descriptionElement);
  card.appendChild(bottomInfos);

  // Ajouter la carte de recette au conteneur des recettes
  return card;
}

function displayRecipes(recipes) {
  // Effacez le contenu précédent du conteneur de recettes
  recipeContainer.innerHTML = '';

  // Parcourez toutes les recettes et créez les cartes correspondantes
  recipes.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeCard);
  });
}
  
async function init() {
  // Appel de la fonction pour afficher les recettes dans la console
  displayRecipes(recipes);
  // Ajouter des tags pour les ingrédients, les appareils et les ustensiles
  addIngredientsTags(ingredients);
  addAppliancesTags(appliances);
  addUstensilsTags(ustensils);
}

init();