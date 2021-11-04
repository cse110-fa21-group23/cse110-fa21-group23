# Date: November 3, 2021
# Group 23 Discuss first sprint
# Attendance: Kevin, Amitesh, David, Felix, Karina, Christopher, Suditi, Nhi, Them

- Go over Miro board for week 6 sprint 
- Determine the API to use for the website
- Settling with Edamam API 
	- https://developer.edamam.com/edamam-docs-recipe-api
	- requires an APP_ID and APP_KEY, created from logging in and signing up

## Tasks to complete: 
 - the search functionality
	- Work on the search bar, the recipe card for the results, and the filter tags
	- the results will load on the same page the search bar is on
	- Work with API 
	- 3 tasks within
		- Category cards (JS & HTML) (refers to the cuisine types, check Figma for more clarity) 
		- Search/Load search results from API 
		- Recipe Cards (HTML and JS)  
 - Settings
	- The side drawer for the navbar of the page
 - The individual recipe pages
	- Display the information regarding the specific recipe
	- Tasks within
	- Basic HTML layout to render content regarding ingredients, steps, recipe name, etc 
 - The recipe list for individual lists
	- The HTMl/Js logic for the saved lists of the individual user
	- Task
		- Design the html layout for when user accesses the saved recipe list page
		- Implement logic to add to a specified list 
## Busy schedules: 
- Update the group if schedule gets busy so we are aware of what feature to expect delays on
- There is no major issues with delays, just be sure to inform us
- Don’t be afraid to ask for help, we are a team for a reason

## Coding Style:  
 - Comment, Comment, Comment code
	- Provide function comments, comments for logic in algorithms that may become confusing
	- Don’t overdo it though
 - meaningful variable names (ie. recipeList vs arr)
 - meaningful function name (ie. getAllRecipes vs fetchItems)
 - HTML class/id: use dashes, all lowercase (ie. recipe-list-div)
	- Class=”recipe-list-div”
	- id=”recipe-list-div”	
 - Comment portions  of HTML
	- Don’t comment every tag, but the outermost tag for a specific part of the code.
	- Comment should inform what the section is for (ie. “This is the recipe card”)
	- camel case variable (ie. findRecipesList) for JS

## Pull Requests:
 - Have two people look at PRs before any merging
	- Post the PR in the slack channel
	- Must get 2 thumbs up from 2 different individuals
 - Provide a description inside your PR so it informs people what you did 
 - PR names should of the following: w[week number]-[summary of task with dashes between]
	- Example: w6-recipe-cards
	- Example: w7-search-functionality

## Tasks for week 6: 

### Amitesh & Felix: The search/loading results from API
### Kevin & David: Recipe Cards (HTML & JS)
### Them & Suditi: Individual recipe page (HTML layout)
### Chris & Flynn: Recipe list for individual recipes (HTML & JS)
### Karina: Category cards (Both JS & HTML)
### Nhi: Setting/Sidebar, CSS styling and focus for mobile rendering
	
