# How to use LocalStorage

## Set an Item

 - To set an item, simply call the function 

   ``` 
   LocalStorage.setItem(key, value) 
   ```
 - **key**: this represents the name of the key to store the *value* in
 - **value**: the value to store inside the local storage
 - Make sure to **JSON.stringify()** the valuue before storing
 - Below is a working example:
  
  ```
    const str = JSON.stringify(['hello', 'world']);
    LocalStorage.setItem("array", str);
  ```

## Get an Item

 - To set an item, simply call the function 

   ``` 
   LocalStorage.getItem(key) 
   ```
 - **key**: the name of the key to pass in to retrive it's value.
 - Make sure to **JSON.parse()** the valuue before storing
 - Below is a working example:
  
  ```
    const arr = LocalStorage.getItem("array");;
    const parseArr = JSON.parse(arr);
  ```



# Current keys inside LocalStorage

 - dietaryRestrictions
   - This will contain the user prefered diets to filter the searches by
   - Value will be an array
   - ie) ['vegetarian', 'vegan']