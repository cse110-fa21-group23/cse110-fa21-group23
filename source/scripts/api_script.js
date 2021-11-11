//How to use:
//After DATA is initialized automatically:
//inside init() function, under "await fetchRecipes();":
//call getRecipeCardInfo() to get recipe id,diets,image and title of all fetched recipes

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
    console.log(getRecipeCardInfo()); //returns all ids
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
 * Extract needed info of all recipes fetched as an array 
 * @returns {{diets1,id1,image1,title1},{diets2,id2,image2,title2},...}
 */
function getRecipeCardInfo() {
    const answer = {};
    for (let i = 0; i < DATA[0]['results'].length; i++) {
        const result = {};
        result['id'] = DATA[0]['results'][i]['id'];
        result['title'] = DATA[0]['results'][i]['title'];
        result['image'] = DATA[0]['results'][i]['image'];
        result['diets'] = DATA[0]['results'][i]['diets'];
        answer[i] = result;
    }
    return answer;
}


