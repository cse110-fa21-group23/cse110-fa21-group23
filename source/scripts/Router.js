// Router.js
export class Router {
    constructor(homeFunction) {
      this["home"] = homeFunction;
    }
  
    addPage(page, pageFunction) {
      this[page] = pageFunction;
    }
  
    navigate(page, statePopped) {

  
      if(!this[page]){
        console.log('Error: function does not exist');
        return;
      }
  
      let hash;
  
      if(page === "home"){
        hash = "";
      }
      else{
        hash = "#" + page;
      }
  
      if(statePopped === false && window.location.hash !== hash){
        window.history.pushState(page, "", window.location.pathname + hash); 
      }
  
      this[page].call();
  
    }
  }