'use strict';

//QUERY SELECTOR
const formHeader = document.querySelector('.js__header_form');
const principalList = document.querySelector('.js__principal_list');
const inputButton = document.querySelector('.js__input_button');
const iptText = document.querySelector('.js__input_text');
const favouritesList = document.querySelector('.js__favourites_list');
const buttonReset = document.querySelector('.js__button_reset');

//VARIABLES
let disneyCharacters = [];
let favouriteCharacters = [];
//let selectedCharacter = [];
let favouriteCard = [];

//localStorage
const favoriteStorage = JSON.parse(localStorage.getItem('favorites'));
const favoriteCardStorage = JSON.parse(localStorage.getItem('cardFav'));

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
  //crear div
  //const divButton = document.createElement ('div')
  //crear button
  const buttonClose = document.createElement('button');
  buttonClose.classList.add('button-card');
  const buttonText = document.createTextNode('X');
  buttonClose.appendChild(buttonText);
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
  liCharacters.appendChild(buttonClose);
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
  const printFavorite = () => oneCharacter.classList.toggle('favourites');
  printFavorite();
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
  renderFavourites();

  localStorage.setItem('favorites', JSON.stringify(favouriteCharacters));
  localStorage.setItem('cardFav', JSON.stringify(favouriteCharacters));
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
const handleClickReset = () => {
  localStorage.removeItem('favorites');
  favouritesList.innerHTML = '';
};
//EVENTOS
formHeader.addEventListener('submit', (event) => {
  event.preventDefault();
});

inputButton.addEventListener('click', handleClickSearch);
iptText.addEventListener('keyup', handleClickEnter);
buttonReset.addEventListener('click', handleClickReset);

//AL CARGAR LA PÁGINA
fetch('//api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    disneyCharacters = data.data;
    renderAllCharacters();
  });

// button.addEventListener('click', handleClickClose)

if (favoriteStorage) {
  favouriteCharacters = favoriteStorage;
  renderFavourites();
}

if (favoriteCardStorage) {
  favouriteCharacters === favoriteCardStorage;
}

/* const idFavourites = favouriteCharacters.find(
    (oneObjectFavourite) => oneObjectFavourite._id
  );
  const idDisney = disneyCharacters.find(
    (oneObjectCharacter) => oneObjectCharacter._id
  );
  if (idFavourites === idDisney) {
    liCharacters.classList.add('favourites'); 
  }*/
