var lists = [];
var listsDisplay = [];
var listsEmpty = true;

for (let i = 0; i < (lists.length)/2; i++) {
    if (lists[i].length != 0) {
        listsEmpty = false;
    }
    ListDisplay.push(document.createElementElement('ListDisplay'));
    listToShow.data = lists[i];
    let button = document.createElement("button");
    button.innerText(lists[i][0]);
    button.onclick(showThisList(i));
    document.querySelector("firstListDisplay").appendChild(button);
    let addToList = document.createElement("button");
    addToList.innerText(lists[i][0]);
    //addToList.onclick(addToList(i, ...));// Somehow pass on what page you are on
    document.querySelector("showAddToList").appendChild(addToList);
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
    document.querySelector("secondListDisplay").appendChild(button);
    let addToList = document.createElement("button");
    addToList.innerText(lists[i][0]);
    //addToList.onclick(addToList(i, ...)); Somehow pass on what page you are on
    document.querySelector("showAddToList").appendChild(addToList);
}

if (listsEmpty == true) {
    document.querySelector("openTab").src = "img/icons/bookmark-empty.svg";
}

function showThisList(index) {
    while (document.querySelector("selectedDisplayList").firstChild) {
        document.querySelector("selectedDisplayList").removeChild(document.querySelector("selectedDisplayList").firstChild);
    }
    document.querySelector("selectedDisplayList").appendChild(Display[index]);
}

function addToList(i, name) {
    lists[i].push(name);
}