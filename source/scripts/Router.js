// Router.js
export class Router {
    static routes = {};
  
    constructor(homeFunc) {
      this['home'] = homeFunc;
    }
  
    addPage(page, pageFunc) {
      this[page] = pageFunc;
    }
  
    navigate(page, statePopped) {
      console.log(`navigate() function called, requested page: ${page}`);
  
      if(!this[page]){
        console.log('Error: function does not exist');
        return;
      }

  
      var hash = (page == "home")? "" : `#${page}`;
  
      if (!statePopped && window.location.hash != hash)
      {
        history.pushState(page, "", window.location + hash);
        console.log("Push  " + window.location);
      }
      this[page]();
  
    }
  }