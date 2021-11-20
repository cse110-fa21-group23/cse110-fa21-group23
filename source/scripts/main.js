var $SOMenuVisibility = "hidden";
var $tapModeVisibility = "hidden";

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




// this function is being called from an onClick event in index.html
function toggleTapMode() {
    const tapModeButton = document.getElementById("tap-mode-button");

    if (tapModeButton.innerHTML == "Tap Mode On") {
        tapModeButton.innerHTML = "Tap Mode Off";
        $tapModeVisibility = "hidden";
    }
    else {
        tapModeButton.innerHTML = "Tap Mode On";
        $tapModeVisibility = "visible";
    }

}

function showSettings() {
    hideHome();
    hideCookbooks();
    hideRecipeCards();
    // hideRecipePage();
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "visible";
    //settings.style.transform = "translate(100%)";

    // Get the list of restrictions from local storage
    const getDietaryRestrictions = JSON.parse(localStorage.getItem("dietaryRestrictions"));
    const getIntolerancesRestrictions = JSON.parse(localStorage.getItem("intolerancesRestrictions"));
    const dietaryContainerElements = document.getElementById("dietary-container").elements;
    const intolerancesContainerElements = document.getElementById("intolerances-container").elements;

    for (let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getDietaryRestrictions && getDietaryRestrictions.includes(dietaryRestriction.value)) {
            dietaryRestriction.checked = true;
        }
    }

    for (let i = 0; i < intolerancesContainerElements.length; i++) {
        const intoleranceRestriction = intolerancesContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if (getIntolerancesRestrictions && getIntolerancesRestrictions.includes(intoleranceRestriction.value)) {
            intoleranceRestriction.checked = true;
        }
    }
}

function clearCheckBoxes() {
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page")
        .shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    checkboxes.forEach((e) => e.checked = false);
}

function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "hidden";
    // settings.style.transform = "translate(-100%)";
}

function showHome() {
    hideSettings();
    hideCookbooks();
    hideRecipeCards();
    showCategoryCards();
    hideRecipePage();
    document.getElementById('search-query').value = ''; //clears search result
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}

function hideHome() {
    hideCategoryCards();
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
}

function showCookbooks() {
    hideSettings();
    hideHome();
    hideRecipeCards();
    hideRecipePage();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
}

function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
}

function showRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "visible";
}

function hideRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "hidden";
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
    categoryCards.style.visibility = "hidden";
}

function updateSettings() {
    const dietaryRestrictionList = [];
    // Get all the inputs under the div
    const dietaryContainerElements = document.getElementById("dietary-container").elements;
    for (let i = 0; i < dietaryContainerElements.length; i++) {
        // If a checkbox is checked, then add it to our list
        const inputElement = dietaryContainerElements[i];
        if (inputElement.checked) {
            dietaryRestrictionList.push(inputElement.value);
        }
    }

    const intolerancesRestrictionsList = [];
    const intolerancesContainerElements = document.getElementById("intolerances-container");
    for (let i = 0; i < intolerancesContainerElements.length; i++) {
        // If a checkbox is checked, then add it to our list
        const inputElement = intolerancesContainerElements[i];
        if (inputElement.checked) {
            intolerancesRestrictionsList.push(inputElement.value);
        }
    }

    // Add lists to local storage
    localStorage.setItem("dietaryRestrictions", JSON.stringify(dietaryRestrictionList));
    localStorage.setItem("intolerancesRestrictions", JSON.stringify(intolerancesRestrictionsList));

    // TODO: add confirmation message in HTML (alert is temporary)
    alert("your preferences have been updated");
}

/**
 * This function checks localStorage for saved recipes, and then display bookmark-filled for the ones that already saved
 * @param {Object} data 
 * @returns None
 */
function checkBookMark(data) {
    let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    const title = data["title"];
    if (bookmarkList == null)
        return;
    if (bookmarkList[title] != null) {
        let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
        bookMark.src = "./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
}

/**
 * When user clicks on bookMark icon, it saves recipe's title and ID to localStorage
 * If the recipe already saved, clicking it again will remove it from localStorage.
 * The data being stored in 'bookmark'
 */
function setBookMark() {
    // check local storage for bookmark
    let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    if (bookmarkList == null) { bookmarkList = {}; }

    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    const name = bookMark.getAttribute("name");
    const ID = document.querySelector("recipe-page").data["id"];
    const title = document.querySelector("recipe-page").data["title"];
    if (name == "bookmark-empty") {
        bookmarkList[title] = ID;
        bookMark.src = "./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
    else {
        delete bookmarkList[title];
        bookMark.src = "./img/icons/bookmark-empty.svg";
        bookMark.setAttribute("name", "bookmark-empty");
    }
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
}