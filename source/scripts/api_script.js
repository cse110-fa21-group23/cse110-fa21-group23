//How to use:
//After DATA is initialized automatically:
//inside init() function, under "await fetchRecipes();":
//call getId(DATA) to get recipe id
//call getTitle(DATA) to get recipe title
//call getImage(DATA) to get recipe image url
//call getTag(DATA[0]['results'][0]) to get first recipe's diets/tags

//NOTE 1:I store fetched data in DATA. To access DATA, access inside init() function or there will be nothing.
//NOTE 2:DATA[0]['results'][0] returns first recipe; DATA[0]['results'][1] returns second one; aka DATA[0]['results'] = recipeData in lab 6
//NOTE 3:main link https://spoonacular.com/food-api/docs#Search-Recipes-Complex

//--------------------------------------------------------------------------------

//Set API_URL
const MAIN_API_URL = "https://api.spoonacular.com/recipes";
//TODO:change CHANGE_SEARCH_WAY to set search way
const CHANGE_SEARCH_WAY = "complexSearch?cuisine=Mexican&addRecipeInformation=true"
//TODO:change FIND_BY number 
const FIND_BY = "/" + CHANGE_SEARCH_WAY + "&number=9";
const API_KEY = "&apiKey=dd38d96d1f5d410f9bf7bfcef6cede83&?";
const API_URL = MAIN_API_URL + FIND_BY + API_KEY;


console.log("search from " + API_URL);
const DATA = {};
init();
async function init() {
    await fetchRecipes();
    //TODO:You may call functions to get information needed
    //console.log(getId(DATA)); //returns all ids
    //console.log(getTitle(DATA)); //returns all titles
    //console.log(getImage(DATA)); //returns all images
    //console.log(getTag(DATA[0]['results'][0])); //returns diets of one recipe
}
async function fetchRecipes() {
    return new Promise((resolve, reject) => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                DATA[0] = data;
                if (Object.keys(DATA).length == 1) {
                    resolve();
                }
            })
            .catch(err => {
                console.log(`Error loading the recipe`);
                reject(err);
            });
    });
}

//HELPER FUNCTIONS
/**
 * Extract id array of all recipes fetched
 * For example, if fetch 9 recipes, and call getId(DATA), this will give array of length 9
 * @param {Object} data Raw recipe JSONs to find the id of
 * @returns {String} If found, returns id, otherwise null
 */
function getId(data) {
    const id = {};
    for (let i = 0; i < data[0]['results'].length; i++) {
        id[i] = data[0]['results'][i]['id'];
    }
    return id;
}


/**
 * Extract title array of all recipes fetched
 * For example, if fetch 9 recipes, and call getTitle(DATA), this will give array of length 9
 * @param {Object} data Raw recipe JSONs to find the title of
 * @returns {String} If found, returns Title, otherwise null
 */
function getTitle(data) {
    const Title = {};
    for (let i = 0; i < data[0]['results'].length; i++) {
        Title[i] = data[0]['results'][i]['title'];
    }
    return Title;
}


/**
 * Extract img array of all recipes fetched
 * For example, if fetch 9 recipes, and call getImage(DATA), this will give array of length 9
 * @param {Object} data Raw recipe JSONs to find the img of
 * @returns {String} If found, returns img, otherwise null
 */
function getImage(data) {
    const img = {};
    for (let i = 0; i < data[0]['results'].length; i++) {
        img[i] = data[0]['results'][i]['image'];
    }
    return img;
}


/**
 * Extract tag array of one recipe fetched
 * For example, if call getTag(DATA[0]['results'][0]), this will give diets of first recipe as an array. Further, getTag(DATA[0]['results'][1]) will give diets of second recipe as an array
 * @param {Object} data specific element from DATA
 * @returns {String} If found, returns diets, otherwise null
 */
function getTag(data) {
    return data.diets;
}


