import { LOCATIONS } from './constants';

export function iAmInHome(){
  if(LOCATIONS.home.includes(window.location.pathname)) return true;
  else return false;
}

export function iAmInCategory(){
  if(LOCATIONS.category.includes(window.location.pathname)) return true;
  else return false; 
}

export function iAmInBook(){
  if(LOCATIONS.book.includes(window.location.pathname)) return true;
  else return false;
}

export function searchToJSON(){
  const search = location.search.substring(1);
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}