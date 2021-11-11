//on enter for search, call search function
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});


function search() {
    //TODO: remove this alert, implement real search
    let searchQuery = document.getElementById('searchQuery').value;
    alert(searchQuery);

}


function clearCheckBoxes(){
    document.querySelectorAll("input[type='checkbox']")
        .forEach(e => e.checked = false);
}

function tapMode(){
    let button = document.querySelector("#tap-mode");
    if (button.textContent == "Tap Mode Off")
    {
        // do something
        button.textContent = "Tap Mode On";
    }
    else
    {
        // do something
        button.textContent = "Tap Mode Off";
    }
}

function setBookMark(){
    
    let bookMark = document.querySelector("#bookmark");
    if (bookMark.getAttribute("name") == "bookmark-empty")
    {
        // do something
        bookMark.src="./img/icons/bookmark-filled.svg";
        bookMark.setAttribute("name", "bookmark-filled");
    }
    else
    {
        // do something
        bookMark.src="./img/icons/bookmark-empty.svg";
        bookMark.setAttribute("name", "bookmark-empty");
    }
}