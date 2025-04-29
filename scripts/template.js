function returnHeader() {
  const headerRef = document.getElementById('header-area');
  headerRef.innerHTML += `      <img src="assets/logo/logo1.png" class="logo" />
      <input class="input" type="text" placeholder="search " />`;
}

function returnDisplays(index) {
return `<div id="display-${index}" class="displays">
          <div id="pokemon-name-area-${index}" class="pokemonNameArea">
            <div id="pokemon-number-${index}" class="pokemonNumber"># ${pokeDetails.id}</div>
            <div id="pokemon-name-${index}" class="pokemonName">${pokeNames.toUpperCase()}</div>
          </div>
          <div id="pokemon-picture-area-${index}" class="pokemonPictureArea">
            Picture
          </div>
          <div id="element-info-area-${index}" class="elementInfoArea">ELEMENT INFO</div>
        </div>`; 
}

function returnFooter() {
  const footerRef = document.getElementById('footer-area');
  footerRef.innerHTML += `<img class="logoFooter" src="assets/logo/logoFooter.png"/>`;
}