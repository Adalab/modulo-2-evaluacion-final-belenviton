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
const favoriteStorage = JSON.parse(localStorage.getItem('favourites'));

//localStorage

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

  const onlyOneFavourite = disneyCharacters.findIndex(
    (character) => character.imageUrl === imgCharacters.src
  );
  if (onlyOneFavourite === -1) {
    imgCharacters.src = `https://fakeimg.pl/300x170/f0c9c9/ffffff?text=${character.name}&font=lobster`;
    //`https://via.placeholder.com/200x170/fff/555?text=${character.name}`;
  }

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
  const onlyOneFavourite = favouriteCharacters.findIndex(
    (sameIdent) => sameIdent._id === oneClickedCharacter
  );
  if (onlyOneFavourite === -1) {
    favouriteCharacters.push(oneFavourite);
  } else {
    favouriteCharacters.splice(onlyOneFavourite, 1);
  }
  localStorage.setItem('favourites', JSON.stringify(favouriteCharacters));

  renderFavourites();
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
const handleClickEnter = (event) => {
  if (event.key === 'Enter') {
    handleClickSearch();
  }
};
//EVENTOS
formHeader.addEventListener('submit', (event) => {
  event.preventDefault();
});

inputButton.addEventListener('click', handleClickSearch);
iptText.addEventListener('keyup', handleClickEnter);

//AL CARGAR LA PÁGINA
fetch('//api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    disneyCharacters = data.data;
    renderAllCharacters();
  });

if (favoriteStorage) {
  favouriteCharacters = favoriteStorage;
  renderFavourites(favouritesList);
}
