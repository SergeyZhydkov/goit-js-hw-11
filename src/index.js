import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getCard } from './galleryPixabay';
import { createMarkup } from './render';
export const refs = {
  searchInput: document.querySelector('.search-input'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.loadMoreBtn.classList.add('hidden');
let page = 1;
let dataInput = '';
refs.form.addEventListener('submit', hendlerSearch);
refs.loadMoreBtn.addEventListener('click', hendlerLoadMore);

async function hendlerSearch(evt) {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('hidden');
  evt.preventDefault();

  dataInput = evt.target.searchQuery.value.trim();
  if (!dataInput) {
    Notify.info('Pleasure Input Search images...');
    evt.target.reset();
    return;
  }
  renderOnSearch();
  evt.target.reset();
}

async function renderOnSearch() {
  try {
    page = 1;
    const arreyGetCard = await getCard(dataInput, page);
    if (arreyGetCard.data.totalHits != 0) {
      Notify.success(`Hooray! We found ${arreyGetCard.data.totalHits} images.`);
      refs.loadMoreBtn.classList.remove('hidden');
    }
    if (arreyGetCard.data.totalHits < 40) {
      refs.loadMoreBtn.classList.add('hidden');
    }
    if (!arreyGetCard.data.totalHits) {
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    const arreyCard = await arreyGetCard.data.hits.map(createMarkup).join('');
    refs.gallery.insertAdjacentHTML('beforeend', await arreyCard);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

async function hendlerLoadMore() {
  page += 1;
  try {
    const resp = await getCard(dataInput, page);
    if (
      Math.ceil(resp.data.totalHits / 40) === page ||
      resp.data.totalHits < 40
    ) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.add('hidden');
    }
    const respCard = await resp.data.hits.map(createMarkup).join('');
    refs.gallery.insertAdjacentHTML('beforeend', respCard);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
});
