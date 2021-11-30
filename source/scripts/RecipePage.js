// RecipePage.js

class RecipePage extends HTMLElement{

    /**
     * Creates an instance of RecipePage.
     * @memberof RecipePage
     */
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

      .hidden {
        display: none;
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
      <div class="edit-recipe hidden">
        <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
      </div>
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
        <h2></h2>
      </header>
      <div class="edit-recipe hidden">
        <span onclick="load()">Edit <img src="./img/icons/pencil.svg" alt="pencil" width="20" height="20"> </span>
      </div>
      <main id="recipe-page-box" class="middle">
        <img style="display: block; margin-left: auto; margin-right: auto;" >
          <div id="ingredients-list">
              <h3>INGREDIENTS</h3>
              <h4>Scale Recipe: </h4>
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
      this.shadowRoot.querySelector(".header > h2").textContent = "Serving Size: " + data["servings"];

      //TODO: Ingredients scaling input
      var scaleSize = 1;
      let scaleBox = document.createElement("input");
      scaleBox.type = "number";
      scaleBox.min = 1;
      scaleBox.placeholder = "Min: 1, Max: 10";
      scaleBox.onchange = checkScale;
      this.shadowRoot.querySelector("#ingredients-list > h4").appendChild(scaleBox);

      /**
       * Find the GCF of two numbers
       *
       * @param {Number} a
       * @param {Number} b
       * @return {Number} The GCF of a and b
       */
      function gcfFunc(a,b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {let temp = a; a = b; b = temp;}
        while (true) {
          if (b == 0) {
            return a;
          }
          a %= b;
          if (a == 0) {
            return b;
          }
          b %= a;
        }
      }

      var numIngrs = 1;
      /**
       * Checks the scaling value and updates ingredient list appropriately
       */
      function checkScale() {
        //Initialize arrays to hold ingredients
        let allIngredients = JSON.parse(localStorage.getItem("ingrArray"));
        let ingrArray = [];

        scaleSize = scaleBox.value;

        //Go back to default
        if(scaleSize == 1) {
          return;
        }

        //document.querySelector("#recipe-page-container > recipe-page").shadowRoot.querySelector("#ingredient-element-"+(i+1)).innerText;

        let ingredients = document.querySelector("#recipe-page-container > recipe-page")
                          .shadowRoot.querySelectorAll("#ingredients-list > ul > ol > label");
        var gcf = 1;  //hold the GCF of possible fraction numerator and denominator
        var findNum = /\d+/g;
        for(let n = 0; n < allIngredients.length; n++) {
          let newIngr = "";
          ingrArray = allIngredients[n].split(" ");
          for(let i = 0; i < ingrArray.length; i++) {
            let fracIndex = ingrArray[i].indexOf("/");   //find index of potential fraction

            //If substring is already a mixed function
            if(i < ingrArray.length-2 && ingrArray[i+1].indexOf("/") > 0 && ingrArray[i+1].indexOf("/") < ingrArray[i+1].length - 1 && !isNaN(ingrArray[i+1].at(ingrArray[i+1].indexOf("/") - 1)) && !isNaN(ingrArray[i+1].at(ingrArray[i+1].indexOf("/") + 1))) {
              let wholeNum = ingrArray[i] * scaleSize;

              fracIndex = ingrArray[i+1].indexOf("/");
              let numerator = ingrArray[i+1].at(fracIndex-1) * scaleSize;
              let denominator = ingrArray[i+1].at(fracIndex+1);

              //If numerator is greater than denominator (create mixed function)
              if(numerator > denominator) {
                wholeNum += parseInt(numerator/denominator);
                
                //If fraction can be simplified
                if(denominator % (numerator%denominator) == 0) {
                  gcf = gcfFunc(denominator, numerator%denominator);
                }
                newIngr += wholeNum + " " + ((numerator%denominator)/gcf) + "/" + (denominator/gcf) + " ";
              }
              //If numerator is same as denominator, convert to 1
              else if(denominator / numerator == 1) {
                newIngr += wholeNum + 1 + " ";
              }
              //Else, simplify the fraction if possible
              else {
                gcf = gcfFunc(numerator, denominator);
                newIngr += wholeNum + " " + (numerator/gcf) + "/" + (denominator/gcf) + " ";
              }

              i++;
            }
            //If substring is a number
            else if(!isNaN(ingrArray[i])) {
              newIngr += scaleSize * ingrArray[i] + " ";
            }
            //If substring is a fraction number
            else if(fracIndex > 0 && fracIndex < ingrArray[i].length - 1 && !isNaN(ingrArray[i].at(fracIndex - 1)) && !isNaN(ingrArray[i].at(fracIndex + 1))) {
              let numerator = ingrArray[i].at(fracIndex - 1) * scaleSize;
              let denominator = ingrArray[i].at(fracIndex + 1);

              //If numerator is greater than denominator (created mixed fraction)
              if(numerator > denominator) {
                let wholeNum = parseInt(numerator/denominator);

                //If fraction can be simplified
                if(denominator % (numerator%denominator) == 0) {
                  gcf = gcfFunc(denominator, numerator%denominator);
                }
                newIngr += wholeNum + " " + ((numerator%denominator)/gcf) + "/" + (denominator/gcf) + " ";
              }
              //If numerator is same as denominator, convert to 1
              else if(denominator / numerator == 1) {
                newIngr += "1 ";
              }
              //Else, simplify the fraction if possible
              else {
                gcf = gcfFunc(numerator, denominator);
                newIngr += (numerator/gcf) + "/" + (denominator/gcf) + " ";
              }
            }
            //If the substring is a mix of number and word. EX: 5oz
            //else if(ingrArray[i].match(findNum)) {

          // }
            else {
              newIngr += ingrArray[i] + " ";
            }
          }

          ingredients[n].innerText = newIngr;
        }
      }

      //get ingredient list
      const ingredients = getIngredients(data);
      let ingrArrayIndex = 0;
      let localIngrArray = [];
      ingredients.forEach(ingredient => {
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        label.id = "ingredient-element-" + numIngrs;
        numIngrs++;
        const ol = document.createElement("ol");
        checkbox.type = "checkbox";
        checkbox.classList.add("ingredients-custom-checkbox");

        label.innerText = ingredient;
        localIngrArray[ingrArrayIndex] = ingredient;
        ingrArrayIndex++;
        ol.appendChild(checkbox);
        ol.appendChild(label);
        this.shadowRoot.querySelector("#ingredients-list > ul").appendChild(ol);
      });

      localStorage.setItem("ingrArray", JSON.stringify(localIngrArray));

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

/**
 * Used for the tap mode when the user clicks next step or previous step
 *
 * @param {Array} instructions An array of instructions to send to tap mode
 * @param {Number} tapModeInd The index of the tap mode
 * @return {String} The instruction to show to tap mode
 */
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
  let steps = [];
  try { 
    steps = data["analyzedInstructions"][0]["steps"]; // Data from API
  } catch {
    return data["instructions"]; // Data from Local Storage
  }
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