function init() {
  renderContent();
  renderPokeCards();
}

function renderContent() {
  returnHeader();
  returnFooter();
}

const loadButton = true;
let displayCounter = 0; // neccesary to open big overlay after the count of 30 

async function renderPokeCards() {
  try {
      loadingSpinner()
      const delay = new Promise(resolve => setTimeout(resolve, 3000));
      await delay; // now waiting 1 second - neccessary for the spinner!!!
      removeSpinner()
      await loadAllPokemons(); // after spinner is done - content loaded 
  } catch (error) {
      console.error("error:", error);
  }     
}

function removeSpinner() {
  const spinnerAreaRef = document.getElementById('loading-spinner-area');
  spinnerAreaRef.innerHTML = "";
}

async function fetchPokeList() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  const data = await response.json();
  return data; // return data very important so loadAllpokemons can work with const data. 
}

async function fetchPokeDetails (resultDataIndex) {
  const data = await fetchPokeList(); // definition of data (fetchpokeList) for this scope
  let pokeUrl = data.results[resultDataIndex].url; //url used with counter to count through all urls.
  let pokeData = await fetch(pokeUrl); // get the data from the URL
  let pokeDetails = await pokeData.json(); // parse the fetched Pokémon data
  showPokeTypeZero(pokeDetails);
  return pokeDetails;
}

async function loadAllPokemons() {
  const data = await fetchPokeList();
  for (let i = 0; i < data.results.length; i++) {
    const pokeName = data.results[i].name;
    const pokeDetails = await fetchPokeDetails(i);
    const pokePng = pokeDetails.sprites.front_default;
    const pokeTypesZero = await showPokeTypeZero(pokeDetails);
    const pokeTypesOnePng = await showPokeTypeOne(pokeDetails);
    const contentRef = document.getElementById("display-area");
    contentRef.innerHTML += returnDisplays(i, pokeDetails, pokeName, pokePng, pokeTypesZero, pokeTypesOnePng);
    displayCounter++;
  }
}

async function showPokeTypeOne(details) {
  const typeInfo = details.types[1]
    ? await (await fetch(details.types[1].type.url)).json()
    : undefined; // if got value then define else empty string, variable now ready to fetch get
  const typeIcon = typeInfo
    ? typeInfo.sprites["generation-vii"]?.["sun-moon"]?.name_icon
    : ""; // : '' solved an error :undefined occures to be an error in the dom
  return typeIcon;
}

async function showPokeTypeZero(details) {
  let pokeTypeZeroUrl = details.types[0].type.url;
  let pokeTypeZeroUrlData = await fetch(pokeTypeZeroUrl);
  let pokeTypeZeroPng = await pokeTypeZeroUrlData.json();
  return pokeTypeZeroPng.sprites["generation-vii"]["sun-moon"].name_icon;
}


async function fetchPokeSecondList() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
  );
  const data = await response.json();
  return data; // return data very important so loadAllpokemons can work with const data.
}

async function fetchPokeSecondDetails(secondResultDataIndex) {
  const data = await fetchPokeSecondList(secondResultDataIndex); // definition of data (fetchpokeList) for this scope
  let pokeUrl = data.results[secondResultDataIndex].url; //url used with counter to count through all urls/
  let pokeData = await fetch(pokeUrl); // get the data from the URL
  let pokeDetails = await pokeData.json(); // parse the fetched Pokémon data */
  return pokeDetails;
}

async function triggerMorePokemons() {
  try {
    removeMoreButton();
    getLoadMoreIcon();
    const delay = new Promise((resolve) => setTimeout(resolve, 3000));
    await delay; // now waiting 1 second - neccessary for the spinner!!!
    removeLoadMoreIcon();
    await loadMorePokemons(); // after spinner is done - content loaded
  } catch (error) {}
}

async function loadMorePokemons() {
  if (loadButton == true) {
    const data = await fetchPokeSecondList();
    for (let i = 0; i < data.results.length; i++) {
      const pokeName = data.results[i].name;
      const pokeDetails = await fetchPokeSecondDetails(i);
      const pokePng = pokeDetails.sprites.front_default;
      const pokeTypesZero = await showMorePokeTypeZero(pokeDetails);
      const pokeTypesOnePng = await showPokeTypeOne(pokeDetails);
      const contentRef = document.getElementById("display-area");
      contentRef.innerHTML += returnMoreDisplays(i, pokeName, pokeDetails, pokePng, pokeTypesZero, pokeTypesOnePng);
      displayCounter++;
    }
    loadButton = false;
  }
}

async function showMorePokeTypeZero(details) {
  let pokeTypeZeroUrl = details.types[0].type.url;
  let pokeTypeZeroUrlData = await fetch(pokeTypeZeroUrl);
  let pokeTypeZeroPng = await pokeTypeZeroUrlData.json();
  return pokeTypeZeroPng.sprites["generation-vii"]["sun-moon"].name_icon;
}

async function showMorePokeTypeOne(details) {
  const typeInfo = details.types[1]
    ? await (await fetch(details.types[1].type.url)).json()
    : undefined; // if got value then define else empty string, variable now ready to fetch get
  const typeIcon = typeInfo
    ? typeInfo.sprites["generation-vii"]?.["sun-moon"]?.name_icon
    : ""; // : '' solved an error :undefined occures to be an error in the dom
  return typeIcon;
}

function removeMoreButton() {
  const buttonRef = document.getElementById('load-more-button');
  buttonRef.classList.add('d_none');
}

function getLoadMoreIcon() {
  const iconRef = document.getElementById('load-more-icon');
  return iconRef.innerHTML += `<img src="assets/loadingSpinner/loadingSpinner2.gif" class="loadMoreGif">`;
}

function removeLoadMoreIcon() {
  const iconRef = document.getElementById('load-more-icon');
  return iconRef.innerHTML = "";
}

async function fetchBigOverlayPokeList() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0");
  const data = await response.json();
  return data; // return data very important so loadAllpokemons can work with const data. 
}

async function fetchBigOverlayPokeDetails (resultDataIndex) {
  const data = await fetchBigOverlayPokeList(); // definition of data (fetchpokeList) for this scope
  let pokeUrl = data.results[resultDataIndex].url; //url used with counter to count through all urls.
  let pokeData = await fetch(pokeUrl); // get the data from the URL
  let pokeDetails = await pokeData.json(); // parse the fetched Pokémon data
  showPokeTypeZero(pokeDetails);
  return pokeDetails;
}

async function loadAllBigOverlayPokemons(index) {
  const data = await fetchBigOverlayPokeDetails(index); // Hier bekommst du bereits die Details eines Pokémon

  const pokeName = data.name;
  const pokeDetails = data;
  const pokePng = pokeDetails.sprites.front_default;
  const pokeTypesZero = await showPokeTypeZero(pokeDetails);
  const pokeTypesOnePng = await showPokeTypeOne(pokeDetails);
  const contentRef = document.getElementById("big-overlay");

  contentRef.innerHTML = returnBigOverlay(index, pokeName, pokeDetails, pokePng, pokeTypesZero, pokeTypesOnePng);
}

function selectBigOverlay(index) {
  const overlayRef = document.getElementById("big-overlay");
  openBigOverlay(index);
}

function openBigOverlay() {
  const openOverlayRef = document.getElementById("big-overlay");
  openOverlayRef.innerHTML += returnBigOverlay();
}


function closeBigOverlay() {
    const openOverlayRef = document.getElementById("big-overlay");
  return openOverlayRef.innerHTML = "";
}

