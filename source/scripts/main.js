var $SOMenuVisibility = "hidden";
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
    if (tapModeButton.innerHTML == "Leave Tap Mode") {
        tapModeButton.innerHTML = "Enter Tap Mode";
        $tapModeVisibility = "hidden";
        tapModeButton.style.backgroundColor = "var(--background-color)";
        tapModeButton.style.color = "var(--primary)";

    }
    else {
        tapModeButton.innerHTML = "Leave Tap Mode";
        $tapModeVisibility = "visible";
        tapModeButton.style.backgroundColor = "var(--primary)";
        tapModeButton.style.color = "var(--background-color)";
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
    tapModeButton.innerHTML = "Enter Tap Mode";
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

function toggleShareRecipeModal() {
    const setDisplay = (modal, blackout, display) => {
        modal.style.display = display;
        blackout.style.display = display;
    };

    const modal = document.getElementById('send-recipe-email');
    const blackout = document.getElementById('body-blackout');
    const cancelModal = document.getElementById("send-recipe-cancel");

    const display = modal.style.display !== "block" ? "block" : "none";
    setDisplay(modal, blackout, display);

    blackout.onclick = () => {
        setDisplay(modal, blackout, "none");
    };

    cancelModal.onclick = () => {
        setDisplay(modal, blackout, "none");
    };
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
        showBookMarkEditReipce();
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
        menu.style.visibility = "visible";
        $SOSaveCookBookMenuVisibility = "visible";
    }
    else {
        menu.style.transform = "translateY(100%)";
        menu.style.visibility = "hidden";
        $SOSaveCookBookMenuVisibility = "hidden";
    }

}

/**
 *  This functions displays all the cookbooks in local storage to the saved-cookbook menu
 * when users click on bookmark. There is one cookbook by default - "favorites".
 *  If bookmark has been marked/filled. It removes the recipe from local Storage.
 * 
 */
function showCookBookMenu() {
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    console.log("CookBooks List: ", cookbooks);
    if (cookbooks == undefined || cookbooks == null) {
        cookbooks = ["Favorites"];
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
    }

    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    if (bookMark.getAttribute("name") == "bookmark-empty") {
        let cookbooksListHTML = document.querySelectorAll("#cookbook-lists > ol > li");
        // remove all cookbooks
        if (cookbooksListHTML.length !== 0) cookbooksListHTML.forEach(cb => cb.remove());
        cookbooks.forEach(cb => appendNewCookBook(cb));
        toggleSaveCookBook();
    }
    else if (confirm("Are you sure to remove this recipe?")) {
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
        menu.style.visibility = "visible";
        $editRecipeVisibility = "visible";
    } else {
        menu.style.transform = "translateY(-150%)";
        menu.style.visibility = "hidden";
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
    text.placeholder = "ingredient";
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
    text.placeholder = "instruction";
    text.value = ins;
    li.appendChild(text);
    instrList.appendChild(li);
}

/**
 * this function removes the last ingredient in the ingredients list
 */
function removeIngredient() {
    let ingreList = document.querySelector(".edit-recipe-form > .edit-ingredients > ol");
    ingreList.lastChild.remove();
}

/**
 * This function removes the last intructions in the instructions list
 */
function removeInstruction() {
    let instrList = document.querySelector(".edit-recipe-form > .edit-instructions > ol");
    instrList.lastChild.remove();
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
    showBookMarkEditReipce();

    EDIT_RECIPE_DATA = {};
}

/**
 * This helper function display bookmark-filled and display editRecipe
 * 
 */
function showBookMarkEditReipce() {
    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    bookMark.src = "./img/icons/bookmark-filled.svg";
    bookMark.setAttribute("name", "bookmark-filled");
    showEditRecipe();
}

/* end save new cookbook ====================================================*/

/* end of Edit Recipe =======================================================*/

/**
 * Print a recipe from the recipe page
 */
function printRecipe() {
    window.print();
}

/**
 * Open the share recipe modal
 */
function emailRecipe() {
    toggleShareRecipeModal();
}

window.printRecipe = printRecipe;
window.emailRecipe = emailRecipe;
