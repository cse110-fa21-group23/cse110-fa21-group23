//HELPER FUNCTIONS
/**
 * Extract needed info of all recipes fetched as an array 
 * @returns {{diets1,id1,image1,title1},{diets2,id2,image2,title2},...}
 */
 function getRecipeCardInfo(data) {
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