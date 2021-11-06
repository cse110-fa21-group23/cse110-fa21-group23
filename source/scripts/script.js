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
    
    getrecipes("chicken");
    // Add the first three recipe cards to the page
    // createRecipeCards();
    // // Make the "Show more" button functional
    // bindShowMore();
}

function getsource(id) {
    $.ajax({url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=4aeba8c5a7a8438990fc4902505558f8", success:function(res) {
        document.getElementById("sourceLink").innerHTML=res.sourceUrl;
        document.getElementById("sourceLink").href=res.sourceUrl;
     }})
}

// document.getElementById("search-button").addEventListener("onclick", getrecipes);
function getrecipes(q) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=4aeba8c5a7a8438990fc4902505558f8&number=1&query=" + q, success: function(res) {
            document.getElementById("recipe-cards").innerHTML="<h1>" + res.results[0].title + "</h1><br><img src=" + res.baseUri+res.results[0].image +"/>"
        }
    })
}




function createRecipeCards() {
    let recipeCard1 = document.createElement("recipe-card");
    recipeCard1.data = recipeData["recipe"+1];
    
    document.getElementById("recipe-cards").appendChild(recipeCard1);
} 