//HELPER FUNCTIONS
/**
 * Extract needed info of all recipes fetched as an array 
 * 
 * @param {Object} data the data of the recipe card
 * @returns {Object} {{diets1,id1,image1,title1},{diets2,id2,image2,title2},...}
 */
 function getRecipeCardInfo(data) {
  if(data === null || data === undefined) return [];
  const recipes = [];
  for (let i = 0; i < data.length; i++) {
      const result = {};
      result["id"] = data[i]["id"];
      result["title"] = data[i]["title"];
      result["image"] = data[i]["image"];
      result["diets"] = data[i]["diets"];
      recipes[i] = result;
  }
  return recipes;
}

module.exports = getRecipeCardInfo;