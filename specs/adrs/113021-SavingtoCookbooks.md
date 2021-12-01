# Saving to Cookbooks Feature

* Status: Accepted
* Deciders: Kevin, Amitesh, David, Felix, Karina, Them, Christopher, Flynn, Nhi, Suditi
* Date: 11-30-2021

## Context and Problem Statement

We wanted to provided our users with a way to save specific recipes to a cookbook. We needed to figure out how our web application would enable users to categorize their saved recipes into lists that can be updated and easily accessed.

## Decision Drivers <!-- optional -->

* Ease of implementation
* Ability to provide a user-friendly interface for this feature
  
## Considered Options

* Arrays for lists
* Different JavaScript collections to represent cookbooks
* JavaScript event listeners
* Local storage

## Decision Outcome
We decided to implement arrays to save recipes to cookbooks. Cookbooks are represented by arrays and recipes are added to local storage based on event listeners as users use our web application.

