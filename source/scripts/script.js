// Import API from file
import { fetchRecipes } from "./api_script.js";
import { Router } from "./Router.js";
import { getInstructions, getIngredients } from "./RecipePage.js";

let recipeData = {};
let prevSearch = '';
let filters = [];
let currentRecipeData = {};

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
            if(filters.length>0){
                showApplyBtn();
            }
            router.navigate(e.state, true);
        }
        else {
            filters = [];
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



    // Add click event listener for search button
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", async () => {
        if(filters.length>0){
            let searchSuccessful = await searchByFilter();
            if (searchSuccessful) {
                
                router.navigate(document.getElementById("search-query").value, false);
                createRecipeCards();
            }
        }
        else{
        let searchSuccessful = await search();
            if (searchSuccessful) {
                 router.navigate(document.getElementById("search-query").value, false);
                 createRecipeCards();
             }
        }
    });
}

    //on enter for search, call search function
    document.addEventListener('keydown', async function (event) {
        if (event.key === 'Enter') {
            if(filters.length>0){
                let searchSuccessful = await searchByFilter();
                if (searchSuccessful) {
                    
                    router.navigate(document.getElementById("search-query").value, false);
                    createRecipeCards();
                }
            }
            else{
            let searchSuccessful = await search();
                if (searchSuccessful) {
                     router.navigate(document.getElementById("search-query").value, false);
                     createRecipeCards();
                 }
            }
        }
    });
// tag functionality
/**
 * Adds an eventlistener to the cuisine filters to populate the array needed
 * to display all selected filters
 *
 */
document.getElementById("cuisine-filter").addEventListener("click", (e)=>{
    // console.log("clicking");
    let cuisineList = document.getElementsByName("cuisine-radio");
    let count = 0;
    for (let i = 0; i < cuisineList.length; i++) {
        if (cuisineList[i].checked) {
            count++;   
            // console.log(count)
            if(filters.indexOf(cuisineList[i].value) == -1) {
                filters.push(cuisineList[i].value);      
            }
        }
        else{
            if(filters.indexOf(cuisineList[i].value) !== -1){
                filters.splice(filters.indexOf(cuisineList[i].value), 1);
            }
        }
    }
    // console.log(filters);
    if(filters.length>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }

    //createFilter function is called to create the filter element for each filter in the array
    createFilters();
});

/**
 * Adds an eventlistener to the diet filters to populate the array needed
 * to display all selected filters
 *
 */
document.getElementById("diet-filter").addEventListener("click", (e)=>{
    // console.log("clicking");
    let dietList = document.getElementsByName("diet-radio");

    /*
    This little for loop is to allow the radio buttons to be deselcted and selected like 
    checkboxes but only allow for one radio button to be selected at a time
    */ 
    let dietRadios = document.getElementsByName("diet-radio");
    for (let i = 0; i < dietRadios.length; i++) {  
        if (dietRadios[i].checked == true) {
            dietRadios[i].addEventListener("click", (e) => {
                    if (e.target.checked == true) {
                        e.target.checked = false;
                    }
                });
        } 
        else {
            dietRadios[i].addEventListener("click", (e) => {
                if (e.target.checked == false) {
                    e.target.checked = true;
                }
            });

        }
    }
    /*
        This for loop adds the checked filters to the filters array once the user
        checks that filter. If the user unchecks the filter, it will remove the
        filter from the array.
    */
    let count = 0;
    for (let i = 0; i < dietList.length; i++) {
        if (dietList[i].checked) {
            count++;  
            if(filters.indexOf(dietList[i].value) == -1) {
                // console.log("adding");
                filters.push(dietList[i].value);      
            }
        
        }
        else{
            if(filters.indexOf(dietList[i].value) !== -1){
                // console.log("splicing");
                filters.splice(filters.indexOf(dietList[i].value), 1);
            }
        }
    }

    // shows apply and clear buttons if filters are selected
    if(filters.length>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }
    
    //createFilter function is called to create the filter element for each filter in the array
    createFilters();
});

/**
 * Adds an eventlistener to the meal filters to populate the array needed
 * to display all selected filters
 *
 */
document.getElementById("meal-filter").addEventListener("click", (e)=>{
    // console.log("clicking");
    let mealList = document.getElementsByName("meal-radio");
    let count = 0;


    for (let i = 0; i < mealList.length; i++) {
        if (mealList[i].checked) {
            count++;    
            if(filters.indexOf(mealList[i].value) == -1) {
                filters.push(mealList[i].value);      
            }   
            else{
                if(filters.indexOf(mealList[i].value) !== -1){
                    filters.splice(filters.indexOf(mealList[i].value), 1);
                }
            }  
        }
    }

     // shows apply and clear buttons if filters are selected
    if(filters.length>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }

    //createFilter function is called to create the filter element for each filter in the array
    createFilters();  
});

/**
 * Adds an eventlistener to the time filters to populate the array needed
 * to display all selected filters
 *
 */
document.getElementById("time-filter").addEventListener("click", (e)=>{
    // console.log("clicking");
    let timeList = document.getElementsByName("time-radio");

     /*
    Similar to the for loop in the diet-radio section up above, this for loop allows for radio buttons
    for the time to be selected and deselected like a normal checkbox but only one will be allowed to be 
    selected at a time
    */
    for (let i = 0; i < timeList.length; i++) {  
        if (timeList[i].checked == true) {
            timeList[i].addEventListener("click", (e) => {
                    if (e.target.checked == true) {
                        e.target.checked = false;
                    }
                });
        } 
        else {
            timeList[i].addEventListener("click", (e) => {
                if (e.target.checked == false) {
                    e.target.checked = true;
                }
            });

        }
    }


    let count = 0;
    for (let i = 0; i < timeList.length; i++) {
        if (timeList[i].checked) {
            count++;   
            if(filters.indexOf(timeList[i].value) == -1) {
                filters.push(timeList[i].value);      

            }  
        }
        else{
            if(filters.indexOf(timeList[i].value) !== -1){
                filters.splice(filters.indexOf(timeList[i].value), 1);
            }
        }  
    }
    
    // shows apply and clear buttons if filters are selected
    if(filters.length>0){
        showApplyBtn();
    }
    else{
        hideApplyBtn();
    }

    //createFilter function is called to create the filter element for each filter in the array
    createFilters();
});

/**
 * Function to create filter-card elements based off of the selected 
 * filters in the filters array.
 *
 */
function createFilters() {
    resetFilters();
    console.log(filters);
    for(let i = 0; i<filters.length; i++){
        const filter = document.createElement("filter-card"); 
        filter.data = filters[i]; 
        document.querySelector(".selected-filters-container").appendChild(filter);
    }
}

/**
 * Function to filter the search the by the filters that the user 
 * selects
 *
 */
function searchByFilter () {
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();

    /*
        For loop to check if there are values checked in the cuisine menu
        and prepares the string that will get sent to the endpoint
    */
    let cuisineList = document.getElementsByName("cuisine-radio");
    let cuisine = "";
    for (let i = 0; i < cuisineList.length; i++) {
        if (cuisineList[i].checked) {
            if (cuisine.length == 0) {
                cuisine =  `&cuisine=${cuisineList[i].value}`;
                // console.log(cuisineList[i].value);
            }
            else {
                cuisine = cuisine + `,${cuisineList[i].value}`;
            }      
        }
    }

    /*
        For loop to check if there are values checked in the meal menu
        and prepares the string that will get sent to the endpoint
    */
    let mealTypeList = document.getElementsByName("meal-radio");
    let mealType = "";
    for (let i = 0; i < mealTypeList.length; i++) {
        if (mealTypeList[i].checked) {
            if (mealType.length == 0) {
                mealType =  `&type=${mealTypeList[i].value}`;
                // console.log(mealTypeList[i].value);
            }
            else {
                mealType =  mealType + `,${mealTypeList[i].value}`;
            }   
        }
    }

    /*
        For loop to check if there are values checked in the time menu
        and prepares the string that will get sent to the endpoint
    */
    let timeList = document.getElementsByName("time-radio");
    let time = "";
    for (let i = 0; i < timeList.length; i++) {
        if (timeList[i].checked) {
            time =  `&maxReadyTime=${parseInt(timeList[i].value)}`;
            // console.log(timeList[i].value);     
        }
    }

    //get dietary restrictons from settings
    const getDietaryRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions'));
    let queryStrDiet ="";
    if (getDietaryRestrictions && getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    /*
        For loop to check if there are values checked in the diet menu
        and prepares the string that will get sent to the endpoint
        If a user has a dietary restriction set, it will be overwritten
        when a diet filter is chosen
    */
    let diets = document.getElementsByName("diet-radio");
    for (let i = 0; i < diets.length; i++) {
        if (diets[i].checked) {
             let diet = diets[i].value;
             queryStrDiet=`&diet=${diet}`;
        }
    }
    
    //get intolerances from settings
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions && getIntolerancesRestrictions.length !== 0) {
        queryStrIntolerances = `&intolerances=${getIntolerancesRestrictions}`
    }

    //gets the search query from the search bar
    let searchQuery = document.getElementById("search-query").value;
    let page = "";
    if(searchQuery.length>0){
        page = searchQuery;
    }
    else{
        page = "Filters";
    }
    router.addPage(page, function () {
        hideRecipePage();
        hideCategoryCards();
        showRecipeCards();
        showSearchBar();
        hideCookbooks();
        hideSettings();
        showFilterBtns();
        showSelectedFilters();
    });

    router.navigate(page, false);
    let searchQueryStr = `&query=${searchQuery}`
    if(categories.indexOf(searchQuery) !== -1){
        searchQueryStr = '';
        if (searchQuery == "Vegetarian" || searchQuery == "Vegan" || searchQuery == "Gluten-Free") {
            queryStrDiet = `&diet=${searchQuery}`;

        }
        else{
            if(cuisine.length !== 0){
                cuisine = cuisine + `,${searchQuery}`;
            }
            else{
                cuisine = `&cuisine=${searchQuery}`;
            }
        }
        
        
    }
    
    console.log(searchQuery);
    return fetchRecipes(`${searchQueryStr}${cuisine}${mealType}${time}${queryStrDiet}${queryStrIntolerances}`, (data) => {
            console.log(data)
            if(data.length == 0){
                alert("No recipes match those filters.");
            }
            else{
                recipeData = data;
            }
    });
}

/**
 * Adds an eventlistener to the apply button to search based on the 
 * filters that the user chose
 *
 */
document.getElementById("applyBtn").addEventListener("click", async () => {
    hideFilters();
    let searchSuccessful = await searchByFilter();
    if (searchSuccessful) {
        createRecipeCards();
    }
});

/**
 * Adds an eventlistener to the clear button to clear all of the filters
 * that the user selected
 *
 */
document.getElementById("clear-filters-btn").addEventListener("click", () => {
    // console.log(filters)
    filters = [];
    clearAllFilters();
    // console.log(filters)
})


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
    if (prevSearch === searchQuery) return false;

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
    for (let i = 0; i < Object.keys(recipeData).length; i++) {
        Object.keys(recipeData)[i];
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
            hideSettings();
            showRecipeCards();
            hideRecipePage();
            showSearchBar();
            showFilterBtns();
            hideApplyBtn();
            showSelectedFilters();
            if(filters.length>0){
                showApplyBtn();
            }
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
        if(filters.length>0){
            let searchSuccessful = await searchByFilter();
            if (searchSuccessful) {
                
                router.navigate(document.getElementById("search-query").value, false);
                createRecipeCards();
            }
        }
        else{
        let searchSuccessful = await search();
            if (searchSuccessful) {
                 router.navigate(document.getElementById("search-query").value, false);
                 createRecipeCards();
             }
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
        filters = [];
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
        filters = [];
        router.navigate(page, false);
    })
}
/**
 * This function adds an event listener waiting for the user to click on the diet filters button
 * which will then call toggleDietFilters() method to either reveal or hide the diet filters drop down menu
 * and change the direction of the arrow icon
 */
function bindDietFilters(){
    let diet = document.getElementById("dietBtn"); 
    diet.addEventListener("click", () => {
        toggleDietFilters();

    })
}


/**
 * This function adds an event listener waiting for the user to click on the cuisine filters button 
 * and change the direction of the arrow icon which will then call toggleCuisineFilters() method to 
 * either reveal or hide the cuisine filters drop down menu
 */
function bindCuisineFilters(){
    let cuisine = document.getElementById("cuisineBtn");  
    cuisine.addEventListener("click", () => {
        toggleCuisineFilters();
    })
}

/** This function adds an event listener waiting for the user to click on the time filters button
 * which will then call toggleTimeFilters() method to either reveal or hide the time filters drop down menu
 * and change the direction of the arrow icon
 */
function bindTimeFilters(){
    let time = document.getElementById("timeBtn");  
    time.addEventListener("click", () => {
        toggleTimeFilters();

    })
}
/** This function adds an event listener waiting for the user to click on the meal type filters button
 *  which will then call toggleMealTypeFilters() method to either reveal or hide the meal type filters
 *  drop down menu and change the direction of the arrow icon
 */

function bindMealFilters(){
    let meal = document.getElementById("mealBtn");  
    meal.addEventListener("click", () => {
        toggleMealTypeFilters();

    })
}
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
