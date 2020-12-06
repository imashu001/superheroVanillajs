// Getting elements using id's
const name = document.getElementById("nme");
const fav = document.getElementById("fav-btn");
const com = document.getElementById("combat");
const dur = document.getElementById("durablity");
const int = document.getElementById("intellingence");
const pow = document.getElementById("Power");
const spee = document.getElementById("speed");
const str = document.getElementById("strength");

// Getting Superhero id for details
const params = new URLSearchParams(window.location.search);
var id = params.get("id");

//Getting Favourites List from LocalStorage
var favList =
  JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));

//Fetching Superhero details from Superhero API
fetch("https://superheroapi.com/api.php/1972713529532862/" + id)
  .then((res) => res.json())
  .then((data) => {
    showDetails(data);
  })
  .catch((err) => console.log(err));

//Render Superhero details
function showDetails(data) {
  //Setting name
  name.innerHTML = data.name;

  com.innerHTML =
    "Combat &emsp;    :::::::::::::::::::: &emsp;" + data.powerstats.combat;

  dur.innerHTML =
    "Durablity&emsp;  ::::::::::::::::::&emsp;" + data.powerstats.durability;

  int.innerHTML =
    "Intelligence &emsp;:::::::::::::::&emsp; " + data.powerstats.intelligence;

  pow.innerHTML =
    "Power &emsp;:::::::::::::::::::::::&emsp;" + data.powerstats.power;
  spee.innerHTML =
    "Speed&emsp;::::::::::::::::::::::::&emsp;" + data.powerstats.speed;
  str.innerHTML =
    "Strength&emsp;:::::::::::::::::::::&emsp;" + data.powerstats.strength;

  //adding profile image to detals page

  var img = document.createElement("img");

  img.src = `${data.image.url}`;
  var src = document.getElementById("dpe");

  src.appendChild(img);

  //Setting favourite
  if (favList.includes(id)) {
    fav.innerHTML = "<h1>UnFavourite</h1>";
  } else {
    fav.innerHTML = "<h1>Favourite</h1>";
  }

  //   //Setting Appearance props.
  const gen = document.getElementById("Gender");
  gen.innerHTML = "Gender : " + data.appearance.gender;

  const rac = document.getElementById("Race");
  rac.innerHTML = "Race : " + data.appearance.race;

  const hei = document.getElementById("Height");
  hei.innerHTML = "Height : " + data.appearance.height;

  const we = document.getElementById("weight");
  we.innerHTML = "Weight : " + data.appearance.weight;

  const fuln = document.getElementById("aliases");
  fuln.innerHTML = "Aliases       : " + data.biography.aliases;

  const pob = document.getElementById("alignment");
  pob.innerHTML = "Alignment     : " + data.biography.alignment;

  const pub = document.getElementById("publisher");
  pub.innerHTML = "Publisher       : " + data.biography.publisher;

  const base = document.getElementById("base");
  base.innerHTML = "Base       : " + data.work.base;

  const occu = document.getElementById("occupation");
  occu.innerHTML = "Occupation       : " + data.work.occupation;

  fav.onclick = function () {
    // Handling favButton on click functions
    if (!favList.includes(id)) {
      favList.push(id);
      fav.innerHTML = "<h1>Unfavourite</h1>";
    } else {
      var i = favList.indexOf(id);
      favList.splice(i, 1);
      fav.innerHTML = "<h1>Favourite</h1>";
    }
    localStorage.setItem("favList", JSON.stringify(favList));
  };
}
