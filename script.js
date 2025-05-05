function init() {
  renderContent();
  renderPokeCards();
  ShowNames();
}

function renderContent() {
  returnHeader();
  returnFooter();
}

let displayCounter = 0;
let renderCounter = 0;
let overlayCounter = 0;

async function renderPokeCards() {
  try {
    loadingSpinner();
    const spinnerMinDuration = new Promise((resolve) => setTimeout(resolve, 2000));
    await spinnerMinDuration; // now waiting- neccessary for the spinner!!!
    await loadAllPokemons(); // after spinner is done - content loaded
    document.getElementById('pokeNameInput').addEventListener("keydown", filterNames);
    removeSpinner();
  } catch (error) {
    console.error("error:", error);
  }
}

function removeSpinner() {
  const spinnerAreaRef = document.getElementById("loading-spinner-area");
  spinnerAreaRef.innerHTML = "";
}

async function fetchPokeList() {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${renderCounter}`);
  const data = await response.json();
  return data; // return data very important so loadAllpokemons can work with const data.
}

async function fetchPokeDetails(resultDataIndex) {
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
  renderCounter += 20;
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

async function triggerMorePokemons() {
  try {
    toggleMoreButton();
    getLoadMoreIcon();
    const delay = new Promise((resolve) => setTimeout(resolve, 750));
    await delay; // now waiting 1 second - neccessary for the spinner!!!
    await loadAllPokemons(); // after spinner is done - content loaded
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

function getLoadMoreIcon() {
  const iconRef = document.getElementById("load-more-icon");
  return (iconRef.innerHTML += `<img src="assets/loadingSpinner/loadingSpinner2.gif" class="loadMoreGif">`);
}

function removeLoadMoreIcon() {
  const iconRef = document.getElementById("load-more-icon");
  return (iconRef.innerHTML = "");
}

async function fetchBigOverlayPokeList() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
  const data = await response.json();
  return data; // return data very important so loadAllpokemons can work with const data.
}

async function fetchBigOverlayPokeDetails(displayCounter) {
  const data = await fetchBigOverlayPokeList(); // definition of data (fetchpokeList) for this scope
  let pokeUrl = data.results[displayCounter].url; //url used with counter to count through all urls.
  let pokeData = await fetch(pokeUrl); // get the data from the URL
  let pokeDetails = await pokeData.json(); // parse the fetched Pokémon data
  showPokeTypeZero(pokeDetails);
  return pokeDetails;
}

async function loadAllBigOverlayPokemons(overlayCounter) {
  const data = await fetchBigOverlayPokeDetails(overlayCounter);
  const pokeName = data.name;
  const pokeDetails = data;
  const pokePng = pokeDetails.sprites.front_default;
  const pokeTypesZero = await showPokeTypeZero(pokeDetails);
  const pokeTypesOnePng = await showPokeTypeOne(pokeDetails);
  const contentRef = document.getElementById("big-overlay");
  contentRef.innerHTML = returnBigOverlay(pokeDetails.id, pokeName, pokeDetails, pokePng, pokeTypesZero, pokeTypesOnePng);
  renderAbilityNamesOverlay(pokeDetails);
  returnStatStatsNavigation(pokeDetails);
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
  if (condition !== 0) {
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

document.getElementById('content-area').addEventListener("click", closeBigOverlay);

function renderAbilityNamesOverlay(abilitiesDetails) {
  let abilityName = "";
  let weight = abilitiesDetails.weight;
  let height = abilitiesDetails.height;  
  for (let f = 0; f < abilitiesDetails.abilities.length; f++) {
    abilityName += abilitiesDetails.abilities[f].ability.name + "  ";
    returnMainStatsOverlay(abilityName, weight, height);  
  }
  returnStatsNavigation(abilityName, weight, height);// neccessary to give the argument to onclick="returnMainStatsOverlay('${abilityName}', ${weight}, ${height})"
}

async function renderStatsNamesOverlay() {
  const statsStatsOverlayRef = document.getElementById("stats-overlay-details");
  statsStatsOverlayRef.innerHTML = "";
  const data = await fetchBigOverlayPokeDetails(displayCounter);
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
  const inputRef = document.getElementById('pokeNameInput').value.toLowerCase();
  const contentRef = document.getElementById("display-area");
  contentRef.innerHTML = "";
  if (inputRef.length >= 2) {
    const filteredNames = toFilteredNames.filter(name => name.includes(inputRef));
    const allPokemons = await fetchBigOverlayPokeList();
    for (const name of filteredNames) {
      const pokeIndex = allPokemons.results.findIndex(p => p.name === name);
      if (pokeIndex !== -1) {
        const pokeUrl = allPokemons.results[pokeIndex].url;
        const response = await fetch(pokeUrl); 
        const pokeDetails = await response.json();
        const pokePng = pokeDetails.sprites.front_default;
        const pokeTypesZero = await showPokeTypeZero(pokeDetails);
        const pokeTypesOnePng = await showPokeTypeOne(pokeDetails);
        contentRef.innerHTML += returnDisplays(pokeIndex + 1, pokeDetails, name, pokePng, pokeTypesZero, pokeTypesOnePng);
        overlayCounter = 0;
      }
    }
  } else if (inputRef.length === 0) {
    contentRef.innerHTML = "";
    renderCounter = 0;
    await loadAllPokemons();
  }
}


