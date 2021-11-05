//on enter for search, call search function
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});


function search() {
    //TODO: remove this alert, implement real search
    let searchQuery = document.getElementById('searchQuery').value;
    alert(searchQuery);

}

window.addEventListener('DOMContentLoaded', init);
const recipes = [];
const recipeData = {};

async function init() {
    // fetch the recipes and wait for them to load
    let fetchSuccessful = await fetchRecipes();
    // console.log(fetchSuccessful)
    // if they didn't successfully load, quit the function
    if (!fetchSuccessful) {
      console.log('Recipe fetch unsuccessful');
      return;
    };
    
    // Add the first three recipe cards to the page
    createRecipeCards();
    // // Make the "Show more" button functional
    // bindShowMore();
}
async function fetchRecipes() {
    return new Promise((resolve, reject) => {

      
    //   for (let i = 0; i < recipes.length; i++) {
        
    //     fetch(recipes[i])
    //     .then(response => response.json())
    //     .then(data => { recipeData["recipe" + i] = data; if (Object.keys(recipeData).length == recipes.length) {
    //       resolve(true); }  })
    //     .catch( error => reject(false));
    //   }
            
    });
}
function createRecipeCards() {
    let recipeCard1 = document.createElement("recipe-card");
    recipeCard1.data = recipeData["recipe"+1];
    
    document.getElementById("recipe-cards").appendChild(recipeCard1);
} 