// const APP_KEY = '49f00a06d9919e4a6b1c9326710e854f';
// const APP_ID = '216d6176';
const API_KEY = '4d936c811cda46879d4749def6bb36a1';
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true`;

//on enter for search, call search function
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});


function search() {
    //TODO: remove this alert, implement real search
    let searchQuery = document.getElementById('searchQuery').value;
    if(!searchQuery) {
        alert("Please input a search or click a filter below");
        return;
    }
    fetch(`${url}&query=${searchQuery}`).then(res => res.json()).then(data => {
        console.log(data);
        let id = data.results[0].id;

        fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`).then(res => res.json())
        .then(data => {
            console.log(data);
        })
    })

}

