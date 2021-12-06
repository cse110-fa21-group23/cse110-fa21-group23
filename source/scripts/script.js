// Import API from file
import { fetchRecipes } from "./api_script.js";
import { Router } from "./Router.js";
import { getInstructions, getIngredients } from "./RecipePage.js";

let recipeData = {};
let prevSearch = '';
let currentRecipeData = {};

const router = new Router(function () {
    showHome();
});


const tapModeButton = document.getElementById("tap-mode-button");
tapModeButton.addEventListener("click", toggleTapMode); // toggleTapMode() is in main.js

// same variables used in main.js
var slideOverMenu = document.getElementById("slide-over-menu");
var menuIcon = document.getElementById("menu-icon");

document.addEventListener('click', function (event) {
    var isClickInside = slideOverMenu.contains(event.target);

    //the click was outside the slideOverMenu, close the menu without needing to click the x
    if (!isClickInside && !menuIcon.contains(event.target) && $SOMenuVisibility == "visible") { //if clicking outside
        menuIcon.classList.toggle("change");
        slideOverMenu.style.transform = "translate(-100%)";
        $SOMenuVisibility = "hidden";
    }
});

//arrays holding category names and images for category cards
const categories = ["Indian", "Vegan", "Mexican", "Gluten-Free", "Italian", "Japanese", "American", "Vegetarian", "Thai", "Chinese", "Korean",
    "Vietnamese", "African", "Middle Eastern"];
const images = ["./img/foodPics/indian.jpeg", "./img/foodPics/vegan.jpeg", "./img/foodPics/mexican.jpeg",
    "./img/foodPics/gluten-free.jpeg", "./img/foodPics/italian.jpeg", "./img/foodPics/japanese.jpeg", "./img/foodPics/american.jpeg", "./img/foodPics/vegetarian.jpeg",
    "./img/foodPics/thai.jpeg", "./img/foodPics/chinese.jpeg", "./img/foodPics/korean.jpeg", "./img/foodPics/vietnamese.jpeg", "./img/foodPics/african.jpeg", "./img/foodPics/middleEastern.jpeg"];

window.addEventListener('DOMContentLoaded', init);

/**
 * Binds a pop state to a routing page
 *
 */
function bindPopState() {
    window.addEventListener("popstate", (e) => {
        if (e.state) {
            router.navigate(e.state, true);
        }
        else {
            router.navigate("home", true);
        }
    })
}

/**
 * Calls all binding functions above and is called in the init function
 *
 */
function bindAll() {
    bindPopState();
    bindAppNameClick();
    bindSettingsPage();
    bindCookbookPage();
    bindHomePage();
}

/**
 * When page is initialized, create a home page to show
 *
 */
async function init() {
    showHome();
    createCategoryCards();
    bindAll();

    router.navigate("home", false); // clears url when user refreshes page

    const clearBtn = document.getElementById("clear-btn");
    clearBtn.addEventListener('click', () => {
        const ele = document.getElementsByName("dietary-radio");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
    })

    //on enter for search, call search function
    document.addEventListener('keydown', async function (event) {
        if (event.key === 'Enter') {
            let searchSuccessful = await search();
            if (searchSuccessful) {
                router.navigate(document.getElementById("search-query").value, false);
                createRecipeCards();
            }
        }
    });

    // Add click event listener for search button
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", async () => {
        let searchSuccessful = await search();
        if (searchSuccessful) {
            createRecipeCards();
        }
    });
}

// The search function, calls API function to fetch all recipes
// Generates recipe cards by passing in values into RecipeData
/**
 * The search function, calls API function to fetch all recipes
 * Generates recipe cards by passing in values into RecipeData
 *
 * @return {Boolean} Whether search was successful
 */
function search() {
    // get the search query
    const searchQuery = document.getElementById("search-query").value;
    const recipeCardContainer = document.getElementById('recipe-card-container');

    // If it is empty, alert the user it is empty
    if (!searchQuery) {
        alert("Please input a search or click a filter below");
        return false;
    }

    // If the prev search hasn't changed, simply keep the results
    if (prevSearch === searchQuery) return false;

    prevSearch = searchQuery;
    const page = searchQuery;
    router.addPage(page, function () {
        hideRecipePage();
        hideCategoryCards();
        showRecipeCards();
        showSearchBar();
        hideCookbooks();
        clearSavedRecipe();
        hideSettings();
    });

    router.navigate(page, false);//to clear url when user searches recipe

    // Reset the recipe-card-container to be empty for every search
    recipeCardContainer.innerHTML = '';
    showRecipeCards();

    // check for user dietary restriction
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet = "";
    if (getDietaryRestrictions && getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions && getIntolerancesRestrictions.length !== 0) {
        queryStrIntolerances = `&intolerances=${getIntolerancesRestrictions}`
    }

    // Fetch the Recipes with the specified queries
    const queries = `&query=${searchQuery}${queryStrDiet}${queryStrIntolerances}`;
    return fetchRecipes(queries, (data) => {
        recipeData = data;
    })
}


function createRecipeCards() {
    const recipeCardContainer = document.getElementById('recipe-card-container');
    for (let i = 0; i < recipeData.length; i++) {
        const element = document.createElement('recipe-card');
        element.data = recipeData[i];
        document.querySelector("recipe-page").data = recipeData[i];

        const id = recipeData[i]["id"];
        router.addPage(id, function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            hideHome();
            hideRecipeCards();
            showRecipePage();
            hideSettings();
            hideCookbooks();
            clearSavedRecipe();
            document.querySelector("recipe-page").data = recipeData[i];
            checkBookMark(recipeData[i]);
        });

        recipeCardContainer.appendChild(element);
        bindRecipeCard(element, id, recipeData[i]);
    }
}

function bindRecipeCard(recipeCard, pageName, data) {
    recipeCard.addEventListener('click', e => {
        if (e.composedPath()[0].nodeName == "A") return;
        router.navigate(pageName, false);
        currentRecipeData = data;
    });
}


/**
 * Creates 6 category cards from the categories and images arrays above using random
 * values so every time the user refreshes, there will be a new set of categories
 *
 */
function createCategoryCards() {
    console.log('creating category cards')
    /* creating an array of length 6 to hold random non-repeating values that are in
        range of all categories in the categories array */
    const randNums = []; // array to hold the random non repeating values 
    for (let i = 0; i < 6; i++) {
        let rand = Math.floor(Math.random() * categories.length);
        while (randNums.indexOf(rand) !== -1) {
            rand = Math.floor(Math.random() * categories.length);
        }
        randNums.push(rand);
    }

    //creating 6 category cards from the random values in the randNums array
    for (let i = 0; i < randNums.length; i++) {

        const categoryCard = document.createElement("category-card"); // creating category card
        let arr = [categories[randNums[i]], images[randNums[i]]]; // array holding the category and corresponding image
        categoryCard.data = arr; //key: name of category, value: picture of category


        document.querySelector(".category-cards--wrapper").appendChild(categoryCard);
        const page = categories[randNums[i]];

        router.addPage(page, function () {
            hideCategoryCards();
            hideCookbooks();
            clearSavedRecipe();
            hideSettings();
            showRecipeCards();
            hideRecipePage();
            showSearchBar();
        });

        bindCategoryCards(categoryCard, categories[randNums[i]]);
    }


}

//function to bind the click event to the category card to initiate the search
/**
 * Binds the click event to the category card to initiate the search
 *
 * @param {Element} categoryCard the category card to bind to
 * @param {String} categoryName the name of the category searched
 */
function bindCategoryCards(categoryCard, categoryName) {
    categoryCard.addEventListener("click", async (e) => {
        let searchQuery = categoryName;
        document.getElementById("search-query").value = searchQuery;

        let searchSuccessful = await searchByCategory();
        if (searchSuccessful) {
            console.log(recipeData);
            createRecipeCards();
        }
    });
}

/**
 * Function to search when a category card is clicked
 *
 * @return {Promise} a Promise whether recipes have been fetched correctly
 */
async function searchByCategory() {
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();

    let searchQuery = document.getElementById('search-query').value;
    recipeData = {};
    router.navigate(searchQuery, false);
    // check for user dietary restriction
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet = "";
    if (getDietaryRestrictions && getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions && getIntolerancesRestrictions.length !== 0) {
        queryStrIntolerances = `&intolerances=${getIntolerancesRestrictions}`
    }

    //if user clicked a diet category, sends search query to diet endpoint
    if (searchQuery == "Vegetarian" || searchQuery == "Vegan" || searchQuery == "Gluten-Free") {
        return fetchRecipes(`&diet=${searchQuery}${queryStrIntolerances}`, (data) => {
            recipeData = data
        })
    }
    //if user clicked a cuisine category, sends search query to cuisine endpoint
    else {
        return fetchRecipes(`&cuisine=${searchQuery}${queryStrDiet}${queryStrIntolerances}`, (data) => {
            recipeData = data;
        });
    }
}


//function to return to home when app name is clicked
/**
 * Returns to home when app name is clicked
 *
 */
function bindAppNameClick() {
    let appName = document.getElementById("app-name");
    const page = "home";
    router.addPage(page, function () {
        showHome();
    });
    appName.addEventListener("click", () => {
        router.navigate(page, false);
    })
}

/**
 * Goes to cookbook page when cookbook is clicked
 *
 */
function bindCookbookPage() {
    let cookbook = document.getElementById("cookbook-page");
    const page = "cookbooks";
    router.addPage(page, function () {
        showCookbooks();
        showSavedRecipe();
        if ($SOMenuVisibility == "hidden") {
            $SOMenuVisibility = "visible";
            var menuIcon = document.getElementById("menu-icon");
            menuIcon.classList.toggle("change");
        }
        toggleMenu();
    });
    cookbook.addEventListener("click", () => {
        clearSavedRecipe();
        router.navigate(page, false);
    })
}

/**
 * Goes to setting page when settings is clicked
 *
 */
function bindSettingsPage() {
    let settings = document.getElementById("settings-page");
    const page = "settings";
    router.addPage(page, function () {
        showSettings();
        toggleMenu();
    });
    settings.addEventListener("click", () => {
        router.navigate(page, false);
    })
}

/**
 * Goes to home page when home is clicked
 *
 */
function bindHomePage() {
    let home = document.getElementById("home-page");
    const page = "home";
    router.addPage(page, function () {
        showHome();
    });
    home.addEventListener("click", () => {
        toggleMenu();
        router.navigate(page, false);
    })
}

/* Start Cookbook Display ===================================================*/
/**
 * Show cookbooks page
 *
 */
 function showCookbooks() {
    hideSettings();
    hideHome();
    hideRecipeCards();
    hideRecipePage();
    showCookbooksDisplay();
    hideListDisplay();
    initializeCookbook();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
    cookbook.style.display = null;
    document.querySelector("body > main > div.box").style.display = "none";
}

/**
 * Clears the cookbook display and replaces it with all cookbooks currently in local storage.
 * Sets up the +New Cookbook to prompt the user for a new cookbook
 * If there no cookbooks in local storage it will create a default cookbook
 */
 function initializeCookbook() {
    // Sets up the +New Cookbook prompt
    document.getElementById("add-empty-cookbook").onclick = function () {addNewCookbookPrompt()};
    let cookbooksList = document.querySelector("#cookbook-display-lists > ol");
    // Clears the cookbook display
    while (cookbooksList.firstChild) {
        cookbooksList.removeChild(cookbooksList.firstChild);
    }

    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    // Makes sure the cookbook array exist
    if (cookbooks == null) {
        cookbooks = [defaultCookbook];
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
    }

    // First we check to see if we already have any cookbooks, if we don't we set up the default one
    // The img is the part where when clicked prompts you to confirm removing that cookbook
    if (cookbooks.length === 0) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let label = document.createElement("label");
        // set img src
        img.alt = "bookmark";
        img.src = "./img/icons/bookmark-empty.svg";
        img.height = 20;
        img.width = 20;
        label.innerText = defaultCookbook;
        li.appendChild(img);
        li.appendChild(label);
        cookbooksList.appendChild(li);
        img.onclick = function() {confirmRemoveList(li)};
        label.onclick = function() {showThisList(defaultCookbook)};
        localStorage.setItem(defaultCookbook, JSON.stringify([]));
    } else {
        for (let i = 0; i < cookbooks.length; i++) {
            let li = document.createElement("li");
            let img = document.createElement("img");
            let label = document.createElement("label");
            // set img src
            img.alt = "bookmark";
            if (JSON.parse(localStorage.getItem(cookbooks[i])) == undefined || JSON.parse(localStorage.getItem(cookbooks[i])) == null || 
            JSON.parse(localStorage.getItem(cookbooks[i])).length === 0) {
                img.src = "./img/icons/bookmark-empty.svg";
            } else {
                img.src = "./img/icons/bookmark-filled.svg";
            }  
            img.height = 20;
            img.width = 20;
            label.innerText = cookbooks[i];
            li.appendChild(img);
            li.appendChild(label);
            cookbooksList.appendChild(li);
            img.onclick = function() {confirmRemoveList(li)};
            label.onclick = function() {showThisList(cookbooks[i])};
        }
    }
}

/**
 * Shows the contents of the inputted cookbook; if it is empty it will inform the user
 * 
 * @param {*} cookbook The cookbook to display
 */
function showThisList(cookbook) {
    document.getElementById("list-name-header").innerText = cookbook;
    const recipeCardsContainer = document.getElementById('cookbook-contents');
    const cookbookIDs = JSON.parse(localStorage.getItem(cookbook));
    let childrenToRemove = recipeCardsContainer.querySelectorAll("recipe-card");
    // Clears previous recipe cards, might not be needed
    for (let i = 0; i < childrenToRemove.length; i++) {
        childrenToRemove[i].remove();
    }
    console.log(cookbookIDs);

    // Pretty much copied this from the showRecipeCards function not all that sure how it works
    for (let i = 0; i < cookbookIDs.length; i++) {
        const element = document.createElement('recipe-card');
        let jsonData = JSON.parse(localStorage.getItem(`ID-${cookbookIDs[i]}`));
        element.data = jsonData;
        // Not sure why this is here but it was there in the createRecipeCards() code so I'll just leave it in
        document.querySelector("recipe-page").data = jsonData;
        const id = cookbookIDs[i];

        router.addPage(id, function () {
            window.scrollTo({top: 0, behavior: 'smooth'});
            hideHome();
            hideRecipeCards();
            showRecipePage();
            hideSettings();
            hideCookbooks();
            document.querySelector("recipe-page").data = jsonData;
            checkBookMark(jsonData);
        });

        // TODO: Add a container for the recipe card with a trash or bookmark button inside it to remove the recipe
        // Could do something like what's done in initialize cookbook but have the label be the recipe card.
        recipeCardsContainer.appendChild(element);
        bindRecipeCard(element, id);
    }

    // Hides or shows the empty cookbook message based on the length of the cookbook
    if (cookbookIDs.length === 0) {
        document.getElementById("empty-list").classList.remove("hidden");
    } else {
        document.getElementById("empty-list").classList.add("hidden");
    }

    hideCookbooksDisplay();
    showListDisplay();
}

/**
 * Confirms that the user wants to remove the cookbook then, if confirmed, removes it and it's contents
 *
 * @param {*} cookbookName the cookbook to remove
 */
function confirmRemoveList(li) {
    let cookbookName = li.querySelector("label").textContent;
    let cookbookIDs = JSON.parse(localStorage.getItem(cookbookName));
    if (confirm(("Are you sure you want to permanently remove " + cookbookName + " and its contents from your cookbooks?"))) {
        // Removes the cookbook and its elements from local storage
        // NOTE: Removes all recipes from that cookbook even if they are in another cookbook
        // so this might be a bug or not depending on what we want to do
        for (let i = 0; i < cookbookIDs.length; i++) {
            localStorage.removeItem(`ID-${cookbookIDs[i]}`);
        }
        localStorage.removeItem(cookbookName);
        let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
        cookbooks.splice(cookbooks.indexOf(cookbookName), 1);
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
        li.remove();
    }
}

/**
 * Prompts the user for a new cookbook name, gets rid of unnecessary spaces, then checks if it is valid.
 * If it is valid it adds that cookbook to the list of cookbooks.
 *
 */
 function addNewCookbookPrompt() {
    let cookbookName = prompt("What would you like to name this cookbook?");
    if (cookbookName != null) {
        cookbookName = cookbookName.replace(/\s+/g, ' ').trim();
    }

    while (processTextSubmitCookbook(cookbookName) === false && cookbookName != null) {
        if (cookbookName == "") {
            cookbookName = prompt("Error: No input detected. Please choose a valid name.");
        } else {
            cookbookName = prompt("Error: Another cookbook already has that name. Please choose another.");
        }
        if (cookbookName != null) {
            cookbookName = cookbookName.replace(/\s+/g, ' ').trim();
        }
    }

    if (processTextSubmitCookbook(cookbookName) === true) {
        let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
        cookbooks.push(cookbookName);
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
        let recipeArr = [];
        localStorage.setItem(cookbookName, JSON.stringify(recipeArr));
        initializeCookbook();
    }
}

/**
 * Checks to see if the cookbook name is valid
 *
 * @param {*} userInput the cookbook name to check
 * @return {*} true if the name isn't null, empty, or already in use. Otherwise it returns false
 */
function processTextSubmitCookbook(userInput) {
    // Checks if the input is empty, if so it changes the request text and exits the function
    console.log("UI: " + userInput);
    if (userInput == "" || userInput == null) {
        return false;
    }
    // Checks if the input is the same as another cookbook, if so it changes the request text and exits the function
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    for (let i= 0; i < cookbooks.length; i++) {
        if (cookbooks[i] == userInput) {
            return false;
        }
    }
    return true;
}

/**
 * Hides the display for a cookbook's contents
 *
 */
function hideListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "hidden";
}

/**
 * Shows the display for a cookbook's contents
 *
 */
function showListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "visible";
}

/**
 * Hides the display of cookbooks
 *
 */
function hideCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "hidden";
    listDisplay.style.display = "none";
}

/**
 * Shows the display of cookbooks
 *
 */
function showCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "visible";
    listDisplay.style.display = null;
}

/* End Cookbook Display =====================================================*/
// get the email form button to handle submission
const emailFormSubmit = document.getElementById("share-recipe-email");
emailFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const label = document.getElementById("recipe-email-label");
    const getInputValue = document.getElementById("recipe-email");

    if (!getInputValue.value) {
        label.style.visibility = "visible";
        getInputValue.style.border = "1px solid red";
        return;
    }

    // get the recipe title and format the subject
    const recipeTitle = currentRecipeData.title;
    const subject = `Recipe: ${recipeTitle}`;

    // get the instructions
    const instructions = getInstructions(currentRecipeData).join(", %0D%0A");
    // get the ingredients
    const ingredients = getIngredients(currentRecipeData).join(", %0D%0A");

    // format the email to include ingredients and instructions
    const body = `Ingredients: %0D%0A ${ingredients} 
    %0D%0A
    %0D%0A Instructions: %0D%0A ${instructions}`;

    window.open(`mailto:${getInputValue.value}?subject=${subject}&body=${body}`);
});

window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;