import { TOPICS, N_ELEMENTS_PAGE, CATEGORY_PAGE_NAME } from './constants';
import { BOOK_PAGE_NAME } from './constants';
import { searchToJSON } from './url';

export function buildCategory(data){

  /* Get search */
  const search = searchToJSON();

  /* check if category is correct */
  if(!Object.keys(TOPICS).includes(search.t)){ 
    window.location.href = '/';
  }
  else{
    const actualPage = pagination(data,search);
    content(data,search,actualPage);
  }

}

function content(data,search,actualPage){

  /* set title */
  document.querySelector('#title').textContent = search.t;
  
  /* set tags */
  const tags = TOPICS[search.t].split(',');
  tags.forEach(t =>{
    /* tag link */
    const tagLink = document.createElement('a');
    tagLink.setAttribute('href', '#');
    tagLink.classList.add('tag-link');
    tagLink.textContent = t;
    document.querySelector('#tags').appendChild(tagLink);

  });

  /* make books section */
  const content = document.querySelector('#content');
  const booksSection = document.createElement('div');
  booksSection.classList.add('category-books-section');
  //content.appendChild(booksSection);
  content.insertBefore(booksSection,content.childNodes[0]);

  /* add books to books section acording to actual page*/
  const firstBook = ((actualPage-1)*N_ELEMENTS_PAGE);
  const books = (data[search.t]).splice(firstBook,N_ELEMENTS_PAGE);

  for(const book in books){

    /* figure link */
    const figureLink = document.createElement('a');
    figureLink.classList.add('category-figure-link','figure-link');
    figureLink.setAttribute('href', `${BOOK_PAGE_NAME}?id=${books[book].ID}`);
    booksSection.appendChild(figureLink);

    /* figure */
    const fig = document.createElement('figure');
    fig.classList.add('category-figure');
    figureLink.appendChild(fig);

    /* img */
    const img = document.createElement('img');
    img.classList.add('category-figure-img');
    img.setAttribute('src', books[book].cover);
    img.setAttribute('alt', `${books[book].title} cover`);
    fig.appendChild(img); 

    /* figcaption */
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('category-figure-figcaption');
    figcaption.textContent = books[book].title
    fig.appendChild(figcaption);

  }
    
  /* remove loader */
  document.querySelector('#loader').remove();

}

function pagination(data,search){

  const nPages = Math.trunc(data[search.t].length/N_ELEMENTS_PAGE)+1;
  if(nPages == 1) return;
  let actualPage = 1;
  search.p = parseInt(search.p);
  if(search.p && Number.isInteger(search.p) && (search.p > 0) && (search.p <= nPages)) actualPage = search.p;
  
  /* make pagination section */
  const content = document.querySelector('#content');
  const pagSection = document.createElement('div');
  pagSection.classList.add('pagination-container');
  content.appendChild(pagSection);

  for(let i=1;i<=nPages;i++){

    /* make page link */
    const pageLink = document.createElement('a');
    pageLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${search.t}&p=${i}`);
    pageLink.classList.add('page-link','link');
    if(i==actualPage) pageLink.classList.add('active-page-link');
    pageLink.textContent = i;
    pagSection.appendChild(pageLink);
  }

  return actualPage;

}