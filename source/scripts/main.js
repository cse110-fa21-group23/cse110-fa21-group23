var $SOMenuVisibility = "hidden";
var defaultName = "favorite";

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
    let testCookbook = {a:"" , b:"", c:"", e:""};
    localStorage.setItem("cookbooks", JSON.stringify(testCookbook));
    localStorage.setItem("a", JSON.stringify("aaaa"));
    localStorage.setItem("b", JSON.stringify(""));
    localStorage.setItem("c", JSON.stringify(""));
    localStorage.setItem("d", JSON.stringify(""));
    initializeCookbook();
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
    if (bookmarkList == null)
        {bookmarkList = {};}

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

/*
NOTE: Should probably create a add to the cookbook display function instead of just copy and pasting code
Also I've done pretty much no CSS and haven't really tested the actual list displays
*/

// sets up the list of cookbooks and displays them under cookbooks-list
// When we want to add or remove to it will simply do so dynamically in other functions
function initializeCookbook() {
    document.querySelector('#add-empty-cookbook').onclick = function() {newCookbookPrompt()};
    let cookbooksList = document.querySelector("#cookbooks-list");
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    // First set up favorite/default
    // The bookMark is the part where when clicked prompts you to confirm removing that cookbook
    let bookMark = document.createElement("img");
    bookMark.classList.add("bookMark");
    // Adding bookMark: so as to not have any ID conflicts
    bookMark.id = 'bookMark:' + defaultName;
    cookbooksList.appendChild(bookMark);
    console.log(document.getElementById('bookMark:' + defaultName));
    const cookbookContents = JSON.parse(localStorage.getItem(defaultName));
    // Not what to do here, for now it selects a filled vs unfilled book mark based off of if there's anything in the cookbook
    if (cookbookContents != null && cookbookContents != "") {
        bookMark.src = "./img/icons/bookmark-filled.svg";
    } else {
        bookMark.src = "./img/icons/bookmark-empty.svg";
    }
    // The listLink is the part with the actual cookbook name that when clicked leads you to that cookbook's recipes
    let listLink = document.createElement('p');
    listLink.classList.add('list_name');
    // Adding listLink: so as to not have any ID conflicts
    listLink.id = 'listLink:' + defaultName;
    listLink.innerText = defaultName;
    cookbooksList.appendChild(listLink);
    // Don't allow the removal of default/favorite
    //bookMark.onclick = function() {confirmRemoveList(defaultName)};
    listLink.onclick = function() {showThisList(defaultName)};
    // Then do the rest, the code is pretty much the same so all the comments are above
    for (const name in cookbooks) {
        bookMark = document.createElement("img");
        bookMark.classList.add("bookMark");
        bookMark.id = 'bookMark:' + name;
        cookbooksList.appendChild(bookMark);
        console.log(document.getElementById('bookMark:' + name));
        const cookbookContents = JSON.parse(localStorage.getItem(name));
        if (cookbookContents != null && cookbookContents != "") {
            bookMark.src = "./img/icons/bookmark-filled.svg";
        } else {
            bookMark.src = "./img/icons/bookmark-empty.svg";
        }
        listLink = document.createElement('p');
        listLink.classList.add('list_name');
        listLink.id = 'listLink:' + name;
        listLink.innerText = name;
        cookbooksList.appendChild(listLink);
        bookMark.onclick = function() {confirmRemoveList(name)};
        listLink.onclick = function() {showThisList(name)};
    }
}


// Updates the cookbook display section to display the inputted cookbook's recipes as recipe cards
// and clears recipe cards
function showThisList(cookbook) {
    document.getElementById('list-name-header').innerText = cookbook;
    const recipeCards = document.getElementById('cookbook-contents');
    // clear previous recipe cards
    let childrenToRemove = recipeCards.getElementsByClassName('recipe-card');
    for (let i = 0; i < childrenToRemove.length; i++) {
        recipeCards.remove(childrenToRemove[i]);
    }
    const cookbookContents = JSON.parse(localStorage.getItem(cookbook));
    // Checks to see if the cookbook is empty, if so it shows the cookbook empty message "empty-list" which
    // can be found on index.html
    if (cookbookContents != null && cookbookContents != "") {
        for (let i = 0; i < cookbookContents.length; i++) {
            let jsonData = cookbookContents[i];
            // Probably need to put the recipe cards in some kind of div/section/ect. to allow sharing and removing and call confirmRemoveList(cookbook) when done
            let recipeCard = document.createElement("recipe-card");
            recipeCard.data = jsonData;
            document.querySelector("recipe-page").data = jsonData;
            recipeCards.appendChild(recipeCard);
            bindRecipeCard(recipeCard, cookbookContents[i]["title"]);
        }
    } else {
        document.getElementById("empty-list").className = "shown";
    }
    hideCookbooksDisplay();
    showListDisplay();
}

function confirmRemoveList(name) {
    console.log("crL" + name);
    document.getElementById('yes-no-prompt-text').innerText = 'Are you sure you want to delete the cookbook ' + name + '?';
    document.getElementById('prompt-yes').onclick = function() {removeCookbook(name); hideYesNoPrompt();};
    document.getElementById('prompt-box-yes-no').className = "shown";
    // Not sure if the line above works below is a backup of sorts
    //let prompt = document.getElementById('prompt-box-yes-no');
    //prompt.style.visibility = 'visible';
}

function addNewCookbookPrompt() {
    document.getElementById('text-prompt-text').innerText = 'What do you want to call your new cookbook?';
    document.getElementById('prompt-submit').onclick = function() {processTextSubmitCookbook();};
}

function processTextSubmitCookbook() {
    let userInput = document.getElementById("input-prompt-text").value;
    // Checks if the input is empty, if so it changes the request text and exits the function
    if (userInput == "") {
        document.getElementById('text-prompt-text').innerText = 'Error: no input detected, please choose a name for your cookbook.';
        return;
    }
    // Checks if the input is the same as another cookbook, if so it changes the request text and exits the function
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    for (const name in cookbooks) {
        if (name == userInput) {
            document.getElementById('text-prompt-text').innerText = 'Error: name already in use, please choose a new name for your cookbook.';
            return;
        }
    }
    addCookbook(userInput);
    hideTextPrompt();
}

// removes a cookbook both form the display and from local storage
function removeCookbook(name) {
    let k = document.getElementById('bookMark:' + name);
    console.log("rC" + k);
    k.remove();
    let a = document.getElementById('listLink:' + name);
    a.remove();
    localStorage.removeItem(name);
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    delete cookbooks[name];
    localStorage.setItem("listOfCookbooks", JSON.stringify(cookbooks));
}

function newCookbookMenu() {

}

function addToThisCookbook(cookbook, recipe) {
}

function removeFromThisCookbook(cookbook, recipe) {
}

// adds a cookbook with an optional recipe parameter to both the cookbook display and local storage
// NOTE: recipe parameter might be useless and should maybe be eliminated
function addCookbook(cookbookName, recipe) {
    // First checks to see if cookbooks is empty then if their is a recipe to add
    if (localStorage.getItem("cookbooks") != null ) {
        let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
        if (recipe != undefined) {
            cookbooks[cookbookName] = [recipe];
        } else {
            cookbooks[cookbookName] = [];
        }
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
    } else {
        let cookbook = {};
        if (recipe != undefined) {
            cookbook[cookbookName] = recipe;
        }
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
    }

    // Here we add the display elements, pretty much the same as what you see in initializeCookbook() 
    let cookbooksList = document.querySelector("#cookbooks-list");
    let bookMark = document.createElement("img");
    bookMark.classList.add("bookMark");
    bookMark.id = 'bookMark:' + cookbookName;
    cookbooksList.appendChild(bookMark);
    console.log(document.getElementById('bookMark:' + cookbookName));
    const cookbookContents = JSON.parse(localStorage.getItem(cookbookName));
    if (cookbookContents != null && cookbookContents != "") {
        bookMark.src = "./img/icons/bookmark-filled.svg";
    } else {
        bookMark.src = "./img/icons/bookmark-empty.svg";
    }

    let listLink = document.createElement('p');
    listLink.classList.add('list_name');
    listLink.id = 'listLink:' + cookbookName;
    listLink.innerText = cookbookName;
    cookbooksList.appendChild(listLink);
    bookMark.onclick = function() {confirmRemoveList(cookbookName)};
    listLink.onclick = function() {showThisList(cookbookName)};
}

function hideListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "hidden";
}

function showListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "visible";
}

function hideCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "hidden";
}

function showCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "visible";
}

function hideYesNoPrompt() {
    const yesNoPrompt = document.getElementById('prompt-box-yes-no');
    yesNoPrompt.style.visibility = "hidden";
}

// Hides the text prompt obviously, but also resets the value of the input to an empty string
function hideTextPrompt() {
    const textPrompt = document.getElementById('prompt-box-text');
    textPrompt.style.visibility = "hidden";
    document.getElementById("input-prompt-text").value = "";
}