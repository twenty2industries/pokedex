function init() {
  renderContent();
  renderPokeCards();
}

function renderContent() {
  returnHeader();
  returnFooter();
}

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
  showPokeTypeZero(pokeDetails)
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
  }
}

async function showPokeTypeOne(details) {
  const typeInfo = details.types[1]
    ? await (await fetch(details.types[1].type.url)).json()
    : undefined; // if got value then define else empty string, variable now ready to fetch get
  const typeIcon = typeInfo
    ? typeInfo.sprites["generation-iii"]?.["xd"]?.name_icon
    : ""; // : '' solved an error :undefined occures to be an error in the dom
  return typeIcon;
}

async function showPokeTypeZero(details) {
  let pokeTypeZeroUrl = details.types[0].type.url;
  let pokeTypeZeroUrlData = await fetch(pokeTypeZeroUrl);
  let pokeTypeZeroPng = await pokeTypeZeroUrlData.json();
  return pokeTypeZeroPng.sprites["generation-iii"]["xd"].name_icon;
}

function loadingSpinner() {
  const spinnerAreaRef = document.getElementById('loading-spinner-area');
  spinnerAreaRef.innerHTML += `      <div class="loadingSpinner">
        <img
          src="assets/loadingSpinner/loadingSpinner.gif"
          class="loadingSpinnerGif"
        />
      </div>`;
}

function removeSpinner() {
  const spinnerAreaRef = document.getElementById('loading-spinner-area');
  spinnerAreaRef.innerHTML = "";
}