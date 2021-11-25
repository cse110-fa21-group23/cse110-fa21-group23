# General Storage Structure for CookBooks

1. List of cookbooks will be store as a list: `cookbooks`

    Example:
    
        cookbooks = {"cookbook1", "cookbook2",...}

2. Each cookbook is stored as a list of ids: 

    Examples:
     
        cookbook1 = {123, 2, 3, 4}
        cookbook2 = {3, 4, 5, 6}

3. Each id is stored as an object. (add more properties as needed)

    Example:

        ID-123 = {
            "id"    : 123,
            "title" : "recipe's name", 
            "image" : "url",
            "ingredients" : [
                "onion",
                "eggs",
                "cheese"
            ],
            "instructions": [
                "boil eggs",
                "eat"
            ],
            "cookbook" : "cookbook1"
        }

Note:

- Only one unique `cookbooks` is stored.
- Each `cookbook`'s name should be unique.
- Each `cookbook` stores a list of recipes' ids - each `id` should be unique.
- Each `id` will be stored as `ID-<id-number>` - for the purpose of debugging.
