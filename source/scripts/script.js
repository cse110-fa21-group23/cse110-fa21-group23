const API_KEY = '8aaa6b0816db4a99b92e7852d125a9aa';
// API_KEY4 (Nhi): 8aaa6b0816db4a99b92e7852d125a9aa
// API_KEY3 (Nhi): c8f83bb3a9af4355b12de10250b24c88
// API_KEY2 (Nhi): fafd5e810c304ed3b4f9984672cb21ee
// API_KEY1: 4d936c811cda46879d4749def6bb36a1
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true`;
const recipes = [];
let recipeData = {};

//arrays holding category names and images for category cards
const categories = ["Indian", "Vegan", "Mexican", "Gluten-Free", "Italian", "Japanese", "American", "Vegetarian", "Thai", "Chinese", "Korean",
    "Vietnamese", "African", "Middle Eastern"];
const images = ["./img/foodPics/indian.jpeg", "./img/foodPics/vegan.jpeg", "./img/foodPics/mexican.jpeg",
    "./img/foodPics/gluten-free.jpeg", "./img/foodPics/italian.jpeg", "./img/foodPics/japanese.jpeg", "./img/foodPics/american.jpeg", "./img/foodPics/vegetarian.jpeg",
    "./img/foodPics/thai.jpeg", "./img/foodPics/chinese.jpeg", "./img/foodPics/korean.jpeg", "./img/foodPics/vietnamese.jpeg", "./img/foodPics/african.jpeg", "./img/foodPics/middleEastern.jpeg"];


//on enter for search, call search function
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});

window.addEventListener('DOMContentLoaded', init);

async function init() {
    showHome();
    createCategoryCards();
    showRecipePage();
    document.addEventListener('keydown', async function (event) {
        if (event.key === 'Enter') {
            let searchSuccessful = await search();
            if (searchSuccessful) {
                createRecipeCards();
            }
        }
    });

    // // Make the "Show more" button functional
    // bindShowMore();

}


function search() {
    // let searchQuery = document.getElementById('search-query').value;
    // console.log(searchQuery);
    // console.log(localStorage.getItem("dietaryRestrictions"));
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();
    return new Promise((resolve, reject) => {
        let searchQuery = document.getElementById('search-query').value;
        recipeData = {};
        //alert(searchQuery);
        fetch(`${url}&query=${searchQuery}`).then(res => res.json()).then(data => {
            console.log(data);
            recipeData = data.results;
            console.log(recipeData);
            // let id = data.results[0].id;

            // convert data into simplified object containing the following keys: title, diets, and image
            // add the simplified object to recipe-card-results

            // fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`).then(res => res.json())
            // .then(data => {
            //     console.log(data);
            // })
            resolve(true);
        }).catch((err) => {
            console.log(err);
            reject(false);
        })
    });
}

var $SOMenuVisibility = "hidden";
function toggleMenu() {
    var menuIcon = document.getElementById("menu-icon");
    menuIcon.classList.toggle("change");

    var slideOverMenu = document.getElementById("slide-over-menu");

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
    const dietaryContainerElements = document.getElementById('dietary-container').elements;

    for (let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getDietaryRestrictions.includes(dietaryRestriction.value)) {
            dietaryRestriction.checked = true;
        }
    }
}

function clearCheckBoxes() {
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    console.log(checkboxes);
    checkboxes.forEach(e => e.checked = false);
}

function hideRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.classList.add("hidden");
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

    // Add list to local storage
    localStorage.setItem("dietaryRestrictions", JSON.stringify(dietaryRestrictionList));

    // TODO: add confirmation message in HTML (alert is temporary)
    alert("your preferences have been updated");
}


function createRecipeCards() {
    // let recipeCard = document.createElement("recipe-card");
    // recipeCard.data = recipeData[0];
    // // console.log(recipeCard1.data["title"]);
    // document.getElementById("recipe-card-container").appendChild(recipeCard);
    // document.querySelector("recipe-page").data = recipeData[0];
    // bindRecipeCard(recipeCard);

    const recipeCardContainer = document.getElementById('recipe-card-container');
    for (let i = 0; i < recipeData.length; i++) {
        console.log(recipeData[i]);
        var element = document.createElement('recipe-card');
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
    categoryCard.addEventListener("click", (e) => {
        let searchQuery = categoryName;
        document.getElementById("search-query").value = searchQuery;
        searchByCategory();
    })
}

//function to search when a category card is clicked
function searchByCategory() {
    hideCategoryCards();
    const recipeCardContainer = document.getElementById('recipe-card-container');
    recipeCardContainer.innerHTML = '';
    showRecipeCards();
    return new Promise((resolve, reject) => {
        let searchQuery = document.getElementById('search-query').value;
        recipeData = {};

        //if user clicked a diet category, sends search query to diet endpoint
        if (searchQuery == "Vegetarian" || searchQuery == "Vegan" || searchQuery == "Gluten-Free") {
            fetch(`${url}&diet=${searchQuery}`).then(res => res.json()).then(data => {
                console.log(data);
                recipeData = data.results;
                console.log(recipeData);
                createRecipeCards();
                resolve(true);
            }).catch((err) => {
                console.log(err);
                reject(false);
            })
        }
        //if user clicked a cuisine category, sends search query to cuisine endpoint
        else {
            fetch(`${url}&cuisine=${searchQuery}`).then(res => res.json()).then(data => {
                console.log(data);
                recipeData = data.results;
                console.log(recipeData);
                createRecipeCards();
                resolve(true);
            }).catch((err) => {
                console.log(err);
                reject(false);
            })
        }
    });
}
