class ListDisplay extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
    }
  
    set data(data) {
        const recipeList = document.createElement("div");
        for (let i = 0; i < data.length; i++) {
            const recipeCard = document.createElement('RecipeCard');
            // Set Data
            recipeList.appendChild(recipeCard);
        }
        this.shadowRoot.appendChild(recipeList);
    }
}