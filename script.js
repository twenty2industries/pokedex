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
let pokePngs = "";
let pokeTypesZero = "";
let pokeTypesOne = "";
let pokeTypesOnePng = "";
let pokeTypeZeroPng = "";

async function loadAllPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  let data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    pokeNames = data.results[i].name;
    let pokeUrl = data.results[i].url; //url used with counter to count through all urls.
    let pokeData = await fetch(pokeUrl); // get the data from the URL
    pokeDetails = await pokeData.json(); // parse the fetched Pokémon data
    pokePngs =  pokeDetails.sprites.front_default; // pokemon pictures

    pokeTypesOne = pokeDetails.types[1]?.type?.url || ""; // if got value then define else empty string, variable now ready to fetch get
    let pokeTypeOneUrlData = await fetch(pokeTypesOne);
    pokeTypesOnePng = await pokeTypeOneUrlData.text();
    console.log(pokeTypesOne);
    

    //fetch url for type pngs 

    let pokeTypeZeroUrl = pokeDetails.types[0].type.url; // url type pngs 
    let pokeTypeZeroUrlData = await fetch(pokeTypeZeroUrl); // get data from url
    pokeTypeZeroPng = await pokeTypeZeroUrlData.json(); // define data in variable pokeTypeZero
    pokeTypesZero = pokeTypeZeroPng.sprites['generation-iii']['xd'].name_icon; //type name zero
    const contentRef = document.getElementById("display-area");
    contentRef.innerHTML += returnDisplays(i);
  }
}


//key = sprites for pngs 
