function init() {
    showHome();
}

//on enter for search, call search function
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});


function search() {
    let searchQuery = document.getElementById('search-query').value;
    console.log(searchQuery);
    console.log(localStorage.getItem("dietaryRestrictions"));

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
    hideHome();
    hideCookbooks();
    const settings = document.getElementById("settings-container");
    settings.style.transform = "translate(100%)";
    // Get the list of restrictions from local storage
    const getDietaryRestrictions = JSON.parse(localStorage.getItem("dietaryRestrictions"));
    const dietaryContainerElements = document.getElementById('dietary-container').elements;
    
    for(let i = 0; i < dietaryContainerElements.length; i++) {
        const dietaryRestriction = dietaryContainerElements[i];
        // If our restriction is in the list, then check it on the page
        if(getDietaryRestrictions.includes(dietaryRestriction.value)) {
            dietaryRestriction.checked = true;
        }
    }
}

function hideSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.transform = "translate(-100%)";
}

function showHome() {
    hideSettings();
    hideCookbooks();
    const search = document.getElementById("search");
    search.style.visibility = "visible";
}

function hideHome() {
    const search = document.getElementById("search");
    search.style.visibility = "hidden";
}

function showCookbooks() {
    hideSettings();
    hideHome();
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
}

function hideCookbooks() {
    const cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
}

function updateSettings() {
    const dietaryRestrictionList = [];
    // Get all the inputs under the div
    const dietaryContainerElements = document.getElementById('dietary-container').elements;
    for(let i = 0; i < dietaryContainerElements.length; i++) {
        // If a checkbox is checked, then add it to our list
        const inputElement = dietaryContainerElements[i];
        if(inputElement.checked) {
            dietaryRestrictionList.push(inputElement.value);
        }
    }

    // Add list to local storage
    localStorage.setItem("dietaryRestrictions", JSON.stringify(dietaryRestrictionList));
    
}