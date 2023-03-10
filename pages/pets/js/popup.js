import pets from './pets.json' assert {type: 'json'};
import { popup, popupOverlay, popupContent, popupContentInner } from "../../main/js/variables.js";

const popupImage = document.createElement('img');
const popupContainer = document.createElement('div');
const popupPetName = document.createElement('div');
const popupPetBreed = document.createElement('div');
const popupPetDescription = document.createElement('div');
const popupItems = document.createElement('ul');
popupContentInner.appendChild(popupImage).classList.add('popup__content-image');
popupContentInner.appendChild(popupContainer).classList.add('popup__container');
popupContainer.appendChild(popupPetName).classList.add('popup__container-pet-name');
popupContainer.appendChild(popupPetBreed).classList.add('popup__container-pet-breed');
popupContainer.appendChild(popupPetDescription).classList.add('popup__container-pet-description');
popupContainer.appendChild(popupItems).classList.add('popup__container-items');


export function openPopup(event) {
  pets.forEach((elem) => {
    if (event.target.id === `${elem.name}`) {
      document.body.style.overflow = 'hidden';
      popup.classList.add('popup--active');
      popupContent.classList.add('popup__content--active');
      popupOverlay.classList.add('popup__overlay--active');
      popupContentInner.classList.add('popup__content-inner--active');
      createPopup(elem);
    };
  });
};

export function resizePopup() {
  if (window.innerWidth >= 768) {
    popupImage.style.display = 'block';
  }
  if (window.innerWidth <= 767) {
    popupImage.style.display = 'none';
  };
};


function createPopup(pet) {
  popupImage.src = `${pet.img}`;
  popupPetName.innerText = `${pet.name}`;
  popupPetBreed.innerText = `${pet.type} - ${pet.breed}`;
  popupPetDescription.innerText = `${pet.description}`;
  popupItems.innerHTML =
    `<li class="popup__container-pet-item popup__container-pet-age"><p class="popup__container-pet-item-text">Age: <span>${pet.age}</span></p></li>
  <li class="popup__container-pet-item popup__container-pet-inoculation"><p class="popup__container-pet-item-text">Inoculations: <span>${pet.inoculations}</span></p></li>
  <li class="popup__container-pet-item popup__container-pet-diseases"><p class="popup__container-pet-item-text">Diseases: <span>${pet.diseases}</span></p></li>
  <li class="popup__container-pet-item popup__container-pet-parasites"><p class="popup__container-pet-item-text">Parasites: <span>${pet.parasites}</span></p></li>`
};


export function closePopup() {
  popupOverlay.classList.remove('popup__overlay--active');
  popup.classList.remove('popup--active');
  popupContent.classList.remove('popup__content--active');
  popupContentInner.classList.remove('popup__content-inner--active');
  document.body.style.overflow = '';
};