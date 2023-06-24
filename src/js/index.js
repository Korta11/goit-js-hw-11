import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './Pixabay';
import {
  errorGet,
  infoOnRequest,
  infoCorrectRequest,
  infoEndGallery,
} from './report';
import { createMarkup } from './markup';

const elements = {
  form: document.querySelector('.search-form'),
  btnSearch: document.querySelector('button[type=submit]'),
  galleryBox: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

let totalHits;
let query = '';
let currentPage;
const resultPerPage = 40;

elements.form.addEventListener('submit', handlerForm);

async function handlerForm(event) {
  event.preventDefault();
  try {
    observer.unobserve(elements.guard);
    elements.galleryBox.innerHTML = '';

    query = event.target.searchQuery.value;
    currentPage = 1;

    const data = await fetchImages(query, currentPage, resultPerPage);
    totalHits = data.data.totalHits;

    if (!data.data.hits.length) {
      return infoOnRequest();
    }
    infoCorrectRequest(totalHits);
    const markupGalerry = createMarkup(data);
    elements.galleryBox.innerHTML = markupGalerry;
    simple.refresh();
    observer.observe(elements.guard);
  } catch (error) {
    errorGet(error);
  }
}

const simple = new SimpleLightbox('.gallery a', {
  navText: ['&#8656', '&#8658'],
  captionsData: 'alt',
  captionDelay: 250,
});

function loadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage();
    }
  });
}

async function loadImage() {
  try {
    if (currentPage >= Math.ceil(totalHits / resultPerPage)) {
      observer.unobserve(elements.guard);
      infoEndGallery();
    } else {
      currentPage += 1;
      const data = await fetchImages(query, currentPage, resultPerPage);
      elements.galleryBox.insertAdjacentHTML('beforeend', createMarkup(data));
      scroll();
      simple.refresh();
    }
  } catch (error) {
    errorGet(error);
  }
}

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};
const observer = new IntersectionObserver(loadMore, options);

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
