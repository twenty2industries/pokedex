function loadingSpinner() {
  const spinnerAreaRef = document.getElementById("loading-spinner-area");
  spinnerAreaRef.innerHTML += `      <div class="loadingSpinner">
        <img
          src="assets/loadingSpinner/loadingSpinner.gif"
          class="loadingSpinnerGif"
        />
      </div>`;
}

function returnHeader() {
  const headerRef = document.getElementById("header-area");
  headerRef.innerHTML += `       <div class="headerArea">
      <img src="assets/logo/logo1.png" class="logo" />
      <input class="input" type="text" placeholder="search " />
    </div> `;
}

function returnDisplays(index, details, name, image, typeZero, typeOneImg) {
  return `<div id="display-${details.id}" onclick="loadAllBigOverlayPokemons(${displayCounter})" class="displays">
          <div id="pokemon-name-area-${details.id}" class="pokemonNameArea">
            <div id="pokemon-number-${details.id}" class="pokemonNumber"># ${
    details.id
  }</div>
            <div id="pokemon-name-${details.id}" class="pokemonName">${name.toUpperCase()}</div>
          </div>
          <div id="pokemon-picture-area-${details.id}" class="pokemonPictureArea ${
    details.types[0].type.name
  }" >
          <img class="pokemonImage" src="${image}">
          </div>
          <div id="element-info-area-${details.id}" class="elementInfoArea">
            <img class="pokeTypeInfo" src="${typeZero}">
            <img class="pokeTypeInfo" src="${typeOneImg}">
          </div>
        </div>`;
}


//big-overlay id by details.id is not neccessary, no need for mupltiple ids on the big overlay. only 1 display at a time
function returnBigOverlay(index, name, details, image, typeZero, typeOneImg) {
  return `<div class="bigOverlay">
  <div class="buttonDiv"><button class="loadMoreButtonOverlay ${
    details.types[0].type.name
  }" onclick="closeBigOverlay()">x</button></div>
  <div id="display-big-area" class="displayBigArea">
    <div id="display-0${details.id}" class="displaysBig">
      <div id="pokemon-name-area-0${details.id}" class="pokemonNameAreaBig">
        <div id="pokemon-number-0${details.id}" class="pokemonNumber"># ${
    details.id
  }</div>
        <div id="pokemon-name-0${details.id}" class="pokemonName">${name.toUpperCase()}</div>
        </div>
      <div id="pokemon-picture-area-0${details.id}" class="pokemonPictureAreaOverlay ${
    details.types[0].type.name
  }" >
      <img class="pokemonImageBig" src="${image}">
      </div>
      <div id="element-info-area-0${details.id}" class="elementInfoAreaBig">
        <img class="pokeTypeInfoBig" src="${typeZero}">
        <img class="pokeTypeInfoBig" src="${typeOneImg}">
      </div>
              <div class="statsOverlay ${
                details.types[0].type.name
              }" id="stats-overlay">
              </div>
              <div class="statsOverlayDetails" id="stats-overlay-details"></div>
    </div>
  </div>
</div>`;
}

function returnFooter() {
  const footerRef = document.getElementById("footer-area");
  footerRef.innerHTML += `<img class="logoFooter" src="assets/logo/logoFooter.png"/>
`;
}

function returnStatsNavigation(abilityName, weight, height) {
  const statsNavRef = document.getElementById('stats-overlay')
  return statsNavRef.innerHTML += `<span class="mainStat" id="main-stats" onclick="returnMainStatsOverlay('${abilityName}', ${weight}, ${height})">MAIN</span>`;
}

function returnStatStatsNavigation(statName) {
  const statsNavRef = document.getElementById('stats-overlay');
  return statsNavRef.innerHTML += `<span class="mainStat" id="stats-stats" onclick="renderStatsNamesOverlay('${statName}')">STATS</span>`;
}

function returnInfoNavigation(id) {
  const statsNavRef = document.getElementById('stats-overlay');
  return statsNavRef.innerHTML += `<span class="mainStat" id="evochain-stats" onclick="renderInfoOverlay(${id})">INFO</span>`;
}

function returnMainStatsOverlay(abilityName, weight, height) {
  const mainStatsOverlayRef = document.getElementById('stats-overlay-details');
  return mainStatsOverlayRef.innerHTML =
  `<div class="pokeStatsOverlay">Height: ${height}</div>
  <div class="pokeStatsOverlay">Weight: ${weight}</div>
  <div class="pokeStatsOverlay">Abilities: ${abilityName} </div>`
}

function returnStatsStatsOverlay(statsDetails, statNames) {
  const statsStatsOverlayRef = document.getElementById('stats-overlay-details');
  return statsStatsOverlayRef.innerHTML +=
  `<div class="pokeStatsOverlay">${statNames}: ${statsDetails}</div>`
}

function returnInfoOverlay(info) {
  const evoStatsOverlayRef = document.getElementById('stats-overlay-details');
  return evoStatsOverlayRef.innerHTML =
  `<div class="pokeStatsOverlay">${info}</div>`
}
