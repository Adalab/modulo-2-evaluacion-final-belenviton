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
let completLi = principalList.children;

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

const createFavourites = (character) => {
  //crear li
  const liCharacters = document.createElement('li');

  liCharacters.classList.add('favourites');
  liCharacters.setAttribute('data-ident', `${character._id}`);

  //crear img
  const imgCharacters = document.createElement('img');
  imgCharacters.classList.add('card-image');
  imgCharacters.src = `${character.imageUrl}`;
  imgCharacters.alt = `${character.name}`;
  imgCharacters.title = `Add character to favourites`;
  //crear h3
  const nameCharacters = document.createElement('h3');
  const cardName = document.createTextNode(`${character.name}`);
  nameCharacters.appendChild(cardName);
  nameCharacters.classList.add('card-name');
  //UL
  favouritesList.appendChild(liCharacters);
  liCharacters.appendChild(imgCharacters);
  liCharacters.appendChild(nameCharacters);
};

const renderAllCharacters = () => {
  for (const character of disneyCharacters) {
    createList(character);
  }
};

const renderFavourites = () => {
  for (const character of favouriteCharacters) {
    createFavourites(character);
  }
};
// FUNCIONES HANDLE

const handleClickCard = (event) => {
  const oneCharacter = event.currentTarget;
  oneCharacter.classList.toggle('favourites');
  favouriteCharacters.push(oneCharacter);
  renderFavourites();

  console.log(oneCharacter);
};
//EVENTOS
formHeader.addEventListener('submit', (event) => {
  event.preventDefault();
});

//AL CARGAR LA PÁGINA
fetch('//api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    disneyCharacters = data.data;
    favouriteCharacters = data.data;
    renderAllCharacters();
    console.log(disneyCharacters);
  });

//siguiente paso

/* const handleClickSearch = () => { 

fetch('//api.disneyapi.dev/character')
.then((response) => response.json())
.then((data) => {
  selectedCharacter = data.name
  selectedCharacter = api.disneyapi.dev/character?name=${iptText.value}
  renderOnlySearch();
})};
inputButton.addEventListener('click', handleClickSearch); */
