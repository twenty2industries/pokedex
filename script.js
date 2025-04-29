function init() {
  renderContent();
  loadAllPokemons();
}
function renderContent() {
  returnHeader();
  returnDisplays();
  returnFooter();
}

let pokeNames = "";
let pokeNumber = "";
let pokeDetails = "";

async function loadAllPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  let data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    pokeNames = data.results[i].name;
    pokeUrl = data.results[i].url; //url used with counter to count through all urls.
    pokeData = await fetch(pokeUrl); // get the data from the URL
    pokeDetails = await pokeData.json(); // show valid JSON
    const contentRef = document.getElementById("display-area");
    contentRef.innerHTML += returnDisplays(i);
  }
}
