This file includes changes make from one another

# Recipe Page

Date: Monday, 11/8/2021
    Name: Suditi Bhatt
    -Filed edited: recipe-template.css

Date: Tuesday, 11/9/2021 - updated at 11:11 am
   
    Name: Them Dang
    - File edited: index.html, recipe-template.html, style.css, recipe-template.css, and RecipePage.js

    - Notes: need to look at the style for the ingredient list
    
    index.html:
        - moved tap mode out of <main> and added hidden class.
        - It would be better if the tap mode button is a part of the index. It is displayed only when user navigates to recipe pages.

        <div class="center-hori hidden">
            <button id="tap-mode">Tap Mode Off</button>
        </div>

    style.css:
        - added hidden class 
        - removed recipe-page style, this style will be generated in recipePage.js.

    recipe-template.css:
        - adjusted custom checkbox
        - edited bookmark:
             padding-left: 50px; -> margin-left : 50px;
             Padding extends the bookmar, margin doesn't
        - edit ingredients-list
    
    recipe-template.html:
        - removed extra <div> inside ingredients list
        - removed extra <div class="middle">

    RecipePage.js:
        - added basic structure.
    
Date: Wenesday, 11/10/2021 - updated at 4:20pm

    Name: Them Dang;
    - File edited: recipe-template.html, and RecipePage.js, scripts.js
    - Notes: 
      - Added function for clear checkboxes button and updated it on RecipePage.
      - Removed id for clear-checkboxes button - don't think it is necsessary.
      - Updated functions for tap mode and bookmark.

    Name: Suditi Bhatt
    -File edited: recipte-template.html, recipe-template.css
    -Notes:
        - Fixing clear checkboxes button.
        - Added the id for clear-checkboxes back for now to recenter it.
  

