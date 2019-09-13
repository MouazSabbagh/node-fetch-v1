const express = require("express");
const Joi = require("joi");
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3"); // its great package to work with because its store all the database in one single file so its easy to pickup this file copy it ...
const db = new sqlite3.Database("allStars.db");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); // , { index: false } index false will force express to ignore the html file in the public folder

// get all the actors

app.get("/actors", (req, res) => {
  db.all("SELECT name FROM i_hate_sqlite", (err, rows) => {
    let allActors = rows.map(row => row.name);

    res.send(allActors);
  });
});

// get one of actors
app.get("/actors/:actorId", (req, res) => {
  const actorName = req.params.actorId;
  // sql query
  db.all(
    "SELECT * FROM i_hate_sqlite WHERE name=$name",
    {
      //parameters to pass to sql query
      $name: actorName
    },
    //callback with 2 parameters err and rows
    (err, rows) => {
      if (rows.length > 0) {
        // empty array is truthy smart, falsy values are: undefined, null, NaN, 0, "" BUT {}and[]are truthy because of this i check the length of the array
        res.send(...rows);
      } else {
        res.status(404).send("this actor is not in the database");
      }
    }
  );
});

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// handling post req
app.post("/actors", jsonParser, (req, res) => {
  console.log("its work");

  console.log(req.body);
  // check if there is bad request
  const { error } = validate(req.body); // req.body id json object and i want it to be object because of this i use the middleware function app.use(express.json())
  if (error) return res.status(400).send(error.details[0].message);
  const actorObj = {
    name: req.body.name,
    movie: req.body.movie,
    poster: req.body.poster
  };

  db.run("INSERT INTO i_hate_sqlite VALUES($name, $movie, $poster)", {
    $name: req.body.name,
    $movie: req.body.movie,
    $poster: req.body.poster
  }),
    err => {
      if (err) {
        res.send({ message: "err in app.post/actors" });
      } else {
        res.send({ message: "no err data be inserted in db" });
      }
    };
  res.send(actorObj);
});

app.listen(port, () => console.log(`the server is running at port ${port}`));

function validate(actorObj) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    movie: Joi.string()
      .min(3)
      .required(),
    poster: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(actorObj, schema);
}
