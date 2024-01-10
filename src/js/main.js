'use strict';

//QUERY SELECTOR
const formHeader = document.querySelector('.js__header_form');
const principalList = document.querySelector('.js__principal_list');
const inputButton = document.querySelector('.js__input_button');
const iptText = document.querySelector('.js__input_text');
const favouritesList = document.querySelector('.js__favourites_list');

//VARIABLES
let disneyCharacters = [];
let favouriteCharacters = [];
let selectedCharacter = [];

//let allList = completLi.children;

//FUNCIONES
const createList = (character) => {
  //crear li
  const liCharacters = document.createElement('li');
  liCharacters.classList.add('card');
  liCharacters.setAttribute('data-ident', `${character._id}`);

  //crear img
  const imgCharacters = document.createElement('img');
  imgCharacters.classList.add('card-image');
  imgCharacters.src = `${character.imageUrl}`;

  /*const printImage = disneyCharacters.findIndex((character) => {
    if (character.imageUrl === -1) {
      imgCharacters.src = `https://via.placeholder.com/200x170/ff/666/?text=${character.name}`;
    } else {
      
    }
  });*/

  imgCharacters.alt = `${character.name}`;
  imgCharacters.title = `Add character to favourites`;
  //crear h3
  const nameCharacters = document.createElement('h3');
  const cardName = document.createTextNode(`${character.name}`);
  nameCharacters.appendChild(cardName);
  nameCharacters.classList.add('card-name');
  //UL
  principalList.appendChild(liCharacters);
  liCharacters.appendChild(imgCharacters);
  liCharacters.appendChild(nameCharacters);
  liCharacters.addEventListener('click', handleClickCard);
};

const createFavourites = (description) => {
  //crear li
  const liCharacters = document.createElement('li');

  liCharacters.classList.add('favourites-cards');
  liCharacters.setAttribute('data-ident', `${description._id}`);

  //crear img
  const imgCharacters = document.createElement('img');
  imgCharacters.classList.add('card-image');

  imgCharacters.src = `${description.imageUrl}`;
  imgCharacters.alt = `${description.name}`;
  imgCharacters.title = `Favourite-card`;
  //crear h3
  const nameCharacters = document.createElement('h3');
  const cardName = document.createTextNode(`${description.name}`);
  nameCharacters.appendChild(cardName);
  nameCharacters.classList.add('card-name');
  //UL
  favouritesList.appendChild(liCharacters);
  liCharacters.appendChild(imgCharacters);
  liCharacters.appendChild(nameCharacters);
};

const renderAllCharacters = () => {
  principalList.innerHTML = '';
  for (const character of disneyCharacters) {
    createList(character);
  }
};

const renderFavourites = () => {
  favouritesList.innerHTML = '';
  for (const description of favouriteCharacters) {
    createFavourites(description);
  }
};

// FUNCIONES HANDLE

const handleClickCard = (event) => {
  const oneCharacter = event.currentTarget;
  oneCharacter.classList.toggle('favourites');

  const oneClickedCharacter = parseInt(oneCharacter.dataset.ident);
  const oneFavourite = disneyCharacters.find(
    (oneObjectCharacter) => oneObjectCharacter._id === oneClickedCharacter
  );
  favouriteCharacters.push(oneFavourite);
  renderFavourites();
  console.log(oneClickedCharacter);
  console.log(disneyCharacters);
  console.log(oneCharacter);
  console.log(favouriteCharacters);
  console.log(oneFavourite);
};

const handleClickSearch = () => {
  let inputValue = iptText.value;
  let inputTextPrint = inputValue.replace(/ /g, '%20');
  fetch(`//api.disneyapi.dev/character?name=${inputTextPrint}`)
    .then((response) => response.json())
    .then((data) => {
      disneyCharacters = data.data;

      renderAllCharacters();
    });
};
//EVENTOS
formHeader.addEventListener('submit', (event) => {
  event.preventDefault();
});

inputButton.addEventListener('click', handleClickSearch);

//AL CARGAR LA PÁGINA
fetch('//api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    disneyCharacters = data.data;
    renderAllCharacters();
    disneyCharacters.indexOf((images) => {
      if (images.imageUrl === -1) {
        imgCharacters.src = `https://via.placeholder.com/200x170/ff/666/?text=${character.name}`;
      }
    });
  });
