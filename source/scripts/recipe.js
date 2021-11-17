const API_KEY = '4d936c811cda46879d4749def6bb36a1';
// API_KEY3 (Nhi): c8f83bb3a9af4355b12de10250b24c88
// API_KEY2 (Nhi): fafd5e810c304ed3b4f9984672cb21ee
// API_KEY1: 4d936c811cda46879d4749def6bb36a1
// API_KEY: 94de49097b8a4673b563741f9515a04c
// API_KEY: 43d05cc71ec2491aa7e76580fce53779

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true`;
var DATA = {};

window.addEventListener('DOMContentLoaded', init);

async function init() {
    hideCookbooks();
    hideSettings();
    let searchParams = new URLSearchParams(window.location.href);
    const id = searchParams.get('id');
    let sucessful = await getDataFromID(id);
    if (sucessful && id != null)
    {
        document.querySelector("recipe-page").data = DATA;
        document.getElementById("recipe-page-container").classList.remove("hidden");
    }
    checkBookMark();
}

async function getDataFromID(id)
{
    return new Promise((resolve, reject) => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                DATA = data;
                resolve(true);
        }).catch((err) => {
            console.log(err);
            reject(false);
        })
    });
}

function showHome() {
    window.location.href="./index.html";
    document.getElementById('search-query').value = ''; //clears search result
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}



