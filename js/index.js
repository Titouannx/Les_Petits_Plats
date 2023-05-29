// Sélectionnez l'élément conteneur pour les recettes dans le HTML (par exemple, <div id="recipe-container"></div>)
const recipeContainer = document.getElementById("recipes-list");

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si le terme de recherche est présent dans le titre, les ingrédients ou la description
    const titleMatch = recipe.name.toLowerCase().includes(searchTerm);
    const ingredientsMatch = recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(searchTerm)
    );
    const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);

    // Retourner la recette si elle correspond à l'un des critères de recherche
    return titleMatch || ingredientsMatch || descriptionMatch;
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
}

init();