const allActorsButton = document.querySelector("#allActorsButton");
const actorButton = document.querySelector("#actorButton");
const errDev = document.querySelector(".status");
const movieDev = document.querySelector("#movieDev");
const moviePoster = document.querySelector("#moviePoster");

const ul = document.querySelector(".list");

allActorsButton.addEventListener("click", getAllActors);
function getAllActors() {
  const url = "/actors";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let html = data.map(el => `<li>${el}</li>`).join("");
      ul.innerHTML = `The Actors Are: ${html}`;
    });
}

actorButton.addEventListener("click", getTheActor);

movieDev.innerHTML = "";
function getTheActor() {
  const inputVal = document.querySelector("#nameBox").value;
  if (!inputVal) return;

  const url = `/actors/${inputVal}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // i have to find out how i display the err message from the back end into the ui
        moviePoster.removeAttribute("src");
        throw new Error("this actor is not in the database");
      }
    })
    .then(jsonData => {
      movieDev.innerHTML = `The best movie of ${inputVal} is ${jsonData.movie}`;
      moviePoster.setAttribute("src", `${jsonData.poster}`);
    })
    .catch(err => {
      console.log("ERROR:", err);
      movieDev.innerHTML = err;
    });
}
