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