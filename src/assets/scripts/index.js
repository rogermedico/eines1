import { getData } from './getData';
import { buildHome } from './buildHome';
import { buildCategory } from './buildCategory';
import { buildBook } from './buildBook';
import { iAmInBook, iAmInCategory, iAmInHome } from './url';

(async () => {

  const data = await getData();
  console.log(data)
  
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