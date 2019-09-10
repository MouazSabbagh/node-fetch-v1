////////////////////set the body //////////////////////

//Sending Data to the Server using Fetch()
//using jsonplaceholder for the data
//GET - queryStrings
// http://jsonplaceholder.typicode.com/posts?userId=1&postId=65
// http://jsonplaceholder.typicode.com/todos?userId=2
//POST
// http://jsonplaceholder.typicode.com/posts

const root = "http://jsonplaceholder.typicode.com/";
let uri = root + "posts";

let formdata = new FormData();
formdata.append("userId", 3);
formdata.append("title", "This is my title");
formdata.append("body", "This is the body text of the post");

let options = {
  method: "POST",
  mode: "cors",
  body: formdata
};
let req = new Request(uri, options);

fetch(req)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Bad HTTP!");
    }
  })
  .then(j => {
    console.log(j);
  })
  .catch(err => {
    console.log("ERROR:", err.message);
  });
//////////////////////////// set just the header/////////////////////////////

//fetch using a Request and a Headers objects
//using jsonplaceholder for the data

const uri = "http://jsonplaceholder.typicode.com/users";

//new Request(uri)
//new Request(uri, options)
//options - method, headers, body, mode
//methods:  GET, POST, PUT, DELETE, OPTIONS

//new Headers()
// headers.append(name, value)
// Content-Type, Content-Length, Accept, Accept-Language,
// X-Requested-With, User-Agent
let h = new Headers();
h.append("Accept", "application/json");

let req = new Request(uri, {
  method: "POST",
  headers: h,
  mode: "cors"
});

fetch(req)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("BAD HTTP stuff");
    }
  })
  .then(jsonData => {
    console.log(jsonData);
  })
  .catch(err => {
    console.log("ERROR:", err.message);
  });
