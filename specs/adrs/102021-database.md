# Database vs Local Storage

* Status: Accepted 
* Deciders: Kevin, Amitesh, David, Felix, Karina, Them, Christopher, Flynn, Nhi, Suditi
* Date: 10-20-2021 

## Context and Problem Statement

Faced with the choice of either a remote database such as Firebase or MongoDB, or using Local Storage for storing information concerning the user. We need to determine which storage system wil satisfy our requirements.

## Decision Drivers <!-- optional -->

* Ease of set up
* When do we need to access/use the database
* Complexity
* Experience with the specific database

## Considered Options

* Google Storage
* Local Storage
* Mongo DB

## Decision Outcome

We decided to go with Local Storage, the storage in-built into the web browser.
We selected Local Storage due to it's ease of use, it's simplicity in storing items, and avoidance of connecting/setting up database for our project.

### Pros of Local Storage <!-- optional -->

* Able to easily and quickly access his favorited recipes
* Able to instantly use LocalStorage, no set up required
* Store any item for a long period of time until the user clears his storage.
* Does not require Async

### Cons of Local Storage <!-- optional -->

* User not able to add recipes
* User not able to write reviews or rate recipes

