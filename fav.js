//import an array  of all superheroes which were addded to Favourites
var fav = JSON.parse(localStorage.getItem("favList"));
if (fav == null) fav = [];

const favCard = document.getElementById("list-items");

if (fav.length === 0)
  favCard.innerHTML = '<div class="not-found">Nothing Here<div>';

for (let id of fav) {
  fetch("https://superheroapi.com/api.php/1972713529532862/" + id)
    .then((res) => res.json())
    .then((data) => createCard(data, id));
}

//Function to display favourite heros
function createCard(data, id) {
  var card = document.createElement("div");
  card.classList.add("card");

  var left = document.createElement("div");
  left.classList.add("left-div");

  var right = document.createElement("div");
  right.classList.add("right-div");

  var top = document.createElement("div");
  top.classList.add("top-div");

  var bot = document.createElement("div");
  bot.classList.add("bot-div");

  var cardImage = document.createElement("img");
  cardImage.setAttribute("id", "superhero-img");
  cardImage.classList.add("dp");

  var cardName = document.createElement("h1");
  cardName.classList.add("name");

  var favButton = document.createElement("div");
  favButton.classList.add("favbtn");

  favButton.setAttribute("ide", id);
  favButton.setAttribute("divtype", "favourite");
  favButton.innerHTML = "UNfav";

  var moreButton = document.createElement("div");
  moreButton.innerHTML = "More";
  moreButton.classList.add("moreButton");
  favButton.setAttribute("ide", id);
  moreButton.setAttribute("divtype", "more");
  moreButton.setAttribute("ide", id);

  left.appendChild(cardImage);
  card.appendChild(left);
  top.appendChild(cardName);
  right.appendChild(top);

  bot.appendChild(favButton);
  bot.appendChild(moreButton);
  right.appendChild(bot);
  card.appendChild(right);
  card.setAttribute("ide", id);

  cardImage.src = data.image.url;
  cardName.innerHTML = data.name;

  favCard.appendChild(card);
}
// adding functions to buttons as well as card
favCard.onclick = function (event) {
  var id = event.target.getAttribute("ide");
  var div = event.target.getAttribute("divType");
  if (id === null) {
    return;
  } else if (div === "favourite") {
    var i = fav.indexOf(id);
    fav.splice(i, 1);
    localStorage.setItem("favList", JSON.stringify(fav));
    location.reload();
  } else {
    window.open("details.html?id=" + id);
  }
};
