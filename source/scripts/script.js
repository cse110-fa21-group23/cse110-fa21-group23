// Import API from file
import { fetchRecipes } from "./api_script.js";
import { Router } from "./Router.js";

let recipeData = {};
let prevSearch = '';

const router = new Router(function () {
    showHome();
});


const tapModeButton = document.getElementById("tap-mode-button");
tapModeButton.addEventListener("click", toggleTapMode); // toggleTapMode() is in main.js

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
    bindDietFilters();
    bindCuisineFilters();
    bindTimeFilters();
    bindMealFilters();
}

/**
 * When page is initialized, create a home page to show
 *
 */
async function init() {
    showHome();
    createCategoryCards();
    bindPopState();
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

// tag functionality
//const timeFilter = ;
document.getElementById("cuisine-filter").addEventListener("click", (e)=>{
    console.log("clicking");
    let cuisineList = document.getElementsByName("cuisine-radio");
    let count = 0;
    for (let i = 0; i < cuisineList.length; i++) {
        if (cuisineList[i].checked) {
            count++;       
        }
    }
    if(count>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }
    
})
document.getElementById("diet-filter").addEventListener("click", (e)=>{
    console.log("clicking");
    let dietList = document.getElementsByName("diet-radio");
    let count = 0;
    for (let i = 0; i < dietList.length; i++) {
        if (dietList[i].checked) {
            count++;       
        }
    }
    if(count>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }
    
})
document.getElementById("meal-filter").addEventListener("click", (e)=>{
    console.log("clicking");
    let mealList = document.getElementsByName("meal-radio");
    let count = 0;
    for (let i = 0; i < mealList.length; i++) {
        if (mealList[i].checked) {
            count++;       
        }
    }
    if(count>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }
    
})
document.getElementById("time-filter").addEventListener("click", (e)=>{
    console.log("clicking");
    let timeList = document.getElementsByName("time-radio");
    let count = 0;
    for (let i = 0; i < timeList.length; i++) {

        if (timeList[i].checked) {
            count++;       
        }
    }
    if(count>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }
    
})

function searchByFilter () {
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();

    let cuisineList = document.getElementsByName("cuisine-radio");
    let cuisine = "";
    for (let i = 0; i < cuisineList.length; i++) {
        if (cuisineList[i].checked) {
            if (cuisine.length == 0) {
                cuisine =  `&cuisine=${cuisineList[i].value}`;
                console.log(cuisineList[i].value);
            }
            else {
                cuisine = cuisine + `,${cuisineList[i].value}`;
            }      
        }
    }

    let mealTypeList = document.getElementsByName("meal-radio");
    let mealType = "";
    for (let i = 0; i < mealTypeList.length; i++) {
        if (mealTypeList[i].checked) {
            if (mealType.length == 0) {
                mealType =  `&type=${mealTypeList[i].value}`;
                console.log(mealTypeList[i].value);
            }
            else {
                mealType =  mealType + `,${mealTypeList[i].value}`;
            }   
        }
    }

    let timeList = document.getElementsByName("time-radio");
    let time = "";
    for (let i = 0; i < timeList.length; i++) {
        if (timeList[i].checked) {
            time =  `&maxReadyTime=${parseInt(timeList[i].value)}`;
            console.log(timeList[i].value);     
        }
    }

    //get dietary restrictons from settings
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet ="";
    if (getDietaryRestrictions && getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    let diets = document.getElementsByName("dietary-radio");
    for (let i = 0; i < diets.length; i++) {
        if (diets[i].checked) {
            if (queryStrDiet.length == 0) {
                let diet = diets[i].value;
                queryStrDiet=`&diet=${diet}`
            }
            else {
                let diet = diets[i].value;
                queryStrDiet = queryStrDiet + `,${diet}`
            }
        }
    }


    
    //get intolerances from settings
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions && getIntolerancesRestrictions.length !== 0) {
        queryStrIntolerances = `&intolerances=${getIntolerancesRestrictions}`
    }

    const searchQuery = document.getElementById("search-query").value;
    return fetchRecipes(`&query=${searchQuery}${cuisine}${mealType}${time}${queryStrDiet}${queryStrIntolerances}`, (data) => {
            console.log(data)
            recipeData = data;
    });
}

document.getElementById("applyBtn").addEventListener("click", async () => {
    hideFilters();
    let searchSuccessful = await searchByFilter();
    if (searchSuccessful) {
        createRecipeCards();

    }
    
});


// The search function, calls API function to fetch all recipes
// Generates recipe cards by passing in values into RecipeData
/**
 * The search function, calls API functoin to fetch all recipes
 * Generates recipe cards by passing in values into RecipeData
 *
 * @return {Boolean} Whether search was successful
 */
function search() {
    clearFilterCheckBoxes();
    // get the search query
    const searchQuery = document.getElementById("search-query").value;
    const recipeCardContainer = document.getElementById('recipe-card-container');

    // If it is empty, alert the user it is empty
    if (!searchQuery) {
        alert("Please input a search or click a filter below");
        return false;
    }
    
    // If the prev search hasn't changed, simply keep the results
    if(prevSearch === searchQuery) return false;

    prevSearch = searchQuery;
    const page = searchQuery;
    router.addPage(page, function () {
        hideRecipePage();
        hideCategoryCards();
        showRecipeCards();
        showSearchBar();
        hideCookbooks();
        hideSettings();
        showFilterBtns();
        hideApplyBtn();
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
            window.scrollTo({top: 0, behavior: 'smooth'});
            hideHome();
            hideRecipeCards();
            showRecipePage();
            hideSettings();
            hideCookbooks();
            document.querySelector("recipe-page").data = recipeData[i];
            checkBookMark(recipeData[i]);
        });

        recipeCardContainer.appendChild(element);
        bindRecipeCard(element, id);
    }
}

function bindRecipeCard(recipeCard, pageName) {
    recipeCard.addEventListener('click', e => {
        if (e.composedPath()[0].nodeName == "A") return;
        router.navigate(pageName, false);
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
            hideSettings();
            showRecipeCards();
            hideRecipePage();
            showSearchBar();
            showFilterBtns();
            hideApplyBtn();
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
        hideFilters();
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
        toggleMenu();
    });
    cookbook.addEventListener("click", () => {
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

function bindDietFilters(){
    let diet = document.getElementById("dietBtn"); 
    let dietArrow = document.getElementById("dietIcon");
    diet.addEventListener("click", () => {
        // showDietFilters();
        toggleDietFilters();

    })
}

function bindCuisineFilters(){
    let cuisine = document.getElementById("cuisineBtn");  
    cuisine.addEventListener("click", () => {
        // showCuisineFilters();
        toggleCuisineFilters();

    })
}

function bindTimeFilters(){
    let time = document.getElementById("timeBtn");  
    let timeArrow = document.getElementById("timeIcon");
    time.addEventListener("click", () => {
        // showTimeFilters();
        toggleTimeFilters();

    })
}

function bindMealFilters(){
    let meal = document.getElementById("mealBtn");  
    let mealArrow = document.getElementById("mealIcon");
    meal.addEventListener("click", () => {
        // showMealFilters();
        toggleMealTypeFilters();

    })
}

window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;
