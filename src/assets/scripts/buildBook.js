import { TOPICS, N_ELEMENTS_PAGE, CATEGORY_PAGE_NAME, BOOK_PAGE_NAME } from './constants';
import { buildFooter } from './buildFooter';
import { searchToJSON } from './url';

function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function buildBook(data){

  /* Get search */
  const search = searchToJSON();

  /* search for the book */
  let allBooks = [];
  let book = {};
  Object.values(data).forEach(topic => allBooks = allBooks.concat(topic));
  book = allBooks.find(b => b.ID === search.id);

  /* check if book is correct */
  if(!book){ 
    window.location.href = '/';
  }
  else{
    /* build content book info */
    content(book);
    
    /* build footer links */
		buildFooter(data);
  }

}

function content(book){

  /* set title */
  document.querySelector('#title').textContent = book.title;

  /* cover */
  const cover = document.createElement('img');
  cover.setAttribute('src',book.cover);
  cover.setAttribute('alt',`${book.cover} cover`);
  cover.classList.add('book-cover-img');
  document.querySelector('#cover').appendChild(cover);
  
  /* book details */
  const detailsSection = document.querySelector('#content');

  /* author */
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('book-details-container');
  const authorLegend = document.createElement('div');
  authorLegend.classList.add('book-details-legend');
  authorLegend.textContent = 'Author';
  authorContainer.appendChild(authorLegend);
  const author = document.createElement('div');
  author.classList.add('book-details-value');
  author.textContent = book.author;
  authorContainer.appendChild(author);
  detailsSection.appendChild(authorContainer);

  /* publisher */
  const publisherContainer = document.createElement('div');
  publisherContainer.classList.add('book-details-container');
  const publisherLegend = document.createElement('div');
  publisherLegend.classList.add('book-details-legend');
  publisherLegend.textContent = 'Publisher';
  publisherContainer.appendChild(publisherLegend);
  const publisher = document.createElement('div');
  publisher.classList.add('book-details-value');
  publisher.textContent = book.publisher;
  publisherContainer.appendChild(publisher);
  detailsSection.appendChild(publisherContainer);

  /* year */
  const yearContainer = document.createElement('div');
  yearContainer.classList.add('book-details-container');
  const yearLegend = document.createElement('div');
  yearLegend.classList.add('book-details-legend');
  yearLegend.textContent = 'Year';
  yearContainer.appendChild(yearLegend);
  const year = document.createElement('div');
  year.classList.add('book-details-value');
  year.textContent = book.publisher_date;
  yearContainer.appendChild(year);
  detailsSection.appendChild(yearContainer);

  /* language */
  const languageContainer = document.createElement('div');
  languageContainer.classList.add('book-details-container');
  const languageLegend = document.createElement('div');
  languageLegend.classList.add('book-details-legend');
  languageLegend.textContent = 'Language';
  languageContainer.appendChild(languageLegend);
  const language = document.createElement('div');
  language.classList.add('book-details-value');
  language.textContent = book.language;
  languageContainer.appendChild(language);
  detailsSection.appendChild(languageContainer);

  /* pages */
  const pagesContainer = document.createElement('div');
  pagesContainer.classList.add('book-details-container');
  const pagesLegend = document.createElement('div');
  pagesLegend.classList.add('book-details-legend');
  pagesLegend.textContent = 'Pages';
  pagesContainer.appendChild(pagesLegend);
  const pages = document.createElement('div');
  pages.classList.add('book-details-value');
  pages.textContent = book.pages;
  pagesContainer.appendChild(pages);
  detailsSection.appendChild(pagesContainer);

  /* content */
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('book-details-container');
  const contentLegend = document.createElement('div');
  contentLegend.classList.add('book-details-legend');
  contentLegend.textContent = 'Content';
  contentContainer.appendChild(contentLegend);
  const content = document.createElement('div');
  content.classList.add('book-details-value');
  content.textContent = decodeHtml(book.content_short);
  contentContainer.appendChild(content);
  detailsSection.appendChild(contentContainer);

  /* tags */
  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('book-details-container');
  const tagsLegend = document.createElement('div');
  tagsLegend.classList.add('book-details-legend');
  tagsLegend.textContent = 'Tags';
  tagsContainer.appendChild(tagsLegend);
  const tags = document.createElement('div');
  tags.classList.add('book-details-value');
  book.tags.forEach(t =>{
    /* tag link */
    const tagLink = document.createElement('a');
    tagLink.setAttribute('href', '#');
    tagLink.classList.add('link');
    tagLink.textContent = t.name;
    tags.appendChild(tagLink);
    const separator = document.createTextNode(', ');
    tags.appendChild(separator);
  });
  tags.removeChild(tags.lastChild);
  tagsContainer.appendChild(tags);
  detailsSection.appendChild(tagsContainer);

  /* categories */
  const categoriesContainer = document.createElement('div');
  categoriesContainer.classList.add('book-details-container');
  const categoriesLegend = document.createElement('div');
  categoriesLegend.classList.add('book-details-legend');
  categoriesLegend.textContent = 'Categories';
  categoriesContainer.appendChild(categoriesLegend);
  const categories = document.createElement('div');
  categories.classList.add('book-details-value');
  book.categories.forEach(c =>{
    /* categories link */
    const categoriesLink = document.createElement('a');
    categoriesLink.setAttribute('href', '#');
    categoriesLink.classList.add('link');
    categoriesLink.textContent = c.name;
    categories.appendChild(categoriesLink);
    const separator = document.createTextNode(', ');
    categories.appendChild(separator);
  });
  categories.removeChild(categories.lastChild);
  categoriesContainer.appendChild(categories);
  detailsSection.appendChild(categoriesContainer);
    
  /* download link */
  const downloadContainer = document.createElement('div');
  downloadContainer.classList.add('book-download-link');
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', book.url_download);
  downloadLink.classList.add('download-book-link');
  downloadContainer.appendChild(downloadLink);
  const downloadIcon = document.createElement('i');
  downloadIcon.classList.add('fas', 'fa-download','download-icon');
  const downloadText = document.createTextNode('Download Book');
  downloadLink.appendChild(downloadIcon);
  downloadLink.appendChild(downloadText);
  detailsSection.appendChild(downloadContainer);

  /* remove loader */
  document.querySelector('#loader').remove();

}