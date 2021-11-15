// RecipePage.js

class RecipePage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        
        
    }

    set data(data){
        if (data == null)
        {
            console.log("Error: no data exists");
            return;
        }
        const style = document.createElement("style");
        const container = document.createElement("article");

        style.innerHTML = `
        .header{
          text-align: center;
      }
      
      .header h1{
          position: relative;
          display: inline;
          font-style: normal;
          font-weight: normal;
          font-size: 64px;
          line-height: 96px;
          text-align: center;
      }
    
      .header #bookmark{
        text-align: center;
        /* padding-left: 50px; */
        margin-left : 50px;
        /*float: right;*/
      }
    
      .middle > div > h3{
          text-align: center;
          font-weight: bold;
          margin-top: 80px;
      }
    
      #clear-checkboxes{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 40px;
      }
    
      /*-- custom checkbox style --*/
      
      input[class="ingredients-custom-checkbox"] + label,
      input[class="ingredients-custom-checkbox"] + label::before
      {
          display: inline-block;
          vertical-align: middle;
          
      }
    
      input[class="ingredients-custom-checkbox"]
      {
          opacity: 0; /*hide the actual checkbox*/
          position: absolute;
          transform: scale(2);
      }
    
      input[class="ingredients-custom-checkbox"]:hover
      {
        cursor: pointer;
      }
        
      input[class="ingredients-custom-checkbox"] + label::before
      {
        /*custom new checkbox*/
          content: "";
          width: 15px;
          height: 15px;
          margin: 0 4px 0 0;
          line-height: 14px;
          text-align: center;
          border: solid 3px var(--primary);
      }
      
        input[class="ingredients-custom-checkbox"]:checked + label::before
      {
          content: "\\2714"; /* tick sign */
          font-size: 15px;
      }
    
      #ingredients-list > label{
        color: black;
      }
      /*-----------------------------------*/
      
      #instructions > ol > li{
        color: black;
      }
    
      #ingredients-list{
          /* text-align: center; */
          font-style: normal;
          font-weight: normal;
    
      }
    
      #ingredients-list > button{
        border: 0;
        background-color: inherit;
        font: inherit;
        text-align: center;
        padding: 20px;
      }
    
      #ingredients-list> button:hover{
        cursor: pointer;
        background: #eee;
      }
      `;

        // Header - title
        const header = document.createElement("header");
        header.classList.add("header");
        const title = document.createElement("h1");
        // TODO: get title
        // title.innerText = get Title using API;
        const bookMark = document.createElement("input");
        bookMark.id = "bookmark";
        bookMark.type = "image";
        bookMark.onclick = "setBookMark()";
        bookMark.name = "bookmark-empty";
        bookMark.src = "./img/icons/bookmark-empty.svg";
        bookMark.width = "56";
        bookMark.height = "56";
        header.appendChild(title);
        header.appendChild(bookMark);

                        // middle
        const mainDiv = document.createElement("div");
        // <-- ingredient list -->
        const ingredientsListDiv = document.createElement("div");
        ingredientsListDiv.classList.add("ingredients-list");
        ingredientsListDiv.innerHTML = `
        <h3> INGREDIENTS </h3>
        <!-- custom checkbox -->
        `;
        // TODO: get ingredient list
        // const ingredients = getIngredients(data); // use API
        // ingredients.forEach(ingredient =>{
        //     const checkbox = document.createElement("input");
        //     checkbox.type = "checkbox"l
        //     checkbox.classList.add("ingredients-custom-checkbox");
        //     const label = document.createElement("label");
        //     label.innerText = ingredient;
        //     ingredientsListDiv.appendChild(checkbox);
        //     ingredientsListDiv.appendChild(label);
        // });

        const clearButton = document.createElement("button");
        clearButton.textContent = "CLEAR CHECKBOXES";
        clearButton.onclick = "clearCheckBoxes()";
        ingredientsListDiv.appendChild(clearButton);


        // <-- instruction -->
        const instructionDiv = document.createElement("div");
        instructionDiv.classList.add("instructions");
        instructionDiv.innerHTML = `<h3> INSTRUCTIONS </h3>`;
        const list = document.createElement("ol");

        // TODO: get instructions
        // const instrucstions = getInstructions(data); // use API
        // instrucstions.forEach(element => {
        //     const li = document.createElement("li");
        //     li.innerHTML = element;
        //     list.appendChild(li);
        // });
        // instructionDiv.appendChild(list);
        mainDiv.appendChild(ingredientsListDiv);
        mainDiv.appendChild(instructionDiv);
        container.appendChild(header);
        container.appendChild(mainDiv);

        this.shadowRoot.append(style, container);
    }
}

// Define the class recipe page
customElements.define("recipe-page", RecipePage);