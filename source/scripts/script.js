// Import API from file
import { fetchRecipes } from '/source/scripts/api_script.js';
let recipeData = {};

//arrays holding category names and images for category cards
const categories = ["Indian", "Vegan", "Mexican", "Gluten-Free", "Italian", "Japanese", "American", "Vegetarian", "Thai", "Chinese", "Korean",
    "Vietnamese", "African", "Middle Eastern"];
const images = ["./img/foodPics/indian.jpeg", "./img/foodPics/vegan.jpeg", "./img/foodPics/mexican.jpeg",
    "./img/foodPics/gluten-free.jpeg", "./img/foodPics/italian.jpeg", "./img/foodPics/japanese.jpeg", "./img/foodPics/american.jpeg", "./img/foodPics/vegetarian.jpeg",
    "./img/foodPics/thai.jpeg", "./img/foodPics/chinese.jpeg", "./img/foodPics/korean.jpeg", "./img/foodPics/vietnamese.jpeg", "./img/foodPics/african.jpeg", "./img/foodPics/middleEastern.jpeg"];

window.addEventListener('DOMContentLoaded', init);

async function init() {
    showHome();
    createCategoryCards();
    showRecipePage();
    const clearBtn = document.getElementById("clear-btn");
    clearBtn.addEventListener('click', () => {
        const ele = document.getElementsByName("dietary-radio");
        for(var i=0;i<ele.length;i++)
           ele[i].checked = false;    
    })
    
    //on enter for search, call search function
    document.addEventListener('keydown', async function (event) {
        if (event.key === 'Enter') {
            let searchSuccessful = await search();
            if (searchSuccessful) {
                createRecipeCards();
            }
        }
    });

    // Add click event listener for search button
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", async () => {
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
    const searchQuery = document.getElementById("search-query").value;
    // let searchQuery = document.getElementById('search-query').value;
    // console.log(searchQuery);
    // console.log(localStorage.getItem("dietaryRestrictions"));
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');

    // Reset the recipe-card-container to be empty for every search
    recipeCardContainer.innerHTML = '';
    showRecipeCards();
    
    // check for user dietary restriction
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet = "";
    if(getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if(getIntolerancesRestrictions.length !== 0) {
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
    // hideRecipePage();
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "visible";
    //settings.style.transform = "translate(100%)";

    // Get the list of restrictions from local storage
    const getDietaryRestrictions = JSON.parse(localStorage.getItem("dietaryRestrictions"));
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    const dietaryContainerElements = document.getElementById("dietary-container").elements;
    const intolerancesContainerElements = document.getElementById("intolerances-container").elements;

    for (let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getDietaryRestrictions && getDietaryRestrictions.includes(dietaryRestriction.value)) {
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

function clearCheckBoxes() {
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    console.log(checkboxes);
    checkboxes.forEach(e => e.checked = false);
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
    // hideRecipePage();
    document.getElementById('search-query').value = ''; //clears search result
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}

function hideHome() {
    hideCategoryCards();
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
}

function showCookbooks() {
    hideSettings();
    hideHome();
    hideRecipeCards();
    // hideRecipePage()
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
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "visible";
}

function hideCategoryCards() {
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "hidden";
}

function showRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "visible";
}

function hideRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "hidden";
}

function toggleBookMark(bookmarkIcon) {
    // TODO: add bookmark/save-to-cookbook functionality to each recipe
    // maybe have a variable that we can use to toggle this 

    var url = new URL(bookmarkIcon.src);
    console.log(url.pathname);
    if (url.pathname == "/source/img/icons/bookmark-empty.svg") {
        bookmarkIcon.src = "./img/icons/bookmark-filled.svg";
    }
    else {
        bookmarkIcon.src = "./img/icons/bookmark-empty.svg";
    }
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
        document.querySelector("recipe-page").data = recipeData[i];
        recipeCardContainer.appendChild(element);
        bindRecipeCard(element);
    }
}

function bindRecipeCard(recipeCard) {
    recipeCard.addEventListener('click', event => {
        console.log("Recipe card has been clicked");
        const recipePageContainer = document.querySelector("#recipe-page-container");
        hideHome();
        hideRecipeCards();
        recipePageContainer.classList.remove("hidden");
    });
}



//this function creates 6 category cards from the categories and images arrays above using random 
//values so everytime the user refreshes, there will be a new set of categories
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

        bindCategoryCards(categoryCard, categories[randNums[i]]);
    }


}

//function to bind the click event to the category card to initiate the search
function bindCategoryCards(categoryCard, categoryName) {
    categoryCard.addEventListener("click", async (e) => {
        let searchQuery = categoryName;
        document.getElementById("search-query").value = searchQuery;

        let searchSuccessful = await searchByCategory();
        if (searchSuccessful) {
            console.log(recipeData);
            createRecipeCards();
        }
    })
}

//function to search when a category card is clicked
async function searchByCategory() {
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();

    let searchQuery = document.getElementById('search-query').value;
    recipeData = {};

    // check for user dietary restriction
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet = "";
    if(getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if(getIntolerancesRestrictions.length !== 0) {
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

window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;
