
//object of general categories for category cards in the form of key, value pairs
//key: name of category, value: picture for that category
 const categories = {
    "Indian": "./img/foodPics/indian.jpeg",
    "Vegan": "./img/foodPics/vegan.jpeg",
    "Mexican": "./img/foodPics/mexican.jpeg",
    "Gluten-Free": "./img/foodPics/gluten-free.jpeg",
    "Italian" :"./img/foodPics/italian.jpeg",
    "Meditteranean": "./img/foodPics/mediterranean.jpeg"
} 


window.addEventListener('DOMContentLoaded', init);

//displays category cards when page is loaded
async function init() {
    createCategoryCards();
}

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

//this function creates the category cards from the categories object above
function createCategoryCards(){

    //iterating through each category from categories object
     for (let [key, value] of Object.entries(categories)){
        
        const categoryCard = document.createElement('category-card'); // creating category card
        categoryCard.data = [key,value]; //key: name of category, value: picture of category

        
        document.querySelector('.category-cards--wrapper').appendChild(categoryCard);    
        
        bindCategoryCards(categoryCard, key);
    } 
    


}


function bindCategoryCards(categoryCard, categoryName) {
    categoryCard.addEventListener("click", e =>{
        let searchQuery = categoryName;
        document.getElementById('searchQuery').value = searchQuery;
        alert('searching for ' + searchQuery + ' dishes')
        //search();

    })
}

