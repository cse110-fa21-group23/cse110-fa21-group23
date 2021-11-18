// Router.js
export class Router {
    static routes = {};
  
    constructor(homeFunction) {
      this["home"] = homeFunction;
    }
  
    addPage(page, pageFunction) {
      this[page] = pageFunction;
    }
  
    navigate(page, statePopped) {
      console.log(`navigating to: ${page}`);
  
      if(!this[page]){
        console.log('Error: function does not exist');
        return;
      }
  
      let hash;
  
      if(page == "home"){
        hash = "";
        window.location = window.location.origin + window.location.pathname
      }
      else{
        hash = "#" + page;
      }
  
      if(statePopped == false && window.location.hash != hash){
        window.history.pushState(page, "", window.location + hash); 
      }
  
      this[page].call();
  
    }
  }