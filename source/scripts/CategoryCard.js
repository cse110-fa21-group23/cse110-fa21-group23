class CategoryCard extends HTMLElement {

    /**
     * Creates an instance of CategoryCard.
     * @memberof CategoryCard
     */
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }

    //getting the data to set the image and the name of the category card.
    /**
     * Sets data for a category card
     *
     * @memberof CategoryCard
     */
    set data(data) {

        const styleElem = document.createElement("style");
        const styles = `
        * {
            font-family: 'Poppins', sans-serif;
            color: var(--primary);
            margin: 0;
            padding: 0;
        }

        article {
            border-radius: 8px;
            height: 150px;
            row-gap: 5px;
            padding: 0 16px 16px 16px;
            width: 180px;
            margin: 10px;
            cursor: pointer;
            background-color: var(--orange3);
            align-items: center;   
            display: grid;
            margin-top: 30px;
            margin-left: 15px;
            margin-rigth: 15px;
        }

        article > img {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 118px;
            object-fit: cover;
            margin-left: -16px;
            width: calc(100% + 32px);
        }

        article:hover {
            background-color: var(--background-color);
            box-shadow: 2px 5px 3px var(--light-grey); 
            transform: scale(1.01, 1.01);
            transition: ease-in-out .25s;
        }

        article:hover p {
            color: var(--primary);
        }

        p {
            font-size: 1rem;
            color: var(--background-color);
        }


        @media screen and (max-width: 500px) {

             article {
              border-radius: 8px;
              height: 80px;
              row-gap: 5px;
              padding: 0 8px 8px 8px;
              width: 100px;
              margin: 2px;
             }

             article > img {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                height: 60px;
                object-fit: cover;
                margin-left: -8px;
                width: calc(100% + 16px);
               }

            article > p {
                font-size: 0.7rem;
                transition: .2s ease-in-out;
            }


       

          }
    `;

        styleElem.innerHTML = styles;

        const card = document.createElement("article");

        var pic = data[1]; //allows us to get the picture from the data array passed in

        //creating the image element for the card
        var img = document.createElement("img");
        img.setAttribute("src", pic);

        var name = data[0]; //allows us to get the name from the data array passed in
        const titleText = name;

        //creating the title element for the card
        const title = document.createElement("p");
        title.innerHTML = titleText;

        //appending the image and the title to the card element
        card.appendChild(img);
        card.appendChild(title);
        this.shadowRoot.append(styleElem, card);
    }


}

//defining the custom element category-card using the Category Card class 
customElements.define("category-card", CategoryCard);