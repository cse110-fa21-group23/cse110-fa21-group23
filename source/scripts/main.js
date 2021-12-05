var $SOMenuVisibility = "hidden";
const defaultCookbook = "Favorites";
var $tapModeVisibility = "hidden";

/**
 * Toggles the Menu list
 *
 */
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

// this function is being called from scripts.js, ignore the Codacy error :D
/**
 * Toggles Tap Mode
 *
 */
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

/**
 * Shows the Settings page
 *
 */
function showSettings() {
    hideHome();
    hideCookbooks();
    hideRecipeCards();
    hideRecipePage();
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "visible";
    settings.style.display = null;
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

/**
 * Clears check boxes on a recipe page and list
 *
 */
function clearCheckBoxes() {
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page")
        .shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    checkboxes.forEach((e) => e.checked = false);
}

/**
 * Hide the settings
 *
 */
function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "hidden";
    settings.style.display = "none";
    // settings.style.transform = "translate(-100%)";
}

/**
 * Show home page
 *
 */
function showHome() {
    hideSettings();
    hideCookbooks();
    hideRecipeCards();
    showCategoryCards();
    hideRecipePage();
    showSearchBar();
    document.getElementById('search-query').value = ''; //clears search result
}

/**
 * Hide the home page
 *
 */
function hideHome() {
    hideCategoryCards();
    hideSearchBar();
}

/**
 * Show the search bar
 *
 */
function showSearchBar() {
    const search = document.getElementById("search");
    search.style.visibility = "visible";
    search.style.display = null;
}

/**
 * Hide search bar
 *
 */
function hideSearchBar() {
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
    search.style.display = "none";
}

/**
 * Show cookbooks page
 *
 */
function showCookbooks() {
    hideSettings();
    hideHome();
    hideRecipeCards();
    hideRecipePage();
    showCookbooksDisplay();
    hideListDisplay();
    initializeCookbook();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
    cookbook.style.display = null;
    document.querySelector("body > main > div.box").style.display = "none";
}

/**
 * Hide cookbooks page
 *
 */
function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
    cookbook.style.display = "none";
    document.querySelector("body > main > div.box").style.display = null;
}

/**
 * Shoe recipe page
 *
 */
function showRecipePage() {
    showTapMode();
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "visible";
    recipePage.style.display = null;
}

/**
 * Hide recipe page
 *
 */
function hideRecipePage() {
    hideTapMode();
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "hidden";
    recipePage.style.display = "none";
    const tapModeButton = document.getElementById("tap-mode-button");
    tapModeButton.innerHTML = "Tap Mode Off";
}

/**
 * Show the recipe cards
 *
 */
function showRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "visible";
    recipeCards.style.display = null;
}

/**
 * Hide recipe cards
 *
 */
function hideRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "hidden";
    recipeCards.style.display = "none";
}

/**
 * Show category cards
 *
 */
function showCategoryCards() {
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "visible";
    categoryCards.style.display = null;
}

/**
 * Hide category cards
 *
 */
function hideCategoryCards() {
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "hidden";
    categoryCards.style.display = "none";
}

/**
 * Show tap mode button
 *
 */
function showTapMode() {
    const tap = document.getElementById("tap-mode-button");
    tap.style.visibility = "visible";
}

/**
 * Hide tap mode button
 *
 */
function hideTapMode() {
    const tap = document.getElementById("tap-mode-button");
    tap.style.visibility = "hidden";
}

/**
 * Update global settings for user
 *
 */
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

// TODO: Add a warning before removing bookmark ("Are you sure to you want to remove this from your Cookbooks? All local edits to the recipe will be lost")
/**
 * This function check if the recurrent recipe has been whether saved or not.
 * If the data has been saved, display bookmark and edit recipe,
 * and load data from local storage.
 * 
 * @param {Object} data 
 */
function checkBookMark(data) {
    const Id = data["id"];
    const Data = JSON.parse(localStorage.getItem(`ID-${Id}`));
    if (Data != null) {
        document.querySelector("recipe-page").data = Data;
        showBookMarkEditRecipe();
    }
}


/* Save new cookbook ========================================================*/
const COOK_BOOKS = "cookbooks";
var $SOSaveCookBookMenuVisibility = "hidden";
/**
 * Displays saved-cookbook menu
 *
 */
function toggleSaveCookBook() {
    var menu = document.querySelector("#save-cookbook-menu");

    if ($SOSaveCookBookMenuVisibility == "hidden") {
        menu.style.transform = "translateY(0%)";
        $SOSaveCookBookMenuVisibility = "visible";
    }
    else {
        menu.style.transform = "translateY(100%)";
        $SOSaveCookBookMenuVisibility = "hidden";
    }

}

/**
 *  This functions displays all the cookbooks in local storage to the saved-cookbook menu
 * when users click on bookmark. There is one cookbook by default - defaultCookbook.
 *  If bookmark has been marked/filled. It removes the recipe from local Storage.
 * 
 */
function showCookBookMenu() {
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    console.log("CookBooks List: ", cookbooks);
    if (cookbooks == undefined || cookbooks == null) {
        cookbooks = [defaultCookbook];
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
    }

    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    if (bookMark.getAttribute("name") == "bookmark-empty") {
        let cookbooksList = document.querySelectorAll("#cookbook-lists > ol > li");
        if (cookbooksList.length == 0) {
            cookbooks.forEach((cookBook) => {
                appendNewCookBook(cookBook);
            });
        }
        toggleSaveCookBook();
        
    } else if (confirm("Are you sure to remove this recipe?")) {
        try {
            // remove recipe data from local storage and cook book
            const Data = document.querySelector("recipe-page").data;
            const RecipeInStorage = JSON.parse(localStorage.getItem(`ID-${Data["id"]}`));
            const CookBook = RecipeInStorage["cookbook"];
            let savedCookBook = JSON.parse(localStorage.getItem(CookBook));
            const index = savedCookBook.indexOf(Data["id"]);
            savedCookBook.splice(index, 1);
            localStorage.setItem(CookBook, JSON.stringify(savedCookBook));
            localStorage.removeItem(`ID-${Data["id"]}`);
            bookMark.setAttribute("name", "bookmark-empty");
            bookMark.src = "./img/icons/bookmark-empty.svg";
            hideEditRecipe();
        } catch (err) {
            alert("An error has occured: " + err);
        }
    }
}

/**
 * This functions bind a cookbook / add an event upon click, so that when users click on a cookbook, 
 * it saves the current recipe to the cookbook that user chose
 * 
 * @param {HTMLObjectElement} li the cookbook to save to
 */
function bindNewCookBook(li) {
    li.addEventListener("click", (event) => {
        try {
            // save recipe data to local storage and add it to the 
            const CookBookName = event.currentTarget.innerText; // cookbook that user chooses
            let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
            const Data = document.querySelector("recipe-page").data;
            const Id = Data["id"];

            // save recipe to cookbook and update local storage for the cookbook
            let cookbook = JSON.parse(localStorage.getItem(CookBookName));
            if (cookbook == null || cookbook == undefined) { cookbook = []; }
            cookbook.push(Id);
            localStorage.setItem(CookBookName, JSON.stringify(cookbook));

            // save data/recipe to localstorage
            Data["cookbook"] = CookBookName;
            localStorage.setItem(`ID-${Id}`, JSON.stringify(Data));

            // update bookMark icon
            bookMark.setAttribute("name", "bookmark-filled");
            bookMark.src = "./img/icons/bookmark-filled.svg";

            // alert user
            alert("Added to " + CookBookName + " successful");

            // display edit
            showEditRecipe();

            toggleSaveCookBook(); // close savecookbook menu
        } catch (err) {
            alert("An error has occured" + err);
        }
    });
}

/**
 * Show edit recipe button
 *
 */
function showEditRecipe() {
    let editDiv = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("article > div");
    editDiv.classList.remove("hidden");
}

/**
 * Hide edit recipe button
 *
 */
function hideEditRecipe() {
    let editDiv = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("article > div");
    editDiv.classList.add("hidden");
}


/**
 * This function adds new cookbook to the save-cookbook menu
 * 
 * @param {string} newCookBook 
 */
function appendNewCookBook(newCookBook) {
    let cookBooksList = document.querySelector("#cookbook-lists > ol");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let label = document.createElement("label");

    // set img src
    img.alt = "bookmark";
    img.src = "./img/icons/bookmark-empty.svg";
    img.height = 20;
    img.width = 20;
    label.innerText = newCookBook;
    li.appendChild(img);
    li.appendChild(label);
    cookBooksList.appendChild(li);
    bindNewCookBook(li);
}

/**
 * This function ask user to enter new cookbook's name,
 * store it to local storage and call appendNewCookBook()
 * 
 */
function addNewCookBook() {
    let newCookBook = prompt("Enter new cookbook:");
    if (newCookBook == "" || newCookBook == null) { return; }
    appendNewCookBook(newCookBook);
    // update local storage
    let cookBooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    cookBooks.push(newCookBook);
    localStorage.setItem(COOK_BOOKS, JSON.stringify(cookBooks));
}

/* end of save new cookbook ====================================================*/

/* Edit Recipe functions ====================================================*/


let EDIT_RECIPE_DATA = {}; // data from current recipe
/**
 * This function loads all ingredients and instructions to the Edit Recipe popup
 * 
 */
function load() {
    const Id = document.querySelector("recipe-page").data["id"];
    EDIT_RECIPE_DATA = JSON.parse(localStorage.getItem(`ID-${Id}`));
    const Ingredients = EDIT_RECIPE_DATA["ingredients"];
    const Instructions = EDIT_RECIPE_DATA["instructions"];

    // remove all elements in case user clicks it twice
    let ingreList = document.querySelectorAll(".edit-recipe-form > .edit-ingredients > ol > li");
    let instrList = document.querySelectorAll(".edit-recipe-form > .edit-instructions > ol > li");
    if (ingreList.length !== 0) { ingreList.forEach(e => e.remove()) }
    if (instrList.length !== 0) { instrList.forEach(e => e.remove()) }

    // load ingredients & instructions
    Ingredients.forEach(ingre => {
        addMoreIngredients(ingre);
    });

    Instructions.forEach(inst => {
        addMoreInstructions(inst);
    });

    toggleEditRecipe();
    $(".edit-recipe-form").scrollTop(0);
}


var $editRecipeVisibility = "hidden";
/**
 * This function displays the popup menu to edit recipe
 * 
 */
function toggleEditRecipe() {
    const article = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("article");
    article.style.opacity = 0.35;
    var menu = document.querySelector(".edit-recipe-form");

    if ($editRecipeVisibility == "hidden") {
        article.style.opacity = 0.35;
        menu.style.transform = "translateY(10%)";
        $editRecipeVisibility = "visible";
    } else {
        menu.style.transform = "translateY(-150%)";
        article.style.opacity = null;
        $editRecipeVisibility = "hidden";
    }
}


/**
 * This hepler function adds ingredients to the edit recipe.
 * 
 * @param {string} ig ingredient
 */
function addMoreIngredients(ig = "") {
    let li = document.createElement("li");
    let text = document.createElement("input");
    let ingreList = document.querySelector(".edit-recipe-form > .edit-ingredients > ol");
    text.type = "text";
    text.placeholder = "ingredient / leave blank if not needed";
    text.value = ig;
    li.appendChild(text);
    ingreList.appendChild(li);
}

/**
 * This hepler function adds instructions to the edit recipe
 * 
 * @param {string} ins instruction
 */
function addMoreInstructions(ins = "") {
    let li = document.createElement("li");
    let text = document.createElement("input");
    let instrList = document.querySelector(".edit-recipe-form > .edit-instructions > ol");
    text.type = "text";
    text.placeholder = "instruction / leave blank if not needed";
    text.value = ins;
    li.appendChild(text);
    instrList.appendChild(li);
}

/**
 * When users hit "save" on edit recipe popup
 * It save the data to recipe on local storage and reload the RecipePage with info
 * 
 */
function submit() {
    let ingredientsList = document.querySelectorAll(".edit-recipe-form > .edit-ingredients > ol > li > input");
    let instructionsList = document.querySelectorAll(".edit-recipe-form > .edit-instructions > ol > li > input");
    let ingreListString = [];
    let instrListString = [];
    let i = 0;

    ingredientsList.forEach(e => {
        if (e.value === "")
            return;
        ingreListString[i] = e.value;
        i++;
    });

    i = 0;
    instructionsList.forEach(e => {
        if (e.value === "")
            return;
        instrListString[i] = e.value;
        i++;
    });
    alert("saved");
    toggleEditRecipe();
    EDIT_RECIPE_DATA["ingredients"] = ingreListString;
    EDIT_RECIPE_DATA["instructions"] = instrListString;
    localStorage.setItem(`ID-${EDIT_RECIPE_DATA["id"]}`, JSON.stringify(EDIT_RECIPE_DATA));

    // reload
    document.querySelector("recipe-page").data = EDIT_RECIPE_DATA;
    showBookMarkEditRecipe();

    EDIT_RECIPE_DATA = {};
}

/**
 * This helper function display bookmark-filled and display editRecipe
 * 
 */
function showBookMarkEditRecipe() {
    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    bookMark.src = "./img/icons/bookmark-filled.svg";
    bookMark.setAttribute("name", "bookmark-filled");
    showEditRecipe();
}
/* end of Edit Recipe =======================================================*/
/* Start Cookbook Display ===================================================*/
/*
NOTE: I am adding cookbooks dynamically but clearing them anyways do due to time constraints so I need to get rid of the code
adding them dynamically sometime but not right now
*/

// 
// 
/**
 * Clears the cookbook display and replaces it with all cookbooks currently in local storage.
 * If there no cookbooks in local storage it will create a default cookbook
 */
function initializeCookbook() {
    let cookbooksList = document.querySelector("#cookbook-display-lists > ol");
    // Clears the cookbook display
    while (cookbooksList.firstChild) {
        cookbooksList.removeChild(cookbooksList.firstChild);
    }

    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    // First we check to see if we already have any cookbooks, if we don't we set up the default one
    // The img is the part where when clicked prompts you to confirm removing that cookbook
    if (cookbooks.length == 0) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let label = document.createElement("label");
        // set img src
        img.alt = "bookmark";
        img.src = "./img/icons/bookmark-empty.svg";
        img.height = 20;
        img.width = 20;
        label.innerText = defaultName;
        li.appendChild(img);
        li.appendChild(label);
        cookbooksList.appendChild(li);
        img.onclick = function() {confirmRemoveList(li)};
        label.onclick = function() {showThisList(defaultName)};
    } else {
        for (let i = 0; i < cookbooks.length; i++) {
            let li = document.createElement("li");
            let img = document.createElement("img");
            let label = document.createElement("label");
            // set img src
            img.alt = "bookmark";
            if (JSON.parse(localStorage.getItem(cookbooks[i])) == undefined || JSON.parse(localStorage.getItem(cookbooks[i])) == null || 
            JSON.parse(localStorage.getItem(cookbooks[i])).length == 0) {
                img.src = "./img/icons/bookmark-empty.svg";
            } else {
                img.src = "./img/icons/bookmark-filled.svg";
            }  
            img.height = 20;
            img.width = 20;
            label.innerText = cookbooks[i];
            label.id = "label";
            li.appendChild(img);
            li.appendChild(label);
            cookbooksList.appendChild(li);
            img.onclick = function() {confirmRemoveList(li)};
            label.onclick = function() {showThisList(cookbooks[i])};
        }
    }
}

/**
 * Shows the contents of the inputted cookbook; if it is empty it will inform the user
 * 
 * @param {*} cookbook The cookbook to display
 */
function showThisList(cookbook) {
    document.getElementById("list-name-header").innerText = cookbook;
    const recipeCardsContainer = document.getElementById('cookbook-contents');
    const cookbookIDs = JSON.parse(localStorage.getItem(cookbook));
    // Clears previous recipe cards, might not be needed
    let childrenToRemove = recipeCardsContainer.getElementsByClassName('recipe-card');
    for (let i = 0; i < childrenToRemove.length; i++) {
        recipeCardsContainer.remove(childrenToRemove[i]);
    }

    // Pretty much copied this from the showRecipeCards function not all that sure how it works
    for (let i = 0; i < cookbookIDs.length; i++) {
        const element = document.createElement('recipe-card');
        let jsonData = JSON.parse(localStorage.getItem(`ID-${cookbookIDs[i]}`));
        element.data = jsonData;
        // Not sure why this is here but it was there in the createRecipeCards() code so I'll just leave it in
        document.querySelector("recipe-page").data = jsonData;
        const id = cookbookIDs[i];

        router.addPage(id, function () {
            window.scrollTo({top: 0, behavior: 'smooth'});
            hideHome();
            hideRecipeCards();
            showRecipePage();
            hideSettings();
            hideCookbooks();
            document.querySelector("recipe-page").data = jsonData;
            checkBookMark(jsonData);
        });

        // TODO: Add a container for the recipe card with a trash or bookmark button inside it to remove the recipe
        // Could do something like what's done in initialize cookbook but have the label be the recipe card.
        recipeCardsContainer.appendChild(element);
        bindRecipeCard(element, id);
    }

    // Hides or shows the empty cookbook message based on the length of the cookbook
    if (cookbookIDs.length == 0) {
        document.getElementById("empty-list").classList.remove("hidden");
    } else {
        document.getElementById("empty-list").classList.add("hidden");
    }

    hideCookbooksDisplay();
    showListDisplay();
}

// 
/**
 * Confirms that the user wants to remove the cookbook then, if confirmed, removes it and it's contents
 *
 * @param {*} cookbookName the cookbook to remove
 */
function confirmRemoveList(cookbookName) {
    let cookbookIDs = JSON.parse(localStorage.getItem(cookbookName));
    if (confirm(("Are you sure you want to permanently remove " + cookbookName + " and its contents from your cookbooks?"))) {
        // Removes the cookbook and its elements from local storage
        // NOTE: Removes all recipes from that cookbook even if they are in another cookbook
        // so this might be a bug or not depending on what we want to do
        for (let i = 0; i < cookbookIDs.length; i++) {
            localStorage.removeItem(`ID-${cookbookIDs[i]}`);
        }
        localStorage.removeItem(cookbookName);
        let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
        cookbooks.splice(cookbooks.indexOf(cookbookName), 1);
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
        let res = JSON.parse(localStorage.getItem(COOK_BOOKS));
    }
    /* Code for version that requires some CSS
    console.log("crL" + name);
    document.getElementById('yes-no-prompt-text').innerText = 'Are you sure you want to delete the cookbook ' + name + '?';
    document.getElementById('prompt-yes').onclick = function() {removeCookbook(name); hideYesNoPrompt();};
    document.getElementById('prompt-box-yes-no').className = "shown";
    // Not sure if the line above works below is a backup of sorts
    //let prompt = document.getElementById('prompt-box-yes-no');
    //prompt.style.visibility = 'visible';
    */
}

// 
/**
 * Prompts the user for a new cookbook name then checks if it is valid. If it adds that cookbook to the list of cookbooks.
 *
 */
function addNewCookbookPrompt() {
    let cookbookName = prompt("What would you like to name this cookbook?");
    while (processTextSubmitCookbook(cookbookName) == false && cookbookName != null) {
        if (cookbookName == "") {
            cookbookName = prompt("Error: No input detected. Please choose a valid name.");
        } else {
            cookbookName = prompt("Error: Another cookbook already has that name. Please choose another.");
        }
    }

    if (processTextSubmitCookbook(cookbookName) == true) {
        //addCookbook(cookbookName)
        let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
        cookbooks.push(cookbookName);
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
        let recipeArr = [];
        localStorage.setItem(cookbookName, JSON.stringify(recipeArr));
    }
    /* Code for version that requires some CSS
    document.getElementById('text-prompt-text').innerText = 'What do you want to call your new cookbook?';
    document.getElementById('prompt-submit').onclick = function() {processTextSubmitCookbook();};
    */
}

/**
 * Checks to see if the cookbook name is valid
 *
 * @param {*} userInput the cookbook name to check
 * @return {*} true if the name isn't null, empty, or already in use. Otherwise it returns false
 */
function processTextSubmitCookbook(userInput) {
    // Checks if the input is empty, if so it changes the request text and exits the function
    console.log("X: " + userInput);
    if (userInput == "" || userInput == null) {
        return false;
    }
    // Checks if the input is the same as another cookbook, if so it changes the request text and exits the function
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    for (const name in cookbooks) {
        if (name == userInput) {
            return false;
        }
    }
    return true;
}

/* Method to add cookbook to display should probably delete it since we aren't doing that
function showNewCookbook(cookbookName) {
    // Here we add the display elements, pretty much the same as what you see in initializeCookbook() 
    let cookbooksList = document.querySelector("#cookbook-display-lists > ol");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let label = document.createElement("label");
    // set img src
    img.alt = "bookmark";
    img.src = "./img/icons/bookmark-empty.svg";
    img.height = 20;
    img.width = 20;
    label.innerText = cookbookName;
    li.appendChild(img);
    li.appendChild(label);
    console.log("X:" + li.querySelector("label").innerText);
    cookbooksList.appendChild(li);
    img.onclick = function() {confirmRemoveList(li)};
    label.onclick = function() {showThisList(cookbookName)};
}
*/

/**
 * Hides the display for a cookbook's contents
 *
 */
function hideListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "hidden";
}

/**
 * Shows the display for a cookbook's contents
 *
 */
function showListDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "visible";
}

/**
 * Hides the display of cookbooks
 *
 */
function hideCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "hidden";
    listDisplay.style.display = "none";
}

/**
 * Shows the display of cookbooks
 *
 */
function showCookbooksDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "visible";
    listDisplay.style.display = null;
}
/* more code for the prompts using CSS, should probably delete it since I probably won't use it
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
*/

// These here are some cookbooks for testing; delete them if I've forgotten to
let testCookbook = ["a", "b", "c", "d"];
localStorage.setItem("cookbooks", JSON.stringify(testCookbook));
localStorage.setItem("a", JSON.stringify(""));
localStorage.setItem("b", JSON.stringify(""));
localStorage.setItem("c", JSON.stringify(""));
localStorage.setItem("d", JSON.stringify(""));
/* End Cookbook Display =====================================================*/