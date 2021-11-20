// Import API from file
import { fetchRecipes } from "./api_script.js";
import { Router } from "./Router.js";

let recipeData = {};

const router = new Router(function () {
    showHome();
});

//arrays holding category names and images for category cards
const categories = ["Indian", "Vegan", "Mexican", "Gluten-Free", "Italian", "Japanese", "American", "Vegetarian", "Thai", "Chinese", "Korean",
    "Vietnamese", "African", "Middle Eastern"];
const images = ["./img/foodPics/indian.jpeg", "./img/foodPics/vegan.jpeg", "./img/foodPics/mexican.jpeg",
    "./img/foodPics/gluten-free.jpeg", "./img/foodPics/italian.jpeg", "./img/foodPics/japanese.jpeg", "./img/foodPics/american.jpeg", "./img/foodPics/vegetarian.jpeg",
    "./img/foodPics/thai.jpeg", "./img/foodPics/chinese.jpeg", "./img/foodPics/korean.jpeg", "./img/foodPics/vietnamese.jpeg", "./img/foodPics/african.jpeg", "./img/foodPics/middleEastern.jpeg"];

window.addEventListener('DOMContentLoaded', init);

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

//calls all binding functions above and is called in the init function
function bindAll() {
    bindPopState();
    bindAppNameClick();
    bindSettingsPage();
    bindCookbookPage();
    bindHomePage();
}

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

// The search function, calls API function to fetch all recipes
// Generates recipe cards by passing in values into RecipeData
function search() {
    // get the search query
    const searchQuery = document.getElementById("search-query").value;
    // let searchQuery = document.getElementById('search-query').value;
    // console.log(searchQuery);
    // console.log(localStorage.getItem("dietaryRestrictions"));

    const recipeCardContainer = document.getElementById('recipe-card-container');

    const page = searchQuery;
    router.addPage(page, function () {
        hideCategoryCards();
        showRecipeCards();
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

    // If it is empty, alert the user it is empty
    if (!searchQuery) {
        alert("Please input a search or click a filter below");
        return;
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
            hideHome();
            hideRecipeCards();
            showRecipePage();
            document.querySelector("recipe-page").data = recipeData[i];
            checkBookMark(recipeData[i]);

        });

        recipeCardContainer.appendChild(element);
        bindRecipeCard(element, id);
    }
}

function bindRecipeCard(recipeCard, pageName) {
    recipeCard.addEventListener('click', e => {
        if (e.path[0].nodeName == "A") return;
        router.navigate(pageName, false);
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
        const page = categories[randNums[i]];

        router.addPage(page, function () {
            hideCategoryCards();
            showRecipeCards();
            hideRecipePage();
            const search = document.getElementById("search");
            search.style.visibility = "visible";

        });

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
    });
}

//function to search when a category card is clicked
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

//function to go to cookbook page when cookbook is clicked
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

//function to go to settings page when settings is clicked
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

//function to go to home page when home is clicked
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


window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;
