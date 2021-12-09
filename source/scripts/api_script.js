import SPOONACULAR_API_KEY from "./apikey.js";

/**
 * How to use:
    After DATA is initialized automatically:
    inside init() function, under "await fetchRecipes();":
    call getRecipeCardInfo() to get recipe id,diets,image and title of all fetched recipes

    NOTE 1:I store fetched data in DATA. To access DATA, access inside init() function or there will be nothing.
    NOTE 2:DATA[0]['results'][0] returns first recipe; DATA[0]['results'][1] returns second one; aka DATA[0]['results'] = recipeData in lab 6
    NOTE 3:main link https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 */

//Set API_URL
const MAIN_API_URL = "https://api.spoonacular.com/recipes";
const API_KEY = SPOONACULAR_API_KEY;


/**
 * Fetch the recipes for the search page
 *
 * @param {String} queries string that contains all query parameters for API call
 * @param {Function} callbackFn assigns the value from the fetch to the global variable
 * @return {Promise} a Promise for whether or not a recipe has been loaded successfully
 */
async function fetchRecipes(queries, callbackFn) {
    const complexSearch = "/complexSearch";
    const count = "&addRecipeInformation=true&number=30";
    const addIngredients = "&fillIngredients=true&instructionsRequired=true";
    const url = `${MAIN_API_URL}${complexSearch}?${queries}${API_KEY}${addIngredients}${count}`;
    console.log(url);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                const recipes = getRecipeCardInfo(data.results);
                callbackFn(data.results);
                resolve(true);
            })
            .catch(err => {
                console.log("Error loading the recipe");
                reject(err);
            });
    });
}

//HELPER FUNCTIONS
/**
 * Extract needed info of all recipes fetched as an array
 *
 * @param {Array} data an array of data for a recipe card
 * @return {Array} an array of extracted data for a recipe card
 */
 function getRecipeCardInfo(data) {
    const recipes = [];
    for (let i = 0; i < data.length; i++) {
        const result = {};
        result["id"] = data[i]["id"];
        result["title"] = data[i]["title"];
        result["image"] = data[i]["image"];
        result["diets"] = data[i]["diets"];
        recipes[i] = result;
    }
    return recipes;
  }

export { fetchRecipes };


