// Import API from file
import { fetchRecipes } from "./api_script.js";
import { Router } from "./Router.js";

const API_KEY = '8aaa6b0816db4a99b92e7852d125a9aa';
// API_KEY3 (Nhi): c8f83bb3a9af4355b12de10250b24c88
// API_KEY2 (Nhi): fafd5e810c304ed3b4f9984672cb21ee
// API_KEY1: 4d936c811cda46879d4749def6bb36a1
const urlByID= `https://api.spoonacular.com/recipes//information?apiKey=${API_KEY}`;
const IDLocation = 36; // where to insert the ID
// API_KEY0: 43d05cc71ec2491aa7e76580fce53779
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&fillIngredients=true&addRecipeInformation=true&instructionsRequired=true`;
const recipes = [];
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

async function init() {
    showHome();
    createCategoryCards();
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

    bindPopstate();
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
    if (getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions.length !== 0) {
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

// main.js

function createRecipeCards() {
    const recipeCardContainer = document.getElementById('recipe-card-container');
    for (let i = 0; i < recipeData.length; i++) {
        const element = document.createElement('recipe-card');
        element.data = recipeData[i];
        document.querySelector("recipe-page").data = recipeData[i];

        const page = recipeData[i]["title"];

        router.addPage(page, function () {
            hideHome();
            hideRecipeCards();
            showRecipePage();
            document.querySelector("recipe-page").data = recipeData[i];
            checkBookMark(recipeData[i]);
        });

        recipeCardContainer.appendChild(element);
        bindRecipeCard(element, page);
    }
}

function bindRecipeCard(recipeCard, pageName) {
    recipeCard.addEventListener('click', e => {
        if (e.path[0].nodeName == "A") return;
        router.navigate(pageName);
    });
}

function bindPopstate() {
    window.addEventListener("popstate", (event) => {
        if (event.state != null)
            {router.navigate(event.state, true);}
        else
            router.navigate("home", true);
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
    if (getDietaryRestrictions.length !== 0) {
        queryStrDiet = `&diet=${getDietaryRestrictions}`;
    }

    // check for user intolerances
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    let queryStrIntolerances = "";
    if (getIntolerancesRestrictions.length !== 0) {
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

// loads stored values from memory to initialize lists
// listsOfCookbooks will be an array
// there will be an array for each cookbook accessible by that cookbook's name
/*function initializeLists() {
    var listOfCookbooks = JSON.parse(localStorage.getItem("listsOfCookbooks"));
    for (let i = 0; i < listOfCookbooks.length; i++) {
        let currentCookbook = JSON.parse(localStorage.getItem(listOfCookbooks[i]));
        lists[listOfCookbooks[i]] = [];
        for (let j = 0; currentCookbook.length; j++) {
            list[listOfCookbooks[i]].push(currentCookbook[j]);
        }
    }
}*/

// sets up the list of cookbooks and displays them under cookbooks-list
// Could do this every time you want to show the cookbooks or you could do this at start up and add functions 
// to modify it dynamically
function initializeCookbook() {
    document.querySelector('#add-empty-cookbook').onclick = newCookbookMenu();
    let cookbooksList = document.querySelector("#cookbooks-list");
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    for (const name in cookbooks) {
        // Bookmark is the book mark icon object
        let bookMark = document.createElement("img");
        bookMark.classList.add("bookMark");
        bookMark.id = 'bookMark:' + name;
        bookMark.onclick = confirmRemoveList(name);
        // Probably make the button remove lists when clicked
        // This is to tell which kind of bookmarks to use, currently always choses empty
        if (cookbooks[name].length != 0) {
            bookMark.src = "./img/icons/bookmark-filled.svg";
        } else {
            bookMark.src = "./img/icons/bookmark-empty.svg";
        }
        cookbooksList.appendChild(bookMark);
        let listLink = document.createElement('p');
        listLink.classList.add('list_name');
        listLink.id = 'listLink:'+ name;
        listLink.innerText(name);
        listLink.onclick(showThisList(name));
        cookbooksList.appendChild(listLink);
    }
}


// Updates the cookbook display section to display the inputted cookbook and clears the previous cookbook shown
function showThisList(cookbook) {
    hideCookbookDisplay();
    showListContents();
    document.getElementById('list-name-header').innerText(cookbook);
    const recipeCards = document.getElementById('cookbook-contents');
    // clear previous recipe cards
    let childrenToRemove = recipeCards.getElementsByClassName('recipe-card');
    for (let i = 0; i < childrenToRemove.length; i++) {
        recipeCards.remove(childrenToRemove[i]);
    }
    const cookbookContents = JSON.parse(localStorage.getItem(cookbook));
    for (let i = 0; i < cookbookContents.length; i++) {
        let jsonData;
        // not sure if fetch is done properly here
        fetch(`${urlByID.slice(0, IDLocation) + cookbookContents[i] + urlByID.slice(IDLocation)}`).then(res => res.json()).then(data => {
            console.log(data);
            jsonData = data.results;
            console.log(recipeData);        
            resolve(true);
        }).catch((err) => {
            console.log(err);
            reject(false);
        })
        // Probably need to put the recipe cards in some kind of div/section/ect. to allow sharing and removing and call confirmRemoveList(cookbook) when done
        let recipeCard = document.createElement("recipe-card");
        recipeCard.data = jsonData;
        document.querySelector("recipe-page").data = recipeData;
        recipeCards.appendChild(recipeCard);
        bindRecipeCard(recipeCard);
    }
}

function confirmRemoveList(name) {
    document.getElementById('yes-no-prompt-text').innerText = 'Are you sure you want to delete the cookbook ' + name + '?';
    document.getElementById('prompt-yes').onclick = removeCookbook(name);
    let prompt = document.getElementById('prompt-box-yes-no');
    prompt.style.visibility = 'visible';
}

function removeCookbook(name) {
    document.getElementById('bookMark:' + name).remove();
    document.getElementById('listLink:' + name).remove();
    removeCookbook(name);
    localStorage.removeItem(name);
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    delete cookbooks[name];
    localStorage.setItem("listOfCookbooks", JSON.stringify(cookbooks));
}

function newCookbookMenu() {

}

function addToThisCookbook(cookbook, recipe) {
}

function removeFromThisCookbook(cookbook, recipe) {
}

// addsCookbook with optional recipe to add to that cookbook
function addCookbook(cookbookName, recipe) {
    if (localStorage.getItem("cookbooks") != null ) {
        let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
        if (recipe != undefined) {
            cookbooks[cookbookName] = [recipe];
        } else {
            cookbooks[cookbookName] = [];
        }
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
    } else {
        let cookbook = {};
        if (recipe != undefined) {
            cookbook[cookbookName] = recipe;
        }
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
    }
}

function hideListsDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "hidden";
}

function showListsDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "visible";
}

function hideCookbookDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "hidden";
}

function showCookbookDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "visible";
}

function hideYesNoPrompt() {
    const yesNoPrompt = document.getElementById('prompt-box-yes-no');
    yesNoPrompt.style.visibility = "hidden";
}

window.init = init;
window.toggleMenu = toggleMenu;
window.updateSettings = updateSettings;
window.showHome = showHome;
window.showCookbooks = showCookbooks;
window.showSettings = showSettings;
