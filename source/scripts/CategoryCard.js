class CategoryCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
    }

    //getting the data to set the image and the name of the category card.
    set data(data){
  
        const styleElem = document.createElement('style');
        const styles = `
        * {
         font-family: 'Poppins', sans-serif;
         color: var(--primary);
         margin: 0;
         padding: 0;
        }

        article:hover {
         transform: translateY(-10px);
         box-shadow: 5px 10px #888888;

        }

        article {
         border: 3px solid var(--primary);
         border-radius: 8px;
         height: 150px;
         row-gap: 5px;
         padding: 0 16px 16px 16px;
         width: 180px;
         margin: 10px;
         cursor: pointer;
        }

        article > img {
         border-top-left-radius: 8px;
         border-top-right-radius: 8px;
         height: 118px;
         object-fit: cover;
         margin-left: -16px;
         width: calc(100% + 32px);
        }

        p.title {
         display: -webkit-box;
         font-size: 16px;
         height: 36px;
         line-height: 18px;
         overflow: hidden;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
        }

        @media screen and (max-width: 500px) {

             article {
              border-radius: 8px;
              height: 80px;
              row-gap: 5px;
              padding: 0 8px 8px 8px;
              width: 110px;
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
       
               p.title {
                display: -webkit-box;
                font-size: 16px;
                height: 12px;
                line-height: 7px;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
               }
          }
    `;

    styleElem.innerHTML = styles;

    const card = document.createElement('article');

    var pic = data[1]; //allows us to get the picture from the data array passed in

    //creating the image element for the card
    var img = document.createElement('img');
    img.setAttribute('src', pic);

    var name = data[0]; //allows us to get the name from the data array passed in
    const titleText = name;

    //creating the title element for the card
    const title = document.createElement('p');
    title.innerHTML = titleText;

    //appending the image and the title to the card element
    card.appendChild(img);
    card.appendChild(title);
    this.shadowRoot.append(styleElem, card);
}


}

//defining the custom element category-card using the Category Card class 
customElements.define('category-card', CategoryCard);