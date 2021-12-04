// RecipePage.js

class RecipePage extends HTMLElement {

  /**
   * Creates an instance of RecipePage.
   * @memberof RecipePage
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const container = document.createElement("article");

    style.innerHTML = `
      .header{
        display: block;
        text-align: center; 
        margin: auto;
        width: 80vw;
        max-width: 550px;
        margin-top: 10px;
      }

      .share-icons {
        display: flex;
        text-align: center; 
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      #print {
        margin-right: 50px;
      }

      #print:hover, #email:hover {
        cursor: pointer;
      }
      
      .header h1{
        position: relative;
        display: inline;
        font-size: min(10vw, 2rem);
        text-align: center;
        line-height: max(1px, 1rem);
      }

      .header #bookmark{
        cursor: pointer;
        text-align: center;
        margin-left: min(0.5vw, 10px);
        z-index: 100;
        width: min(30px, 2rem);
        height: fit-content;
      }

      #bookmark:hover{
        transform: scale(1.05,1.05);
        transition: all 0.3s ease-out;
      }

      @media (min-width: 750px) {      
        .middle{
          display: grid;
          grid-template-columns: auto auto; 
          width: 70%;
          margin: auto;
        }
      }

      .edit-recipe {
        padding: 1em;
        display: grid;
        place-items: center;
      }
      
      .edit-recipe > span:hover {
        cursor: pointer;
        color: #FF9E44;
      }
    
      .middle > div > h3{
          text-align: center;
          font-weight: bold;
          margin-top: 30px;
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
        width: 100%;
        display: inline-block; 
        text-align: left;
      }
      
      #instructions > h3 {
        text-align: center;
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

      .right {
        position: fixed;
        top: 0%;
        left: 55%;
        width: 45%;
        height: 100vh;
      }

      .left {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 45%;
        height: 100vh;
      }
      
      .left:hover, .right:hover{
        cursor: pointer;
      }

      #right-arrow {
        position: absolute;
        right: 5vw;
        top: 50%;
        font-size: 2rem;
      }

      #left-arrow {
        position: absolute;
        left: 5vw;
        top: 50%;
        font-size: 2rem;
      }

      #content{
        font-size: 1rem;
        margin: auto;
        text-align: center;
        overflow: hidden;
        margin: 0px 50px;
      }

      #alert {
        color: red;
        font-size: 1rem;
        margin: auto;
        text-align: center;
        overflow: hidden;
      }

      @media (min-width: 750px) {
        #content, #alert{
          font-size: 2rem;
          padding: 0 20%;
        }
      }

      .hidden {
        display: none;
      }
      @media print {
        .noprint {
           visibility: hidden;
        }
      }

      #tap-mode-section {
        width: 100vw;
        position: relative; 
        left: 50%;
        transform: translateX(-50%);
      }
      

    `;

    container.innerHTML = `
    <header class="header">
      <h1 id="recipe-title"></h1>
      <img id="bookmark" class="noprint" onclick="showCookBookMenu()" src="./img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56" title="click to save this recipe">
    </header>
    <div class="edit-recipe hidden">
      <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
    </div>
    <div class="share-icons noprint">
      <img id="print" onclick="printRecipe()" src="./img/icons/print-icon.svg" name="print-icon" width="36" height="36">
      <img id="email" onclick="emailRecipe()" src="./img/icons/email-icon.svg" name="email-icon" width="36" height="36">
    </div>
    
    <div class="dish-image">
      <img style="display: block; margin-left: auto; margin-right: auto;" >
    </div>
    
    <main id="recipe-page-box" class="middle"> 
        <div id="ingredients-list">
            <h3>INGREDIENTS</h3>
            <ul style="list-style-type: none;" id="recipe-ingredients">
            </ul>
            <button id="clear-checkboxes" onclick="clearCheckBoxes()" class="noprint">CLEAR CHECKBOXES</button>
        </div>
        <div id="instructions">
            <h3>INSTRUCTIONS</h3>   
            <ol id="recipe-instructions">
            </ol>
        </div>
    </main>
    <div id="tap-mode-section" class="hidden noprint">
      <div id="content"></div>
      <div id="alert"></div>
      <div onclick="next()" class="right"></div>
      <div onclick="previous()" class="left"></div>
    </div>
    `;

    this.shadowRoot.append(style, container);
  }

  set data(data) {
    if (data == null) {
      console.log("Error: no data exists");
      return;
    }

    this.shadowRoot.querySelector("article").innerHTML = `
      <header class="header">
        <h1 id="recipe-title"></h1>
        <img id="bookmark" class="noprint" onclick="showCookBookMenu()" src="./img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56" title="click to save this recipe">
      </header>
      <div class="edit-recipe hidden">
        <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
      </div>
      <div class="share-icons noprint">
        <img id="print" onclick="printRecipe()" src="./img/icons/print-icon.svg" name="print-icon" width="36" height="36">
        <img id="email" onclick="emailRecipe()" src="./img/icons/email-icon.svg" name="email-icon" width="36" height="36">
      </div>
      
      <div class="dish-image">
        <img style="display: block; margin-left: auto; margin-right: auto;" >
      </div>
      
      <main id="recipe-page-box" class="middle"> 
          <div id="ingredients-list">
              <h3>INGREDIENTS</h3>
              <ul style="list-style-type: none;" id="recipe-ingredients">
              </ul>
              <button id="clear-checkboxes" onclick="clearCheckBoxes()" class="noprint">CLEAR CHECKBOXES</button>
          </div>
          <div id="instructions">
              <h3>INSTRUCTIONS</h3>   
              <ol id="recipe-instructions">
              </ol>
          </div>
      </main>
      <div id="tap-mode-section" class="noprint" style="display:none">
        <div id="alert"> </div>
        <div id="content"></div>
        <div class="left"></div>
        <div id="left-arrow">&#60;</div>
        <div id="right-arrow">&#62;</div>
        <div class="right"></div>        
      </div>
      `;

    this.shadowRoot.querySelector(".dish-image > img").src = data["image"];
    this.shadowRoot.querySelector(".header > h1").innerHTML = data["title"];

    //get ingredient list
    const ingredients = getIngredients(data);
    ingredients.forEach(ingredient => {
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
    const instructions = getInstructions(data);
    instructions.forEach(element => {
      const li = document.createElement("li");
      li.innerHTML = element;
      this.shadowRoot.querySelector("#instructions > ol").appendChild(li);
    });

    // <-- tap mode section -->
    tapMode();
    let index = 0;
    let instr = this.shadowRoot.querySelector("#content");
    let alert = this.shadowRoot.querySelector("#alert");
    instr.innerHTML = `${index + 1}. ` + instructions[index];
    this.shadowRoot.querySelector(".right").addEventListener("click", () => {
      alert.innerHTML = "";
      if (index !== instructions.length - 1)
        index++;
      else
        alert.innerHTML = "You've reached the end of the instructions!";

      instr.innerHTML = `${index + 1}. ` + instructions[index];
    });

    this.shadowRoot.querySelector(".left").addEventListener("click", () => {
      alert.innerHTML = "";
      if (index !== 0)
        index--;
      else
        alert.innerHTML = "You've reached the first instruction!";
      instr.innerHTML = `${index + 1}. ` + instructions[index];
    });

    // replicate data
    const replicateData = {
      "id": data["id"],
      "title": data["title"],
      "image": data["image"],
      "ingredients": ingredients,
      "instructions": instructions
    }
    this.json = replicateData;
  }
  get data() {
    return this.json;
  }
}

// Helper functions
/**
 * Extract the ingredients from data
 * @param {Object} data JSON
 * @returns {Array} return a list of ingredients
 */
function getIngredients(data) {
  const extendedIngredients = data["extendedIngredients"];
  // called from cookbook
  if (extendedIngredients == null || extendedIngredients == undefined) { return data["ingredients"]; }
  let list = [];
  let index = 0;
  extendedIngredients.forEach((ingredien) => {
    list[index++] = ingredien["originalString"];
  })
  return list;
}

/**
 * Extract the instructions from data
 * @param {Object} data JSON
 * @returns {Array} return a list of instructions
 */
function getInstructions(data) {
  let steps = [];
  try {
    steps = data["analyzedInstructions"][0]["steps"]; // Data from API
  } catch {
    return data["instructions"]; // Data from Local Storage
  }
  let instrucList = [];
  let index = 0;

  steps.forEach((step) => {
    let instruction = step["step"];
    instrucList[index++] = instruction;
  });
  return instrucList;
}

/**
 * This function enables tap-mode
 */
function tapMode() {
  const TapModeSection = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#tap-mode-section");
  const RecipePageBox = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#recipe-page-box");
  const DishImage = document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("article > div.dish-image");
  document.getElementById("tap-mode-button").addEventListener("click", () => {
    if (TapModeSection.style.display == "none") {
      TapModeSection.style.display = null;
      RecipePageBox.classList.add("hidden");
      DishImage.classList.add("hidden");
    }
    else {
      TapModeSection.style.display = "none";
      RecipePageBox.classList.remove("hidden");
      DishImage.classList.remove("hidden");
    }

  });
}

export { getInstructions, getIngredients };


// Define the class recipe page
customElements.define("recipe-page", RecipePage);