'use strict';

//QUERY SELECTOR
const formHeader = document.querySelector('.js__header_form');
const principalList = document.querySelector('.js__principal_list');

//VARIABLES
let disneyCharacters = [];
let favouriteCharacters = [];

//FUNCIONES
const createList = (character) => {
  //crear li
  const liCharacters = document.createElement('li');
  liCharacters.classList.add('card');
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
};

const renderAllCharacters = () => {
  for (const character of disneyCharacters) {
    createList(character);
  }
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
    renderAllCharacters();
    console.log(disneyCharacters);
  });
