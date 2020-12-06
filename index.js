// import arrays of favourite heros
var fav = JSON.parse(localStorage.getItem("favList"));
if (fav == null) fav = [];

const inputName = document.getElementById("inputName");
const results = document.getElementById("results");
// onekeypress is the function to provide search results after every key pressed
//so that we get suggestions after every key and we do not require search button
heroName.onkeypress = function () {
  var input = heroName.value;

  if (input !== "") {
    fetch(
      "https://superheroapi.com/api.php/1972713529532862/search/" + input.trim()

      //we've used trim to remove the whitespace from the ends however we may or may not use it
    )
      //converting response into readable response.json
      .then((response) => response.json())
      //generating results via data
      .then((data) => {
        generateResults(data);
        console.log(data);
      });
  }
};

function generateResults(data) {
  if (data.response === "error") {
    // if there is no results than
    results.innerHTML = '<div class="not-found">Error 404 ! not found </div>';
  } else {
    //Creating all the results but first removing previous innerHTML
    results.innerHTML = null;

    for (let i = 0; i < data.results.length; i++) {
      // Creating suggestion elements
      var main = document.createElement("div");
      main.classList.add("main-div");

      var left = document.createElement("div");
      left.classList.add("img-container");

      var right = document.createElement("div");
      right.classList.add("data");

      var top = document.createElement("div");
      top.classList.add("nme");

      var bot = document.createElement("div");
      bot.classList.add("btn-container");

      var dp = document.createElement("img");
      dp.classList.add("dp");

      var more = document.createElement("div");
      more.classList.add("moreButton");

      var favButton = document.createElement("div");
      favButton.classList.add("favButton");

      var name = document.createElement("div");

      if (fav.includes(data.results[i].id)) {
        favButton.innerHTML = "unfav";
      } else {
        favButton.innerHTML = "Fav";
      }

      name.innerHTML = data.results[i].name;
      dp.src = data.results[i].image.url;
      more.innerHTML = "More";

      left.appendChild(dp);
      top.appendChild(name);
      bot.appendChild(more);
      bot.appendChild(favButton);
      right.appendChild(bot);
      right.appendChild(top);
      main.appendChild(left);
      main.appendChild(right);

      //Linking id with favorite and details buttons to add to favorites
      //or display details respectively
      favButton.setAttribute("ide", data.results[i].id);
      more.setAttribute("ide", data.results[i].id);

      favButton.setAttribute("dib-name", "fav-btn");
      more.setAttribute("dib-name", "details-btn");

      //Appending all cards to Results-div
      results.appendChild(main);
    }
  }
}

results.onclick = function (event) {
  var id = event.target.getAttribute("ide");
  var div = event.target.getAttribute("dib-name");

  //Handle if Favourites button is clicked, details is clicked or item is clicked
  if (div === "fav-btn") {
    if (id === null) return;
    if (fav.includes(id)) {
      var i = fav.indexOf(id);
      fav.splice(i, 1);
      event.target.innerHTML = "Fav";
    } else {
      fav.push(id);
      console.log(fav);
      event.target.innerHTML = "Unfav";
    }
    localStorage.setItem("favList", JSON.stringify(fav));
  } else if (div === "details-btn") {
    if (id === null) return;
    window.open("details.html?id=" + id);
  }
};
