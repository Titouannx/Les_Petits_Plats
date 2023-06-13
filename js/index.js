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

//Gestion bouttons ingrédients, appareils et ustensiles (hide/show label/input)
ingredientsButton.addEventListener('click', () => {
  if (ingredientsLabel.style.display === 'none') {
    ingredientsLabel.style.display = 'inline-block';
    ingredientsInput.style.display = 'none';
  }
  else {
    ingredientsLabel.style.display = 'none';
    ingredientsInput.style.display = 'inline-block';
  }
});

// Empêcher la propagation de l'événement de clic vers le bouton
ingredientsInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

appliancesButton.addEventListener('click', () => {
  if (appliancesLabel.style.display === 'none') {
    appliancesLabel.style.display = 'inline-block';
    appliancesInput.style.display = 'none';
  }
  else {
    appliancesLabel.style.display = 'none';
    appliancesInput.style.display = 'inline-block';
  }
});

// Empêcher la propagation de l'événement de clic vers le bouton
appliancesInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

ustensilsButton.addEventListener('click', () => {
  if (ustensilsLabel.style.display === 'none') {
    ustensilsLabel.style.display = 'inline-block';
    ustensilsInput.style.display = 'none';
  }
  else {
    ustensilsLabel.style.display = 'none';
    ustensilsInput.style.display = 'inline-block';
  }
});

// Empêcher la propagation de l'événement de clic vers le bouton
ustensilsInput.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Populate the tag dropdown menus dynamically
const ingredients = new Set();
const appliances = new Set();
const ustensils = new Set();
recipes.forEach(recipe => {
  recipe.ingredients.forEach(ingredient => ingredients.add(ingredient.ingredient));
  recipe.appliance && appliances.add(recipe.appliance);
  recipe.ustensils.forEach(ustensil => ustensils.add(ustensil));
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
      });
      selectedTagElement.textContent = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-ingredients');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
    });
    ingredientsTags.appendChild(tagElement);
  });
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
      });
      selectedTagElement.textContent = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-appliances');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
    });
    appliancesTags.appendChild(tagElement);
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
      });
      selectedTagElement.textContent = text;
      selectedTagElement.classList.add('selected-tag', 'selected-tag-ustensils');
      selectedTagElement.appendChild(deleteTagElement);
      selectedTags.appendChild(selectedTagElement);
      performSearch();
    });
    ustensilsTags.appendChild(tagElement);
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

// Add event listeners to the dropdown buttons to show/hide the dropdown menus
ingredientsButton.addEventListener("click", () => {
  if(ingredientsDropdown.style.display === "block") {
    ingredientsDropdown.style.display = "none";
  }
  else {
    ingredientsDropdown.style.display = "block";
  }
});
appliancesButton.addEventListener("click", () => {
  if(appliancesDropdown.style.display === "block") {
    appliancesDropdown.style.display = "none";
  }
  else {
    appliancesDropdown.style.display = "block";
  }
});
ustensilsButton.addEventListener("click", () => {
  if(ustensilsDropdown.style.display === "block") {
    ustensilsDropdown.style.display = "none";
  }
  else {
    ustensilsDropdown.style.display = "block";
  }
});

// Sélectionnez l'élément conteneur pour les recettes dans le HTML
const recipeContainer = document.getElementById("recipes-list");

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);

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

    // Retourner la recette si elle correspond à tous les critères de recherche
    return titleMatch && ingredientsMatch && descriptionMatch && tagsMatch;
  });

  // Mettre à jour l'affichage des recettes filtrées
  displayRecipes(filteredRecipes);
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