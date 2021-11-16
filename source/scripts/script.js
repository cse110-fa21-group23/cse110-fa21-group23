import { Router } from './Router.js';
const router = new Router(function() {
    showHome();
});
const API_KEY = '43d05cc71ec2491aa7e76580fce53779';
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
    bindPopstate();
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

// main.js

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

        const page = recipeData[i]["title"];

        router.addPage(page, function() {
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
      if (e.path[0].nodeName == 'A') return;
      router.navigate(pageName);
    });
}

function bindPopstate() {
    window.addEventListener("popstate", (event) =>{
      if (event.state != null)
        router.navigate(event.state, true);
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
