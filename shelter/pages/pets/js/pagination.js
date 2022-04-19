import { paginationContainer, maxPrevBtnPagination, maxNextBtnPagination, prevBtnPagination, nextBtnPagination, numberPagination, popupOverlay, popupBtn } from '../../main/js/variables.js';
import { openPopup, closePopup, resizePopup } from './popup.js';

let section = 8;
let maxColumn = 48;
let number = 1;
const pagination = maxColumn / section;
export const columns = paginationContainer.children;


fetch('./js/pets.json')
  .then(res => res.json())
  .then(parse => {
    return parse.map((elem) => {
      return elem;
    })
  })
  .then(data => {
    repeatData(data);
    createColumns(data);
    showColumns(data);

    prevBtnPagination.addEventListener('click', function () {
      number--;
      showColumns();
      check();
    });

    nextBtnPagination.addEventListener('click', function () {
      number++;
      showColumns();
      check();
    });

    maxPrevBtnPagination.addEventListener('click', function () {
      number = 1;
      check();
      showColumns();
    })

    maxNextBtnPagination.addEventListener('click', function () {
      number = pagination;
      check();
      showColumns();
    });

    [...columns].forEach((elem) => elem.addEventListener('click', openPopup));
    popupOverlay.addEventListener('click', closePopup);
    popupBtn.addEventListener('click', closePopup);
    window.addEventListener('resize', () => resizePopup());
  });


function repeatData(data) {
  const repeatedData = [].concat.apply([], Array(6).fill(data));
  return repeatedData;
};

export function splitData(data) {
  const repeatedData = repeatData(data);
  const chunkSize = 8;
  const splitedData = [];

  for (let i = 0; i < repeatedData.length; i += chunkSize) {
    const chunk = repeatedData.slice(i, i + chunkSize);
    splitedData.push(chunk);
  }
  return splitedData;
}

function getRandom(data) {
  const splitedData = splitData(data);
  const randomPets = splitedData.map((elem) => {
    return elem.sort(() => Math.random() > 0.5 ? 1 : -1)
  });
  return randomPets;
};

export function createColumns(data) {
  const pets = getRandom(data);
  pets.forEach((elem) => {
    elem.forEach((pet) => {
      const column = document.createElement('div');
      const columnItem = document.createElement('div');
      const columnImage = document.createElement('div');
      const columnPetName = document.createElement('div');
      const columnBtn = document.createElement('button');
      column.className = 'our-friends__column';
      columnItem.className = 'our-friends__column-item';
      columnImage.className = 'our-friends__column-image';
      columnPetName.className = 'our-friends__column-pets-name';
      columnBtn.className = 'our-friends__column-button';
      paginationContainer.append(column);
      column.prepend(columnItem);
      columnItem.appendChild(columnImage);
      columnItem.appendChild(columnPetName);
      columnItem.appendChild(columnBtn);
      const array = [column, columnItem, columnImage, columnPetName, columnBtn];
      array.forEach((elem) => elem.classList.add(`${pet.name}`));
      columnImage.style.backgroundImage = `url(${pet.img})`;
      columnPetName.textContent = `${pet.name}`;
      columnBtn.textContent = 'Learn more';
    });
    showColumns(pets);
  });
};


export function showColumns() {

  for (let i = 0; i < columns.length; i++) {
    columns[i].classList.remove('our-friends__column--show');
    columns[i].classList.add('our-friends__column--hidden');

    if (i >= (number * section) - section && i < number * section) {
      columns[i].classList.add('our-friends__column--show');
      columns[i].classList.remove('our-friends__column--hidden');
    }
    numberPagination.innerHTML = number;
  };
  return columns;
};

function check() {
  if (number === pagination) {
    nextBtnPagination.setAttribute("disabled", "disabled");
    maxNextBtnPagination.setAttribute("disabled", "disabled");
  } else {
    nextBtnPagination.removeAttribute("disabled", "disabled");
    maxNextBtnPagination.removeAttribute("disabled", "disabled");
  }
  if (number <= 1) {
    prevBtnPagination.setAttribute("disabled", "disabled");
    maxPrevBtnPagination.setAttribute("disabled", "disabled");
  } else {
    prevBtnPagination.removeAttribute("disabled", "disabled");
    maxPrevBtnPagination.removeAttribute("disabled", "disabled");
  }
};