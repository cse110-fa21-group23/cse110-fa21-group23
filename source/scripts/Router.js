// Router.js
export class Router {
    /**
     * Creates an instance of Router.
     * @param {*} homeFunction
     * @memberof Router
     */
    constructor(homeFunction) {
      this["home"] = homeFunction;
    }
  
    /**
     * Adds a page to the router
     *
     * @param {String} page the page to add
     * @param {Function} pageFunction the page function to call
     * @memberof Router
     */
    addPage(page, pageFunction) {
      this[page] = pageFunction;
    }
    
    /**
     * Navigates to the page
     *
     * @param {String} page the page to navigate to
     * @param {Boolean} statePopped whether this page has been popped
     * @return {*} no return call
     * @memberof Router
     */
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