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
    //TODO: remove this alert, implement real search
    let searchQuery = document.getElementById('search-query').value;
    alert(searchQuery);

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
    var settings = document.getElementById("settings-container");
    settings.style.transform = "translate(100%)";
}

function hideSettings() {
    var settings = document.getElementById("settings-container");
    settings.style.transform = "translate(-100%)";
}

function showHome() {
    hideSettings();
    hideCookbooks();
    var search = document.getElementById("search");
    search.style.visibility = "visible";
}

function hideHome() {
    var search = document.getElementById("search");
    search.style.visibility = "hidden";
}

function showCookbooks() {
    hideSettings();
    hideHome();
    var cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "visible";
}

function hideCookbooks() {
    var cookbook = document.getElementById("cookbook-container");
    cookbook.style.visibility = "hidden";
}



function updateSettings() {
    // TODO: Implement update settings for dietary preferences
    console.log("update button was pressed");
}