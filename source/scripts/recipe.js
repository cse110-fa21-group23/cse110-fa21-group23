const API_KEY = '43d05cc71ec2491aa7e76580fce53779';
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


function clearCheckBoxes(){
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    console.log(checkboxes);
    checkboxes.forEach(e => e.checked = false);
}

function checkBookMark(){
    let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    const title = document.querySelector("recipe-page").data["title"];
    if (bookmarkList == null)
        return;
    if (bookmarkList[title] != null)
    {
        let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
        bookMark.src = "./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
}

function setBookMark(){
    // check local storage for bookmark
    let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    if (bookmarkList == null)
        bookmarkList = {};

    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    const name = bookMark.getAttribute("name");
    const ID = document.querySelector("recipe-page").data["id"];
    const title = document.querySelector("recipe-page").data["title"];
    if (name == "bookmark-empty")
    {
        bookmarkList[title] = ID;
        bookMark.src = "./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
    else
    {
        delete bookmarkList[title];
        bookMark.src = "./img/icons/bookmark-empty.svg";
        bookMark.setAttribute("name", "bookmark-empty");
    }
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
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
    hideCookbooks();
    hideRecipePage();
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "visible";
    settings.classList.remove("hidden");
    //settings.style.transform = "translate(100%)";
    // Get the list of restrictions from local storage
    const getDietaryRestrictions = JSON.parse(localStorage.getItem("dietaryRestrictions"));
    const dietaryContainerElements = document.getElementById('dietary-container').elements;
    if (getDietaryRestrictions == null)
        return;
    for (let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getDietaryRestrictions.includes(dietaryRestriction.value)) {
            dietaryRestriction.checked = true;
        }
    }
}

function hideRecipePage(){
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.classList.add("hidden");
}

function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "hidden";
    settings.classList.add("hidden");
    // settings.style.transform = "translate(-100%)";
}

function showHome() {
    // hideSettings();
    // hideSettings();
    // hideRecipeCards();
    // showCategoryCards();
    window.location.href="./index.html";
    document.getElementById('search-query').value = ''; //clears search result
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}



function showCookbooks() {
    hideSettings();
    hideRecipePage();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
    cookbook.classList.remove("hidden");
    
    let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    if (bookmarkList == null ) // fix this
    {
        let empty = document.createElement("p").innerText = "EMPTY";
        cookbook.appendChild(empty);
    }
    else
    {
        for (const el in bookmarkList) {
            let link = document.createElement("a");
            link.href=`./recipe-template.html?&id=${bookmarkList[el]}`;
            link.innerHTML = el;
            link.style="style='display: block; margin-left: auto; margin-right: auto; width: 50%;'";
            cookbook.appendChild(link);
            let br = document.createElement("br");
            cookbook.appendChild(br);
        }
    }
    
}

function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.classList.add("hidden");
    //cookbook.style.visibility = "hidden";
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
    //categoryCards.style.visibility = "hidden";
    categoryCards.classList.add("hidden");
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