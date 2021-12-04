class RecipeCard extends HTMLElement {
    /**
     * Creates an instance of RecipeCard.
     * @memberof RecipeCard
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    //TODO: move style into its own css file
    /**
     * Sets data for a recipe card
     *
     * @memberof RecipeCard
     */
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
            border-radius: 8px;
            display: grid;
            row-gap: 5px;
            height: auto;
            width: 200px;
            padding: 16px 16px 16px 16px;
            margin-top: 8px;
            margin-bottom: 8px;
            margin-left: 10px;
            margin-right: 10px;
            background-color: var(--orange1);

        }

        article > img {
            padding-left: 10px;
            padding-bottom: 5px;
            height: 118px;
            width: 205px;
            object-fit: cover;
            margin-left: -16px;
        }

        article:hover {
            transition: ease-in-out .1s;
            cursor: pointer;
            -webkit-box-shadow:inset 0px 0px 0px 1px #f00;
            -moz-box-shadow:inset 0px 0px 0px 1px #f00;
            box-shadow:inset 0px 0px 0px 3px var(--orange3);

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