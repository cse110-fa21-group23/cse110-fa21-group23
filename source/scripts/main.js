var $SOMenuVisibility = "hidden";
var $tapModeVisibility = "hidden";
var $dietFilterVisibility = "hidden";
var $timeFilterVisibility = "hidden";
var $mealTypeFilterVisibility = "hidden";
var $cuisineFilterVisibility = "hidden";

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

function toggleDietFilters () {
    let dietIcon= document.getElementById("dietIcon");
    dietIcon.classList.toggle("filterArrowIcon");
    let dietBtn = document.getElementById("dietBtn"); 
    dietBtn.classList.toggle("clickedFiltersBtn")
    let dropDownMenu = document.getElementById("diet-filter");

    if ($dietFilterVisibility == "hidden") {
        $dietFilterVisibility = "visible";
        dropDownMenu.style.visibility = "visible";

    }
    else {
        $dietFilterVisibility = "hidden";
        dropDownMenu.style.visibility = "hidden";  

    }
}

function toggleCuisineFilters () {
    let cuisineIcon = document.getElementById("cuisineIcon");
    cuisineIcon.classList.toggle("filterArrowIcon");
    let cuisineBtn = document.getElementById("cuisineBtn");
    cuisineBtn.classList.toggle("clickedFiltersBtn") 
    let dropDownMenu = document.getElementById("cuisine-filter");

    if ($cuisineFilterVisibility == "hidden") {
        $cuisineFilterVisibility = "visible";
        dropDownMenu.style.visibility = "visible";
    }
    else {
        $cuisineFilterVisibility = "hidden";
        dropDownMenu.style.visibility = "hidden";  

    }
}

function toggleTimeFilters () {
    let timeFilter = document.getElementById("timeIcon");
    timeFilter.classList.toggle("filterArrowIcon");
    let timeBtn = document.getElementById("timeBtn"); 
    timeBtn.classList.toggle("clickedFiltersBtn")
    let dropDownMenu = document.getElementById("time-filter");

    if ($timeFilterVisibility == "hidden") {
        $timeFilterVisibility = "visible";
        dropDownMenu.style.visibility = "visible";
    }
    else {
        $timeFilterVisibility = "hidden";
        dropDownMenu.style.visibility = "hidden";  

    }
}

function toggleMealTypeFilters () {
    let mealFilter = document.getElementById("mealIcon");
    mealFilter.classList.toggle("filterArrowIcon");
    let mealBtn = document.getElementById("mealBtn"); 
    mealBtn.classList.toggle("clickedFiltersBtn")
    let dropDownMenu = document.getElementById("meal-filter");

    if ($mealTypeFilterVisibility == "hidden") {
        $mealTypeFilterVisibility = "visible";
        dropDownMenu.style.visibility = "visible";
    }
    else {
        $mealTypeFilterVisibility = "hidden";
        dropDownMenu.style.visibility = "hidden";  
    }
}

// this function is being called from scripts.js, ignore the Codacy error :D
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

function clearCheckBoxes() {
    let checkboxes = document.querySelector("#recipe-page-container > recipe-page")
        .shadowRoot.querySelectorAll("#ingredients-list > ul > ol > input");
    checkboxes.forEach((e) => e.checked = false);
}

function clearFilterCheckBoxes() {
    let diets = document.getElementsByName("dietary-radio");
    let cuisines= document.getElementsByName("cuisine-radio");
    let mealtypes = document.getElementsByName("meal-radio")
    let time = document.getElementsByName("time-radio")
    diets.forEach((e) => e.checked = false);
    cuisines.forEach((e) => e.checked = false);
    mealtypes.forEach((e) => e.checked = false);
    time.forEach((e) => e.checked = false);
}

function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.visibility = "hidden";
    settings.style.display = "none";
    // settings.style.transform = "translate(-100%)";
}

function showHome() {
    hideSettings();
    hideCookbooks();
    hideRecipeCards();
    showCategoryCards();
    hideRecipePage();
    hideFilters();
    showSearchBar();
    hideFilterBtns();
    hideApplyBtn();
    clearFilterCheckBoxes();
    document.getElementById('search-query').value = ''; //clears search result
}

function hideHome() {
    hideCategoryCards();
    hideSearchBar();
    hideFilters();
    hideFilterBtns();
    hideApplyBtn();
}

function showSearchBar() {
    const search = document.getElementById("search");
    search.style.visibility = "visible";
    search.style.display = null;
}

function hideSearchBar() {
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
    search.style.display = "none";
}

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

function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
    cookbook.style.display = "none";
    document.querySelector("body > main > div.box").style.display = null;
}

function showRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "visible";
    recipePage.style.display = null;
}

function hideRecipePage() {
    const recipePage = document.getElementById("recipe-page-container");
    recipePage.style.visibility = "hidden";
    recipePage.style.display = "none";
}

function showRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "visible";
    recipeCards.style.display = null;
}
function hideRecipeCards() {
    const recipeCards = document.getElementById("recipe-card-container");
    recipeCards.style.visibility = "hidden";
    recipeCards.style.display = "none";
}

function showCategoryCards() {
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "visible";
    categoryCards.style.display = null;
}

function hideCategoryCards() {
    const categoryCards = document.getElementById("category-wrapper");
    categoryCards.style.visibility = "hidden";
    categoryCards.style.display = "none";
}

function hideFilters() {
    console.log("hiding")
    const filters = document.getElementById("filters-content");
    filters.style.visibility = "hidden";  
    const diet = document.getElementById("diet-filter");
    diet.style.visibility = "hidden";
    const cuisine = document.getElementById("cuisine-filter");
    cuisine.style.visibility = "hidden";
    const time = document.getElementById("time-filter");
    time.style.visibility = "hidden";
    const meal = document.getElementById("meal-filter");
    meal.style.visibility = "hidden";

    if($dietFilterVisibility !== "hidden"){
        toggleDietFilters();
    }

    if($cuisineFilterVisibility !== "hidden"){
        toggleCuisineFilters();
    }

    if($timeFilterVisibility !== "hidden"){
        toggleTimeFilters();
    }

    if($mealTypeFilterVisibility !== "hidden"){
        toggleMealTypeFilters();
    }
}

function hideFilterBtns() {
    const filtersBtn = document.getElementById("filters-container")
    filtersBtn.style.visibility = "hidden"
}

function showFilterBtns() {
    const filtersBtn = document.getElementById("filters-container")
    filtersBtn.style.visibility = "visible"
    
}

function showDietFilters() {
    console.log('diet');
    const diet = document.getElementById("diet-filter");
    diet.style.visibility = "visible";
}

function showApplyBtn() {
    const applyButton = document.getElementById("applyBtn");
    applyButton.style.visibility = "visible";
}
function hideApplyBtn() {
    const applyButton = document.getElementById("applyBtn");
    applyButton.style.visibility = "hidden";
}

function showCuisineFilters() {
    const cuisine = document.getElementById("cuisine-filter");
    cuisine.style.visibility = "visible";
}

function showTimeFilters() {
    const time = document.getElementById("time-filter");
    time.style.visibility = "visible";
}

function showMealFilters() {
    const meal = document.getElementById("meal-filter");
    meal.style.visibility = "visible";
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

function checkBookMark(data) {
    const Id = data["id"];
    const Data = JSON.parse(localStorage.getItem(`ID-${Id}`));
    if (Data != null) {
        let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
        bookMark.src = "./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
}


/* Save new cookbook ========================================================*/
const COOK_BOOKS = "cookbooks";
var $SOSaveCookBookMenuVisibility = "hidden";
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

function showCookBookMenu() {
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    console.log("CookBooks List: ", cookbooks);
    if (cookbooks == undefined || cookbooks == null) {
        cookbooks = ["Favorites"]; 
        localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
    }

    let bookMark = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#bookmark");
    if (bookMark.getAttribute("name") == "bookmark-empty")
    {
        let cookbooksList = document.querySelectorAll("#cookbook-lists > ol > li");
        if (cookbooksList.length == 0) {
            cookbooks.forEach((cookBook) => {
            appendNewCookBook(cookBook);
            });
        }
        toggleSaveCookBook();
    }
    else {
        try{
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
        } catch (err) {
            alert("An error has occured: " + err);
        }
    }
}

function bindNewCookBook(li) {
    li.addEventListener("click", (event) => {
        try{
            // save recipe data to local storage and add it to the 
            alert(event.currentTarget.innerText);
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
            toggleSaveCookBook(); // close savecookbook menu
        } catch (err) {
            alert("An error has occured" + err);
        }
    });
  }
  
function appendNewCookBook(newcookbook) {
    let cookbooksList = document.querySelector("#cookbook-lists > ol");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let label = document.createElement("label");

    // set img src
    img.alt = "bookmark";
    img.src = "./img/icons/bookmark-empty.svg";
    img.height = 20;
    img.width = 20;
    label.innerText = newcookbook;
    li.appendChild(img);
    li.appendChild(label);
    cookbooksList.appendChild(li);
    bindNewCookBook(li);
}

function addNewCookBook() {
    let newCookBook = prompt("Enter new cookbook:");
    if (newCookBook == "" || newCookBook == null) { return; }
    appendNewCookBook(newCookBook);
    // update local storage
    let cookbooks = JSON.parse(localStorage.getItem(COOK_BOOKS));
    cookbooks.push(newCookBook);
    localStorage.setItem(COOK_BOOKS, JSON.stringify(cookbooks));
}
  
/* end save new cookbook ====================================================*/
