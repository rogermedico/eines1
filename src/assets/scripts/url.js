import { LOCATIONS } from './constants';

function extractPathname(){
  const path = window.location.pathname.split('/');
  return path[path.length-1];
}

export function iAmInHome(){
  if(LOCATIONS.home.localeCompare(extractPathname()) == 0) return true;
  else return false;
}

export function iAmInCategory(){
  if(LOCATIONS.category.localeCompare(extractPathname()) == 0) return true;
  else return false; 
}

export function iAmInBook(){
  if(LOCATIONS.book.localeCompare(extractPathname()) == 0) return true;
  else return false;
}

export function searchToJSON(){
  const search = location.search.substring(1);
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}