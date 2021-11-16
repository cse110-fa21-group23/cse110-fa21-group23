//This whole thing should be cleaned up and under scripts.js
var lists = [];//Should be a 2d array/set/whatever of the saved lists
var listsDisplay = [];//Should be a 2d array/set/whatever used 
var listsEmpty = true;

/* Adds and sets up the save recipe button to the display recipe page
*/
let addToListButton = document.createElement("button");
addToListButton.innerText(lists[i][0]);
//addToList.onclick(addToList(i, ...));// Somehow pass on what page you are on
document.querySelector("#showAddToList").appendChild(addToList);
/* OLD: Each for loop sets up 1 of the 2 display list sections when first entering
 the cookbooks with the lists split in half between them
*/
let cookbooksList = document.querySelector("#cookbooks-list");
for (let i = 0; i < lists.length; i++) {
    let bookMark = document.createElement("img");
    bookMark.classList.add("bookmark");
    bookMark.src = "./img/icons/bookmark-filled.svg";
    bookMark.src = "./img/icons/bookmark-empty.svg";
    let bookMark = document.createElement("img");
    bookMark.classList.add("bookMark");
    bookMark.src = "./img/icons/bookmark-filled.svg";
    if (lists[i].length != 0) {
        bookMark.src = "./img/icons/bookmark-filled.svg";
    } else {
        bookMark.src = "./img/icons/bookmark-empty.svg";
    }
    cookbooksList.appendChild(bookMark);
    let listLink = document.createElement('p');
    listLink.classList.add('list_name');
    listLink.innerText(lists[i][0]);
    listLink.onclick(showThisList(i));
    cookbooksList.appendChild(listLink);
}

/* Shows the content of the inputted list
@param the index of the list to add 
*/
function showThisList(index) {
    hideCookbookDisplay();
    showListContents();
    document.getElementById('list-name-header').innerText(lists[index][0]);
    const recipeCards = document.getElementById('cookbook-contents');
    for (let i = 1; i < lists[index].length; i++) {
        var element = lists[index][i];
        recipeCards.appendChild(element);
        bindRecipeCard(element);
    }
}

function hideListsDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "hidden";
}

function showListsDisplay() {
    const listDisplay = document.getElementById('cookbook-contents');
    listDisplay.style.visibility = "visible";
}

function hideCookbookDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "hidden";
}

function showCookbookDisplay() {
    const listDisplay = document.getElementById('cookbooks');
    listDisplay.style.visibility = "visible";
}