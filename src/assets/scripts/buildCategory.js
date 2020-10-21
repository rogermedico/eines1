import { TOPICS } from './constants';
import { BOOK_PAGE_NAME } from './constants';
import { searchToJSON } from './url';

export function buildCategory(data){

  /* Get search */
  const search = searchToJSON();

  /* check if category is correct */
  if(!Object.keys(TOPICS).includes(search.t)) window.location.href = '/';

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
  content.appendChild(booksSection);

  /* add all books to books section */
  const books = data[search.t];
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