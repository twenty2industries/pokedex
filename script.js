function init() {
  renderContent();
  loadAllPokemons();
}
function renderContent() {
  returnHeader();
  returnDisplays();
  returnFooter();
}

let pokeData = ""; 

async function loadAllPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  let data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    pokeData = data.results[i].name;
    console.log(data.results[i].name);
    const contentRef = document.getElementById('display-area');
    contentRef.innerHTML += returnDisplays(i);
  }
} 