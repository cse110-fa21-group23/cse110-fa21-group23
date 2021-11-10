/* TL;DC
Basic preliminary nonfunctional code for lists;
All of the non-function stuff should be under init.
*/
/* Notes To Future Me:
Arrays are indexed by default but I should find some more efficient way to label them than having a back up array
Also figure out show/hide instead of append and remove Child; THINK OF THE CHILDREN
Come up with better names than closeTab and openTab; they are probably confusing
*/
var lists = [];//Should be a 2d array/set/whatever of the saved lists
var listsDisplay = [];//Should be a 2d array/set/whatever used 
var listsEmpty = true;

/* Adds and sets up the save recipe button to the display recipe page
*/
let addToListButton = document.createElement("button");
addToListButton.innerText(lists[i][0]);
//addToList.onclick(addToList(i, ...));// Somehow pass on what page you are on
document.querySelector("#showAddToList").appendChild(addToList);
/* Each for loop sets up 1 of the 2 display list sections when first entering
 the cookbooks with the lists split in half between them
*/
for (let i = 0; i < (lists.length)/2; i++) {
    if (lists[i].length != 0) {
        listsEmpty = false;
    }
    listDisplay.push(document.createElementElement('ListDisplay'));
    listDisplay[i].data = lists[i];
    let button = document.createElement("button");
    button.innerText(lists[i][0]);
    button.onclick(showThisList(i));
    document.querySelector("#firstListDisplay").appendChild(button);
}
for (let i = (lists.length)/2; i < lists.length; i++) {
    if (lists[i].length != 0) {
        listsEmpty = false;
    }
    ListDisplay.push(document.createElementElement('ListDisplay'));
    listToShow.data = lists[i];
    let button = document.createElement("button");
    button.innerText(lists[i][0]);
    button.onclick(showThisList(i));
    document.querySelector("#secondListDisplay").appendChild(button);
}

/* Sets the add to recipes button to have the correct image
*/
if (listsEmpty == true) {
    document.querySelector("#openTab").src = "img/icons/bookmark-empty.svg";
}

/* Shows the content of the inputted list
@param the index of the list to add 
*/
function showThisList(index) {
    while (document.querySelector("#selectedDisplayList").firstChild) {
        document.querySelector("#selectedDisplayList").removeChild(document.querySelector("selectedDisplayList").firstChild);
    }
    document.querySelector("#cookbook-container").removeChild(document.querySelector("#firstListDisplay"));
    document.querySelector("#cookbook-container").removeChild(document.querySelector("#secondListDisplay"));
    document.querySelector("#selectedDisplayList").appendChild(listDisplay[index]);
}

/* Adds a recipe to the selected list
@param the index of the list to add the recipe to
@param the name of the recipe to add
*/
function addToList(i, name) {
    lists[i].push(name);
}