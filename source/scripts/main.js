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
    let testCookbook = {a:1 , b:2, c:2, e:4};
    localStorage.setItem("cookbooks", JSON.stringify(testCookbook));
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

// sets up the list of cookbooks and displays them under cookbooks-list
// Could do this every time you want to show the cookbooks or you could do this at start up and add functions 
// to modify it dynamically
function initializeCookbook() {
    document.querySelector('#add-empty-cookbook').onclick = function() {newCookbookMenu()};
    let cookbooksList = document.querySelector("#cookbooks-list");
    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    for (const name in cookbooks) {
        // Bookmark is the book mark icon object
        let bookMark = document.createElement("img");
        bookMark.classList.add("bookMark");
        bookMark.id = 'bookMark:' + name;
        cookbooksList.appendChild(bookMark);
        console.log(document.getElementById('bookMark:' + name  ));
        if (cookbooks[name].length != 0) {
            bookMark.src = "./img/icons/bookmark-filled.svg";
        } else {
            bookMark.src = "./img/icons/bookmark-empty.svg";
        }
        // Probably make the button remove lists when clicked
        // This is to tell which kind of bookmarks to use, currently always choses empty
        let listLink = document.createElement('p');
        listLink.classList.add('list_name');
        listLink.id = 'listLink:' + name;
        listLink.innerText = name;
        cookbooksList.appendChild(listLink);
        bookMark.onclick = function() {confirmRemoveList(name)};
        listLink.onclick = function() {showThisList(name)};
    }
}


// Updates the cookbook display section to display the inputted cookbook and clears the previous cookbook shown
function showThisList(cookbook) {
    hideCookbooksDisplay();
    showListDisplay();
    document.getElementById('list-name-header').innerText = cookbook;
    const recipeCards = document.getElementById('cookbook-contents');
    // clear previous recipe cards
    let childrenToRemove = recipeCards.getElementsByClassName('recipe-card');
    for (let i = 0; i < childrenToRemove.length; i++) {
        recipeCards.remove(childrenToRemove[i]);
    }
    const cookbookContents = JSON.parse(localStorage.getItem(cookbook));
    if (cookbookContents != null) {
        for (let i = 0; i < cookbookContents.length; i++) {
            let jsonData;
            // not sure if fetch is done properly here
            fetch(`${urlByID.slice(0, IDLocation) + cookbookContents[i] + urlByID.slice(IDLocation)}`).then(res => res.json()).then(data => {
                console.log(data);
                jsonData = data.results;
                console.log(recipeData);        
                resolve(true);
            }).catch((err) => {
                console.log(err);
                reject(false);
            })
            // Probably need to put the recipe cards in some kind of div/section/ect. to allow sharing and removing and call confirmRemoveList(cookbook) when done
            let recipeCard = document.createElement("recipe-card");
            recipeCard.data = jsonData;
            document.querySelector("recipe-page").data = recipeData;
            recipeCards.appendChild(recipeCard);
            bindRecipeCard(recipeCard);
        }
    } else {
        document.getElementById("empty-list").className = "shown";
    }
}

function confirmRemoveList(name) {
    console.log("crL" + name);
    document.getElementById('yes-no-prompt-text').innerText = 'Are you sure you want to delete the cookbook ' + name + '?';
    document.getElementById('prompt-yes').onclick = function() {removeCookbook(name)};
    let prompt = document.getElementById('prompt-box-yes-no');
    prompt.style.visibility = 'visible';
}

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

// addsCookbook with optional recipe to add to that cookbook
function addCookbook(cookbookName, recipe) {
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