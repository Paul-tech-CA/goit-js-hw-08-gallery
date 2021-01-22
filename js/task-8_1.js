import galleryItems from './gallery-items.js';

let indexCurrentImage;

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  image: document.querySelector('.lightbox__image'),
  modalOpen: document.querySelector('.js-lightbox'),
  modalClose: document.querySelector('[data-action="close-lightbox"]'),
};

const createGallery = () => {
  let template = '';
  for (let i = 0; i < galleryItems.length; i++) {
    template += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${galleryItems[i].original}"
  >
    <img
      class="gallery__image"
      src="${galleryItems[i].preview}"
      data-source="${galleryItems[i].original}"
      data-index='${i}'
      alt="${galleryItems[i].description}"
    />
  </a>
</li>`;
  }
  refs.listGallery.innerHTML = template;
};

const openModal = event => {
  event.preventDefault();
  const target = event.target;
  target.dataset.source;
  if (target.nodeName !== 'IMG') return;
  refs.modalOpen.classList.add('is-open');
  refs.image.src = target.dataset.source;
  indexCurrentImage = event.target.dataset.index;
  window.addEventListener('keydown', closeModal);
  window.addEventListener('keydown', pressKey);
};

const closeModal = event => {
  event.preventDefault();
  console.log(event.code);
  const target = event.target;
  if (target.nodeName !== 'DIV' && target.nodeName !== 'BUTTON') return;
  refs.image.src = refs.image.src;
  refs.modalOpen.classList.remove('is-open');
};

const pressKey = event => {
  switch (event.code) {
    case 'Escape':
      refs.image.src = refs.image.src;
      refs.modalOpen.classList.remove('is-open');
      window.removeEventListener('keydown', closeModal);
      break;
    case 'ArrowRight':
      indexCurrentImage === galleryItems.length - 1
        ? (indexCurrentImage = 0)
        : (indexCurrentImage = parseInt(indexCurrentImage) + 1);
      refs.image.src = galleryItems[indexCurrentImage].original;
      break;
    case 'ArrowLeft':
      indexCurrentImage === 0
        ? (indexCurrentImage = galleryItems.length - 1)
        : (indexCurrentImage = parseInt(indexCurrentImage) - 1);
      refs.image.src = galleryItems[indexCurrentImage].original;
      break;
    default:
      return;
  }
};

refs.listGallery.addEventListener('click', openModal);
document.body.addEventListener('click', closeModal);
createGallery();
