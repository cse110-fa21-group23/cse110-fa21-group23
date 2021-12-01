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
const API_KEY = "&apiKey=4d936c811cda46879d4749def6bb36a1&";
// API_KEY5: dd38d96d1f5d410f9bf7bfcef6cede83
// API_KEY4 (Nhi): 8aaa6b0816db4a99b92e7852d125a9aa
// API_KEY3 (Nhi): c8f83bb3a9af4355b12de10250b24c88
// API_KEY2 (Nhi): fafd5e810c304ed3b4f9984672cb21ee
// API_KEY1: 4d936c811cda46879d4749def6bb36a1
// API_KEY0: 43d05cc71ec2491aa7e76580fce53779

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
    const addIngridients = "&fillIngredients=true&instructionsRequired=true";
    const url = `${MAIN_API_URL}${complexSearch}?${queries}${API_KEY}${addIngridients}${count}`;
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


