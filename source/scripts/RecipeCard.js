class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    set data(data) {
        const styleElement = document.createElement("style");
        const styles = `
            * {
                font-family: 'Poppins', sans-serif;
                color: var(--primary);
                margin: 0;
                padding: 0;
            }

            article {
                
                align-items: center;
                border: 1px;
                border-radius: 8px;
                display: grid;
                row-gap: 5px;
                height: auto;
                width: 178px;
                padding: 16px 16px 16px 16px;
            }

            article > img {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                height: 118px;
                object-fit: cover;
                width: calc(100% + 16px);
            }
            p.title {
                font-size: 16px;
                height: 36px;
                line-height: 18px;
                overflow: hidden;
            }

            div.tags {
                height: 32px;
                line-height: 16px;
                padding-top: 4px;
            }

        `; 
        styleElement.innerHTML = styles;
        const card = document.createElement('article');
        
 
        let recipeImage = document.createElement("img");
        //need to use the api to get the recipe's image src
        let image = data["image"];
        
        recipeImage.setAttribute("src", image);

        card.appendChild(recipeImage);

        let titleElement = document.createElement("p");
        //need to use the api to get the actual title for the recipe
        let titleText = data["title"];
        titleElement.innerHTML = titleText;
        card.appendChild(titleElement);

        let tagsDiv = document.createElement("div");
        //need to use the api to get a list of the tags of the dish
        
        this.shadowRoot.appendChild(card);
        this.shadowRoot.appendChild(styleElement);

    }
}

customElements.define("recipe-card", RecipeCard);