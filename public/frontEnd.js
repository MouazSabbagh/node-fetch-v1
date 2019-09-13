const allActorsButton = document.querySelector("#allActorsButton");
const actorButton = document.querySelector("#actorButton");
const errDev = document.querySelector(".status");
const movieDev = document.querySelector("#movieDev");
const moviePoster = document.querySelector("#moviePoster");
const insertButton = document.querySelector("#insertButton");
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

// POST REQ WITH FETCH
insertButton.addEventListener("click", insertButtonClicked);
function insertButtonClicked() {
  const actorNameVal = document.querySelector("#insertActorName").value;
  const actorMovieVal = document.querySelector("#insertActorMovie").value;
  const actorPosterVal = document.querySelector("#insertActorPoster").value;
  //   const header = new Headers();
  //   const req = new Request(url,options{}) in the option object i define, header methods,body mode,
  // the methods are GET POST PUT DELETE,OPTIONS WHEN I don't WANT TO GET SOMETHING BACK FROM THE SERVER

  //its just the type of file that i want to get back
  // so the header instance object, have the append method which take tow string argument to append it to the header.
  // those arguments are: content-type, content-length,accept, accept-language,x-requested-width,User- Agent
  // the ok status code from 200 => 209
  // if the file is cached, i will get 304m which is ok status code and i could use the cached data instead
  // GET method automatically get cached so the first status 200 then 304

  let url = "/actors";
  let h = new Headers();
  h.append("content-type", "application/json");
  //   let formData = new FormData();
  //   formData.append("name", `${actorNameVal}`);
  //   formData.append("movie", `${actorMovieVal}`);
  //   formData.append("poster", `${actorPosterVal}`);
  //   console.log(formData);
  let req = new Request(url, {
    headers: h,
    method: "POST",
    // mode: "cors",
    body: JSON.stringify({
      name: `${actorNameVal}`,
      movie: `${actorMovieVal}`,
      poster: `${actorPosterVal}`
    })
  });
  console.log(req);

  fetch(req)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // i have to find out how i display the err message from the back end into the ui

        throw new Error("bad POST req");
      }
    })
    .then(jsonData => {
      console.log(jsonData);
    })
    .catch(err => {
      console.log("ERROR:", err);
      movieDev.innerHTML = err;
    });
}
