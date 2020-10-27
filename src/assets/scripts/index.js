import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import { getData } from './getData';
import { buildHome } from './buildHome';
import { buildCategory } from './buildCategory';
import { buildBook } from './buildBook';
import { iAmInBook, iAmInCategory, iAmInHome } from './url';

(async () => {

  /* get data */
  const data = await getData();
  
  /* build page */
  if(iAmInHome()){
    buildHome(data);
  }
  else if(iAmInCategory()){
    buildCategory(data);
  }
  else if(iAmInBook()){
    buildBook(data);
  }

})();