class Filter extends HTMLElement {

    /**
     * Creates an instance of Filter.
     * @memberof Filter
     */
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }

    //getting the data to set the image and the name of the category card.
    /**
     * Sets data for a filter
     *
     * @memberof Filter
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
            display: flex;
            justify-content: center;
            background-color: var(--primary);
            height: fit-content;
            padding: 1px 10px;
            border-radius: 20px;
            border-color: var(--primary);
            margin: 5px 10px;
        }

        article > button{
            color: white;
            font-size: 1rem;
        }

        p {
            font-size: 1rem;
            color: var(--background-color);
        }

        @media (max-width: 750px) {
            article {
                margin-left: 3px;   
                padding: 5px;  
                border-radius: 20px;
            }
    
            article > button{
                font-size: 12px;
            }
    
            p {
                font-size: 12px;
            }

          }
    `;

        styleElem.innerHTML = styles;

        const filter = document.createElement("article");

        const titleText = data;
        //creating the title element for the card
        const title = document.createElement("p");
        title.innerHTML = titleText;
        // const exit = document.createElement("button");
        // exit.innerHTML = "X";
        //appending the image and the title to the card element
        filter.appendChild(title);
        //filter.append(exit);
        this.shadowRoot.append(styleElem, filter);
    }


}

//defining the custom element category-card using the Category Card class 
customElements.define("filter-card", Filter);