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
      
      .header h1{
        position: relative;
        display: inline;
        font-size: 4rem;
        text-align: center;
        line-height: 5rem;
      }

      .header #bookmark{
        cursor: pointer;
        text-align: center;
        margin-left : 10px;
        z-index: 100;
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
        font-size: 1.5rem;
        font-style: italic;
      }

      #change-instr-btn-section {
        padding: 20px;
        height: 20vh;
        display: flex;
        flex-direction: row;
      }

      .change-instr-buttons {
        height: max-content;
        float:right;
        width: 50%;
        height: 100%;
        float: right;
        background: var(--primary);
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 1rem;
      }

      #prev-step-button {
        margin-right: 2vw;
      }
      #next-step-button {
        margin-left: 2vw;
      }
      
      #prev-step-button:hover,
      #next-step-button:hover {
        cursor: pointer;
        transform: scale(1.05,1.05);
        transition: all 0.3s ease-out;
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
      <main id="recipe-page-box" class="middle">
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
      <section id="tap-mode-section" > 
        <section id="change-instr-btn-section">        
          <button id="prev-step-button" class="change-instr-buttons">&lt Previous Step</button> 
          <button id="next-step-button" class="change-instr-buttons">Next Step &gt</button>    
        </section>

        <div id="tap-mode-instr"><div>
      </section >
      `;

      this.shadowRoot.querySelector(".middle > img").src = data["image"];
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
          recipePageBox.style.display = "inline";
        }
        else {
          recipePageBox.style.display = "none";
        }

      })

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


      })
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

      })



    // This displays all the instructions in numbered order for non-tap mode 
    instructions.forEach(element => {
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
        "instructions": instructions
      }
      this.json = replicateData;
    }
    get data(){
      return this.json;
    }
}

// this function is used for the tap mode when the user clicks next step or previous step
function getSingleInstr(instructions, tapModeInd) {
  const instr = instructions[tapModeInd];
  return instr;
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