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
        width: 70%;
        margin: auto;
      }

      .share-icons {
        display: flex;
        text-align: center; 
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
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

      @media (max-width: 750px) {
        .header h1{
          font-size: min(10vw, 2rem);
          letter-spacing: -1px;
          line-height: max(1px, 2rem);
        }
        .header #bookmark{
          height: max(10vw, 10px);
        }
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
        #instructions {
          width: auto;
        }
        
        .middle{
          display: block;
          text-align: center; 
          width: 50%;
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

      #tap-mode-section {
        display: flex;
        flex-direction: column;
      }
      #tap-mode-instr{
        font-size: 2rem;
        font-style: italic;
        padding-right: 5rem;
        padding-left: 5rem;
        padding-bottom: 2rem;
      }

      #change-instr-btn-section {
        padding: 20px;
        height: fit-content;
        display: flex;
        flex-direction: row;
        width: 50%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }

      .change-instr-buttons {
        height: max-content;
        float:right;
        width: 50%;
        height: 10vh;
        float: right;
        background: var(--primary);
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 1rem;
      }

      .hidden {
        display: none;
      }

      #prev-step-button {
        margin-right: 2vw;
        font-weight: bold;
      }
      #next-step-button {
        margin-left: 2vw;
        font-weight: bold;

      }
      
      #prev-step-button:hover,
      #next-step-button:hover {
        cursor: pointer;
        transform: scale(1.01,1.01);
        transition: all 0.1s ease-in;
      }

      @media print {
        .noprint {
           visibility: hidden;
        }
      }

      `;

    container.innerHTML = `
      <header class="header">
        <h1 id="recipe-title"></h1>
        <img id="bookmark" onclick="showCookBookMenu()" src="img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56">
      </header>
      <div class="edit-recipe hidden">
        <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
      </div>
      <div class="share-icons noprint">
        <img id="print" onclick="printRecipe()" src="./img/icons/print-icon.svg" name="print-icon" width="36" height="36">
        <img id="email" onclick="emailRecipe()" src="./img/icons/email-icon.svg" name="email-icon" width="36" height="36">
      </div>
      <main class="middle">
        <img style="display: block; margin-left: auto; margin-right: auto;">
          <div id="ingredients-list">
              <h3>INGREDIENTS</h3>
              <ul style="list-style-type: none;" id="recipe-ingredients" >
              </ul>
              <button id="clear-checkboxes" onclick="clearCheckBoxes()">CLEAR CHECKBOXES</button>
          </div>
          <div id="instructions">
              <h3>INSTRUCTIONS</h3>
              <ol id="recipe-instructions">
              </ol>
          </div>
      </main>
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
        <img id="bookmark" class="noprint" onclick="showCookBookMenu()" src="./img/icons/bookmark-empty.svg" name="bookmark-empty" width="56" height="56">
        <h2></h2>
        </header>
      <div class="edit-recipe hidden">
        <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
      </div>
      <div class="share-icons noprint">
        <img id="print" onclick="printRecipe()" src="./img/icons/print-icon.svg" name="print-icon" width="36" height="36">
        <img id="email" onclick="emailRecipe()" src="./img/icons/email-icon.svg" name="email-icon" width="36" height="36">
      </div>
      <main id="recipe-page-box" class="middle">
        <img style="display: block; margin-left: auto; margin-right: auto;" >
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
      <section id="tap-mode-section" > 
        <div id="tap-mode-instr"></div>
        <section id="change-instr-btn-section">        
          <button id="prev-step-button" class="change-instr-buttons">&larr; Previous Step</button> 
          <button id="next-step-button" class="change-instr-buttons">Next Step &rarr;</button>    
        </section>

        
      </section >
      `;
    // TODO: move instructions on top of buttons instead

    this.shadowRoot.querySelector(".middle > img").src = data["image"];
    this.shadowRoot.querySelector(".header > h1").innerHTML = data["title"];
    this.shadowRoot.querySelector(".header > h2").textContent = "Serving Size: " + data["servings"];

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
    // For tap mode, display one instruction at a time

    const instructions = getInstructions(data);
    const instructionSize = instructions.length;

    var tapModeInd = 0;
    const instr = getSingleInstr(instructions, tapModeInd);

    const tapModeInstr = this.shadowRoot.getElementById("tap-mode-instr");
    const recipePageBox = this.shadowRoot.getElementById("recipe-page-box");
    const tapModeSection = this.shadowRoot.getElementById("tap-mode-section");
    tapModeSection.style.display = "none"; //by default, tap mode is off/hidden
    tapModeInstr.innerHTML = instr;

    document.getElementById("tap-mode-button").addEventListener("click", () => {
      tapModeSection.style.visibility = $tapModeVisibility;
      tapModeSection.style.display = null;
      if ($tapModeVisibility == "hidden") {
        recipePageBox.style.display = "block";
        tapModeSection.style.display = "none";
      }
      else {
        recipePageBox.style.display = "none";

      }
    });

    this.shadowRoot.getElementById("prev-step-button").addEventListener("click", () => {
      if (tapModeInd == 0) {
        console.log("you're on the first step already!");
        return;
      }
      else {
        tapModeInd--;
        const instr = getSingleInstr(instructions, tapModeInd);
        tapModeInstr.innerHTML = instr;
      }
    });

    this.shadowRoot.getElementById("next-step-button").addEventListener("click", () => {
      if (tapModeInd >= instructionSize - 1) {
        console.log("You've reached the end of the recipe!");
        return;
      }
      else {
        tapModeInd++;
        const instr = getSingleInstr(instructions, tapModeInd);
        tapModeInstr.innerHTML = instr;
      }
    });

    // This displays all the instructions in numbered order for non-tap mode 
    instructions.forEach(element => {
      const li = document.createElement("li");
      li.innerHTML = element;
      this.shadowRoot.querySelector("#instructions > ol").appendChild(li);
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

/**
 * Used for the tap mode when the user clicks next step or previous step
 *
 * @param {Array} instructions An array of instructions to send to tap mode
 * @param {Number} tapModeInd The index of the tap mode
 * @return {String} The instruction to show to tap mode
 */
function getSingleInstr(instructions, tapModeInd) {
  const instr = instructions[tapModeInd];
  const instructionNum = tapModeInd + 1;
  return instructionNum + ".  " + instr;
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

export { getInstructions, getIngredients };


// Define the class recipe page
customElements.define("recipe-page", RecipePage);