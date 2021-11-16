// RecipePage.js

class RecipePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    const container = document.createElement("article");

    style.innerHTML = `
      .header{
        text-align: center;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center; /*centers horizontally*/
    }
    
    .header h1{
      position: relative;
      display: inline;
      font-style: normal;
      font-weight: normal;
      font-size: 4vw;
      font-style: italic;
      text-align: center;
      width: max-content;
      padding: 10px; 
    }
  
    .header #bookmark-icon{
      text-align: center;
      width: 4vw;
    }

    .middle {
      width: 80%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    .middle > div > h3{
        text-align: center;
        font-weight: bold;
        margin-top: 80px;
    }
  
    #clear-checkboxes{
      position: relative;
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
  
    #ingredients-list > ul > ol > label{
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


    this.shadowRoot.append(style, container);
  }

  set data(data) {
    if (data == null) {
      console.log("Error: no data exists");
      return;
    }

    this.shadowRoot.querySelector("article").innerHTML = `
      <section class="middle">
        <header class="header">
          <h1></h1>
            <img id="bookmark-icon" onclick="toggleBookMark(this)" src="./img/icons/bookmark-empty.svg"" width="56" height="56">
         </header>
          <h1></h1>
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
      </section>
      `;

    // Header - title

    this.shadowRoot.querySelector(".header > h1").innerHTML = data["title"];

    //get ingredient list
    const ingredients = getIngredients(data);
    ingredients.forEach((ingredient) => {
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
  }
}


// Helper functions
/**
 * Extract the ingredients from data
 * @param {Object} data JSON
 * @returns {Array} return a list of ingredients
 */
function getIngredients(data) {
  const steps = data["analyzedInstructions"][0]["steps"];
  let list = [];
  let index = 0;
  steps.forEach((step) => {
    let ingredients = step["ingredients"];
    console.log("ingredients", ingredients);
    for (let i = 0; i < ingredients.length; i++) {
      list[index++] = ingredients[i]["name"];
    }
  })
  return list;
}

/**
 * Extract the instructions from data
 * @param {Object} data JSON
 * @returns {Array} return a list of instructions
 */
function getInstructions(data) {
  const steps = data["analyzedInstructions"][0]["steps"];
  let instrucList = [];
  let index = 0;

  steps.forEach((step) => {
    let instruction = step["step"];
    instrucList[index++] = instruction;
  });

  return instrucList;
}



// Define the class recipe page
customElements.define("recipe-page", RecipePage);