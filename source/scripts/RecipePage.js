// RecipePage.js

class RecipePage extends HTMLElement{
    constructor(){
      super();
      this.attachShadow({mode: "open"});
      
      const style = document.createElement("style");
      const container = document.createElement("article");

      style.innerHTML = `
      .header{
        display: block;
        text-align: center; 
        width: 70%;
        margin: auto;
      }
      
      @media screen and (min-width: 1200px) {
        .header h1{
            position: relative;
            display: inline;
            font-style: normal;
            font-weight: normal;
            font-size: 64px;
            line-height: 96px;
            text-align: center;
        }
      }

      @media screen and (max-width: 1199px) {
        .header h1{
          position: relative;
          display: inline;
          font-style: normal;
          font-weight: normal;
          font-size: 34px;
          line-height: 80px;
          text-align: center;
        }
      }

      .header #bookmark{
        cursor: pointer;
        text-align: center;
        margin-left : 10px;
        z-index: 100;
      }

      .middle{
        display: block;
        text-align: center;
        width: 50%;
        margin: auto;
      }
    
      .middle > div > h3{
          text-align: center;
          font-weight: bold;
          margin-top: 10px;
      }
    
      #clear-checkboxes{
        display: block;
        margin: auto;
        color: var(--primary);
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
    
      #ingredients-list > ul > ol > label{
        color: black;
      }
      /*-----------------------------------*/
      
      #instructions{
        width: auto;
        display: inline-block; 
        text-align: left;
      }
      
      #instructions > ol > li{
        color: black;
      }
      
      #ingredients-list{
        font-style: normal;
        font-weight: normal;
      }
      
      #ingredients-list > ul{
        width: auto;
        display: inline-block; 
        text-align: left;
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

      container.innerHTML = `
      <header class="header">
        <h1></h1>
        <img id="bookmark" onclick="showCookBookMenu()" src="img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56">
      </header>
      <main class="middle">
        <img style="display: block; margin-left: auto; margin-right: auto;">
          <div id="ingredients-list">
              <h3>INGREDIENTS</h3>
              <ul style="list-style-type: none;">
              </ul>
              <button id="clear-checkboxes" onclick="clearCheckBoxes()">CLEAR CHECKBOXES</button>
          </div>
          <div id="instructions">
              <h3>INSTRUCTIONS</h3>   
              <ol>
              </ol>
          </div>
      </main>
      `;

      this.shadowRoot.append(style, container);
    }

    set data(data){
        if (data == null)
        {
            console.log("Error: no data exists");
            return;
        }

      this.shadowRoot.querySelector("article").innerHTML = `
      <header class="header">
        <h1></h1>
        <img id="bookmark" onclick="showCookBookMenu()" src="./img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56">
      </header>
      <main class="middle">
        <img style="display: block; margin-left: auto; margin-right: auto;" >
          <div id="ingredients-list">
              <h3>INGREDIENTS</h3>
              <ul style="list-style-type: none;">
              </ul>
              <button id="clear-checkboxes" onclick="clearCheckBoxes()">CLEAR CHECKBOXES</button>
          </div>
          <div id="instructions">
              <h3>INSTRUCTIONS</h3>   
              <ol>
              </ol>
          </div>
      </main>
      `;

        // Header - title
        this.shadowRoot.querySelector(".middle > img").src= data["image"];
        this.shadowRoot.querySelector(".header > h1").innerHTML = data["title"];

        //get ingredient list
        const ingredients = getIngredients(data);
        ingredients.forEach(ingredient =>{
            const checkbox = document.createElement("input");
            const label = document.createElement("label");
            const ol = document.createElement("ol");
            checkbox.type = "checkbox";
            checkbox.classList.add("ingredients-custom-checkbox");
            label.innerText = ingredient;
            ol.appendChild(checkbox);
            ol.appendChild(label);
            this.shadowRoot.querySelector("#ingredients-list > ul").appendChild(ol);
        });

        // <-- instruction -->
        const instrucstions = getInstructions(data);
        instrucstions.forEach(element => {
            const li = document.createElement("li");
            li.innerHTML = element;
            this.shadowRoot.querySelector("#instructions > ol").appendChild(li);
        });

        // replicate data
        const replicateData = {
          "id"    : data["id"],
          "title" : data["title"],
          "image" : data["image"],
          "ingredients" : ingredients,
          "instructions": instrucstions
        }
        this.json = replicateData;
    }
    get data(){
      return this.json;
    }
}


// Helper functions
/**
 * Extract the ingredients from data
 * @param {Object} data JSON
 * @returns {Array} return a list of ingredients
 */
// let LIST_INGREDIENTS = {};
function getIngredients(data){
  const extendedIngredients =  data["extendedIngredients"];
  // called from cookbook
  if (extendedIngredients == null || extendedIngredients == undefined) { return data["ingredients"]; }
  let list = [];
  let index = 0;
  extendedIngredients.forEach((ingredien) =>{
    list[index++] = ingredien["originalString"];
  })
  return list;
}

/**
 * Extract the instructions from data
 * @param {Object} data JSON
 * @returns {Array} return a list of instructions
 */
function getInstructions(data){
  const steps = data["analyzedInstructions"][0]["steps"];
  // called from cookbook
  if (steps == null || steps == undefined) { return data["instructions"]; }
  let instrucList = [];
  let index = 0;

  steps.forEach((step) =>{
      let instruction = step["step"];
      instrucList[index++] = instruction;
  });

  return instrucList;
}



// Define the class recipe page
customElements.define("recipe-page", RecipePage);