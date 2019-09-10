const express = require("express");
const Joi = require("joi");
const app = express();
const port = process.env.PORT || 3000;

const allStars = {
  "John Malkovich": {
    movie: "being John Malkovich",
    poster: "John_Malkovich.jpg"
  },
  "Marlon brando": {
    movie: "The God Father",
    poster: "The_Godfather.jpg"
  },
  "Robert de niro": {
    movie: "Taxi driver",
    poster: "Taxi_driver.jpg"
  }
};
app.use(express.json());

app.use(express.static("public")); // , { index: false } index false will force express to ignore the html file in the public folder

// get all the actors

app.get("/actors", (req, res) => {
  const allActors = Object.keys(allStars);
  res.send(allActors);
});

// get one of the actors
app.get("/actors/:actorId", (req, res) => {
  const actorName = req.params.actorId;
  const actorNameData = allStars[actorName];

  if (!allStars.hasOwnProperty(actorName)) {
    // it will not loop through the prototype,
    return res.status(404).send("this actor is not in the database");
  }

  res.send(actorNameData);
});

app.listen(port, () => console.log(`the server is running at port ${port}`));

function validate(movie) {
  const schema = {
    actorName: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
}
