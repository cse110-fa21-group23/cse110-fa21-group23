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
  
      var hash;
  
      if(page == 'home'){
          console.log('home')
        hash = '';
      }
      else{
        hash = '#' + page;
      }
  
      if(statePopped == false && window.location.hash != hash){
        window.history.pushState(page, '', window.location.origin + hash); 
      }
  
      this[page].call();
  
    }
  }