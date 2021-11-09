//on enter for search, call search function
const API_KEY = '4d936c811cda46879d4749def6bb36a1';
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true`;
const recipes = [];
var recipeData = {};

window.addEventListener('DOMContentLoaded', init);


async function init() {
    document.addEventListener('keydown', async function (event) {
        if (event.key === 'Enter') {
            let searchSuccessful = await search();
            createRecipeCards();
        }
    });
   
    // // Make the "Show more" button functional
    // bindShowMore();
    
}


function search() {
    //TODO: remove this alert, implement real search
    return new Promise((resolve, reject) => {
        let searchQuery = document.getElementById('searchQuery').value;
        alert(searchQuery);

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
        }).catch((err) =>{ 
            console.log(err);
            reject(false);
        })
    });
}


function createRecipeCards() {
    let recipeCard1 = document.createElement("recipe-card");
    recipeCard1.data = recipeData[0];
    console.log(recipeData[0]);
    // console.log(recipeCard1.data["title"]);
    document.getElementById("recipe-cards").appendChild(recipeCard1);
}








