function init() {
  renderPokeCards();
  ShowNames();
}

let renderCounter = 0;

async function renderPokeCards() {
  try {
    loadingSpinner();
    const spinnerMinDuration = new Promise((resolve) => setTimeout(resolve, 2000));
    await spinnerMinDuration;
    await loadAllPokemons();
    removeSpinner();
  } catch (error) {
    console.error("error:", error);
  }
}

function removeSpinner() {
  const spinnerAreaRef = document.getElementById("loading-spinner-area");
  spinnerAreaRef.innerHTML = "";
  spinnerAreaRef.classList.add('d_none');
}

async function fetchPokeList() {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${renderCounter}`);
  const data = await response.json();
  return data;
}

let loadedPokemons = {};

async function loadAllPokemons() {
  const data = await fetchPokeList();
  const contentRef = document.getElementById("display-area");
  for (let i = 0; i < data.results.length; i++) {
    const pokeName = data.results[i].name;
    const pokeUrl = data.results[i].url;
    if (!document.getElementById(pokeName)) {
      await pokeResponse(pokeUrl, pokeName, contentRef, i);
    }
  }
  renderCounter += 20;
}

async function pokeResponse(pokeUrl, pokeName, contentRef, i) {
  const pokeResponse = await fetch(pokeUrl);
  const pokeDetails = await pokeResponse.json();
  const pokePng = pokeDetails.sprites.front_default;
  const pokeTypesZero = pokeDetails.types[0]?.type.name || '';
  const pokeTypesOnePng = pokeDetails.types[1]?.type.name || '';
  const pokeCardHTML = returnDisplays(i, pokeDetails, pokeName, pokePng, pokeTypesZero, pokeTypesOnePng);
  contentRef.innerHTML += pokeCardHTML;
}

async function triggerMorePokemons() {
  try {
    toggleMoreButton();
    getLoadMoreIcon();
    const delay = new Promise((resolve) => setTimeout(resolve, 750));
    await delay; 
    await loadAllPokemons();
    removeLoadMoreIcon();
    toggleMoreButton();
  } catch (error) {
    console.error("error:", error);
  }
}

function toggleMoreButton() {
  const buttonRef = document.getElementById("load-more-button");
  buttonRef.classList.toggle("d_none");
}

function removeMoreButton() {
  const buttonRef = document.getElementById("load-more-button");
  buttonRef.classList.add("d_none");
}

function getLoadMoreIcon() {
  const iconRef = document.getElementById("load-more-icon");
  return (iconRef.innerHTML += `<img src="assets/loadingSpinner/loadingSpinner2.gif" class="loadMoreGif">`);
}

function removeLoadMoreIcon() {
  const iconRef = document.getElementById("load-more-icon");
  return (iconRef.innerHTML = "");
}

async function fetchBigOverlayPokeList() {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`);
  const data = await response.json();
  return data;
}

async function fetchBigOverlayPokeDetails(index) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
  return response.json();
}

async function loadAllBigOverlayPokemons(indexBigOverlay) {
  const pokeDetails = await fetchBigOverlayPokeDetails(indexBigOverlay);
  const pokeTypesZero = pokeDetails.types[0]?.type.name || '';
  const pokeTypesOnePng = pokeDetails.types[1]?.type.name || '';
  const contentRef = document.getElementById("big-overlay");
  contentRef.innerHTML = returnBigOverlay(pokeDetails.id, pokeDetails.name, pokeDetails, pokeDetails.sprites.front_default, pokeTypesZero, pokeTypesOnePng);
  document.getElementById('previousButton').classList.toggle('d_none', indexBigOverlay === 0);
  renderAbilityNamesOverlay(pokeDetails);
  returnStatStatsNavigation(indexBigOverlay);
  returnInfoNavigation(pokeDetails.id);
  addOverflowHidden();
}

function addOverflowHidden() {
  const bodyRef = document.getElementById('body');
  bodyRef.classList.add('hidden_overflow');
}

function removeOverflowHidden() {
  const bodyRef = document.getElementById('body');
  bodyRef.classList.remove('hidden_overflow');
}

async function loadNextOrPreviousgBigOverlayPokemons(detail) {
  const condition = detail + 1;
  if (condition > 0) {
    loadAllBigOverlayPokemons(detail);
  }   
}

function closeBigOverlay(event) {
  if (event.target.classList.contains('bigOverlay')) {
    const openOverlayRef = document.getElementById("big-overlay");
    openOverlayRef.innerHTML = "";
    removeOverflowHidden();
  }
}

function closeBigOverlayButton() {
    const openOverlayRef = document.getElementById("big-overlay");
    openOverlayRef.innerHTML = "";
    removeOverflowHidden();
}

document.getElementById('content-area').addEventListener("click", closeBigOverlay);

function renderAbilityNamesOverlay(abilitiesDetails) {
  let abilityName = "";
  let weight = abilitiesDetails.weight;
  let height = abilitiesDetails.height;  
  for (let f = 0; f < abilitiesDetails.abilities.length; f++) {
    abilityName += abilitiesDetails.abilities[f].ability.name + "  ";
    returnMainStatsOverlay(abilityName, weight, height);  
  }
  returnStatsNavigation(abilityName, weight, height);
}

async function renderStatsNamesOverlay(indexBigOverlay) {
  const statsStatsOverlayRef = document.getElementById("stats-overlay-details");
  statsStatsOverlayRef.innerHTML = "";
  const data = await fetchBigOverlayPokeDetails(indexBigOverlay);
  let pokeDetails = data.stats;
  for (let g = 0; g < pokeDetails.length; g++) {
    returnStatsStatsOverlay(pokeDetails[g].base_stat, pokeDetails[g].stat.name);
  }
}

async function renderInfoOverlay(id) {
  let speciesUrl = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  let flavorText = await speciesUrl.json();
  let englishFlavorText = flavorText.flavor_text_entries.find(entry => entry.language.name === 'en'); 
  let flavorTextInput = englishFlavorText.flavor_text;
  let cleanFlavorTextInput = flavorTextInput.replace("\f", "");
  returnInfoOverlay(cleanFlavorTextInput);
}

const toFilteredNames =[];

async function ShowNames(){
  const data = await fetchBigOverlayPokeList();
  for (let k = 0; k < data.results.length; k++) {
    const allNames = data.results[k].name;
    toFilteredNames.push(allNames);
  }
}

async function filterNames() {
  removeMoreButton();
  const inputRef = document.getElementById('pokeNameInput').value.toLowerCase();
  const contentRef = document.getElementById("display-area");
  const errorRef = document.getElementById("error-field");
  if (inputRef.length <= 2) {
    errorRef.innerHTML = `<div class="noResults">Bitte mindestens 3 Buchstaben für die Suche eingeben!</div>`;
  }
  if (inputRef.length >= 3) {
    filterAndRenderMatchingPokemons(inputRef, contentRef);
  }
}

async function renderFilteredPokemon(contentRef, allPokemons, pokeIndex, name) {
  const response = await fetch(allPokemons.results[pokeIndex].url); 
  const pokeDetails = await response.json();
  const pokeTypesZero = pokeDetails.types[0]?.type.name || '';
  const pokeTypesOnePng = pokeDetails.types[1]?.type.name || '';
  contentRef.innerHTML += returnDisplays(pokeIndex + 1, pokeDetails, name, pokeDetails.sprites.front_default, pokeTypesZero, pokeTypesOnePng);
}

async function filterAndRenderMatchingPokemons(searchInputValue, contentRef) {
  const errorRef = document.getElementById("error-field");
  const filteredNames = toFilteredNames.filter(name => name.includes(searchInputValue));
  if (filteredNames.length === 0) {
    errorRef.innerHTML = `<div class="noResults">Keine Treffer gefunden</div>`;}
  const allPokemons = await fetchBigOverlayPokeList();
  for (const name of filteredNames) {
    const pokeIndex = allPokemons.results.findIndex(p => p.name === name);
    if (pokeIndex !== -1) {
      errorRef.innerHTML = "";
      contentRef.innerHTML = "";
      renderFilteredPokemon(contentRef, allPokemons, pokeIndex, name);}}
}
