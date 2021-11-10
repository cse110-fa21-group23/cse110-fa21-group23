class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    //TODO: move style into its own css file
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
            width: 200px;
            padding: 16px 16px 16px 16px;
            margin-top: 30px;
            margin-left: 15px;
            margin-rigth: 15px;
            background-color: var(--orange1);
            box-shadow: 2px 5px 3px var(--light-grey); 

        }

        article > img {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            padding-left: 10px;
            padding-bottom: 5px;
            height: 118px;
            width: 205px;
            object-fit: cover;
            margin-left: -16px;
        }

        article:hover {
            transform: scale(1.02, 1.02);
            cursor: pointer;
        }

        p.title {
            font-size: 1rem;
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
        titleElement.classList.add('title');
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