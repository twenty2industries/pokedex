function returnHeader() {
  const headerRef = document.getElementById('header-area');
  headerRef.innerHTML += `       <div class="headerArea">
      <img src="assets/logo/logo1.png" class="logo" />
      <input class="input" type="text" placeholder="search " />
    </div> `;
}

function returnDisplays(index, details, name, image, typeZero, typeOneImg) {
  return `<div id="display-${index}" class="displays">
          <div id="pokemon-name-area-${index}" class="pokemonNameArea">
            <div id="pokemon-number-${index}" class="pokemonNumber"># ${details.id}</div>
            <div id="pokemon-name-${index}" class="pokemonName">${name.toUpperCase()}</div>
          </div>
          <div id="pokemon-picture-area-${index}" class="pokemonPictureArea">
          <img class="pokemonImage" src="${image}">
          </div>
          <div id="element-info-area-${index}" class="elementInfoArea">
            <img class="pokeTypeInfo" src="${typeZero}">
            <img class="pokeTypeInfo" src="${typeOneImg}">
          </div>
        </div>`;
}

function returnFooter() {
  const footerRef = document.getElementById('footer-area');
  footerRef.innerHTML += `<img class="logoFooter" src="assets/logo/logoFooter.png"/>`;
}
