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