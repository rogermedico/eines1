import { TOPICS } from './constants';
import { buildHome } from './buildHome';
import { getData } from './getData';

(async () => {

  const data = await getData();
  //console.log(data)
  
  if((window.location.pathname == '/') || (window.location.pathname == '/index.html')){
    buildHome(data);
  }
  else if((window.location.pathname == '/category.html') && ( Object.keys(TOPICS).includes(window.location.search.substring(1)))){
    console.log('category')
  }
  else if(window.location.pathname == '/book.html'){
    console.log('book')
  }

})();