This file includes changes make from one another

# Recipe Page

Date: Tuesday, 11/9/2021
   
    Name: Them Dang
    - File edited: index.html, recipe-template.html, style.css, recipe-template.css, and RecipePage.js
    
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
    