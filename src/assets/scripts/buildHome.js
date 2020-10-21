import { HOME_BOOKS_NUMBER, CATEGORY_PAGE_NAME, BOOK_PAGE_NAME } from './constants';

export function buildHome(data){

	for (const topic in data){

		/* sublist of books to show in home */
		const books = data[topic].slice(0,HOME_BOOKS_NUMBER);

		/* Section contaienr */
		const sectionContainer = document.createElement('div');
		sectionContainer.classList.add('section-container');
		document.querySelector('#content').appendChild(sectionContainer);

		/* Section title */
		const h3 = document.createElement('h3');
		h3.classList.add('subtitle-2');
		sectionContainer.appendChild(h3);

		/* Title link */
		const titleLink = document.createElement('a');
		titleLink.textContent = topic;
		titleLink.classList.add('link');
		titleLink.setAttribute('href', `${CATEGORY_PAGE_NAME}?t=${topic}`);
		h3.appendChild(titleLink);

		/* Books container */
		const booksSection = document.createElement('div');
		booksSection.classList.add('home-books-section');
		sectionContainer.appendChild(booksSection);
		
		for(const book in books){

			/* figure link */
			const figureLink = document.createElement('a');
			figureLink.classList.add('figure-link',`home-figure-${book}`);
			figureLink.setAttribute('href', `${BOOK_PAGE_NAME}?id=${books[book].ID}`);
			booksSection.appendChild(figureLink);

			/* figure */
			const fig = document.createElement('figure');
			fig.classList.add('home-figure');
			figureLink.appendChild(fig);

			/* img */
			const img = document.createElement('img');
			img.classList.add('home-figure-img');
			img.setAttribute('src', books[book].cover);
			img.setAttribute('alt', `${books[book].title} cover`);
			fig.appendChild(img); 

			/* figcaption */
			const figcaption = document.createElement('figcaption');
			figcaption.classList.add('home-figure-figcaption');
			figcaption.textContent = books[book].title
			fig.appendChild(figcaption);

		}

		/* footer links */
		const footerLinkContainer = document.querySelector('#footer-links');
		const footerLinkDiv = document.createElement('div');
		footerLinkDiv.classList.add('footer-link-container');
		footerLinkContainer.appendChild(footerLinkDiv);
		const footerLink = titleLink.cloneNode(true);
		footerLinkDiv.appendChild(footerLink);

	}

		/* remove loader */
		document.querySelector('#loader').remove();

}