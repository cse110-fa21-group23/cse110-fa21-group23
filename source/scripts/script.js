// Import API from file
import { fetchRecipes } from '/source/scripts/api_script.js';
let recipeData = {};

window.addEventListener('DOMContentLoaded', init);

async function init() {
    showHome();
    // Add event listener for pressing enter
    document.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            let searchSuccessful = await search();
            if(searchSuccessful) {
                createRecipeCards();
            }
        }
    });

    // Add click event listener for search button
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
        let searchSuccessful = await search();
        if(searchSuccessful) {
            createRecipeCards();
        }
    });

    // // Make the "Show more" button functional
    // bindShowMore();
}

// The search function, calls API function to fetch all recipes
// Generates recipe cards by passing in values into RecipeData
function search() {
    // get the search query
    const searchQuery = document.getElementById('search-query').value;
    const recipeCardContainer = document.getElementById('recipe-card-container');

    // Reset the recipe-card-container to be empty for every search
    recipeCardContainer.innerHTML = '';
    showRecipeCards();
    
    // check for user dietary restriction
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet = "";
    if(getDietaryRestrictions) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if(getIntolerancesRestrictions) {
        queryStrIntolerances = `&intolerances=${getIntolerancesRestrictions}`
    }

    // If it is empty, alert the user it is empty
    if(!searchQuery) {
        alert("Please input a search or click a filter below");
        return;
    }

    // Fetch the Recipes with the specified queries
    const queries = `&query=${searchQuery}${queryStrDiet}${queryStrIntolerances}`;
    return fetchRecipes(queries, (data) => {
        recipeData = data;
    })
}

let $SOMenuVisibility = "hidden";
function toggleMenu() {
    const menuIcon = document.getElementById("menu-icon");
    menuIcon.classList.toggle("change");

    const slideOverMenu = document.getElementById("slide-over-menu");

    if ($SOMenuVisibility == "hidden") {
        slideOverMenu.style.transform = "translate(100%)";
        $SOMenuVisibility = "visible";
    }
    else {
        slideOverMenu.style.transform = "translate(-100%)";
        $SOMenuVisibility = "hidden";
    }
}

function showSettings() {
    hideHome();
    hideCookbooks();
    hideRecipeCards();
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "visible";
    //settings.style.transform = "translate(100%)";

    // Get the list of restrictions from local storage
    const getDietaryRestrictions = JSON.parse(localStorage.getItem("dietaryRestrictions"));
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    const dietaryContainerElements = document.getElementById('dietary-container').elements;
    const intolerancesContainerElements = document.getElementById('intolerances-container').elements;

    for (let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getDietaryRestrictions.includes(dietaryRestriction.value)) {
            dietaryRestriction.checked = true;
        }
    }

    for(let i = 0; i < intolerancesContainerElements.length; i++) {
        const intoleranceRestriction = intolerancesContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if(getIntolerancesRestrictions && getIntolerancesRestrictions.includes(intoleranceRestriction.value)) {
            intoleranceRestriction.checked = true;
        }
    }
}

function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "hidden";
    // settings.style.transform = "translate(-100%)";
}

function showHome() {
    hideSettings();
    hideCookbooks();
    hideSettings();
    hideRecipeCards();
    showCategoryCards();
    document.getElementById('search-query').value = ''; //clears search result
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}

function hideHome() {
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
}

function showCookbooks() {
    hideSettings();
    hideHome();
    hideRecipeCards();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
}

function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
}

function showRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "visible";
}
function hideRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "hidden";
}

function showCategoryCards() {
    const categoryCards = document.getElementById("category-card-container");
    categoryCards.style.visibility = "visible";
}

function hideCategoryCards() {
    const categoryCards = document.getElementById("category-card-container");
    categoryCards.style.visibility = "hidden";
}

function updateSettings() {
    const dietaryRestrictionList = [];
    // Get all the inputs under the div
    const dietaryContainerElements = document.getElementById('dietary-container').elements;
    for (let i = 0; i < dietaryContainerElements.length; i++) {
        // If a checkbox is checked, then add it to our list
        const inputElement = dietaryContainerElements[i];
        if (inputElement.checked) {
            dietaryRestrictionList.push(inputElement.value);
        }
    }

    const intolerancesRestrictionsList = [];
    const intolerancesContainerElements = document.getElementById("intolerances-container");
    for(let i = 0; i < intolerancesContainerElements.length; i++) {
        // If a checkbox is checked, then add it to our list
        const inputElement = intolerancesContainerElements[i];
        if(inputElement.checked) {
            intolerancesRestrictionsList.push(inputElement.value);
        }
    }

    // Add lists to local storage
    localStorage.setItem("dietaryRestrictions", JSON.stringify(dietaryRestrictionList));
    localStorage.setItem("intolerancesRestrictions", JSON.stringify(intolerancesRestrictionsList));
    
    // TODO: add confirmation message in HTML (alert is temporary)
    alert("your preferences have been updated");
}

function createRecipeCards() {
    const recipeCardContainer = document.getElementById('recipe-card-container');
    for (let i = 0; i < recipeData.length; i++) {
        const element = document.createElement('recipe-card');
        element.data = recipeData[i];
        recipeCardContainer.appendChild(element);
    }
}

window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;






