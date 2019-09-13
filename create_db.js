const sqlite3 = require("sqlite3"); // its great package to work with because its store all the database in one single file so its easy to pickup this file copy it ...
const db = new sqlite3.Database("allStars.db");
console.log(db);
// create db serially (one after another) not in parallel
db.serialize(() => {
  // create table
  db.run("CREATE TABLE i_hate_sqlite (name TEXT, movie TEXT, poster TEXT)");
  //insert 3 rows
  db.run(
    `INSERT INTO i_hate_sqlite VALUES("John Malkovich", "being John Malkovich", "John_Malkovich.jpg")`
  );
  db.run(
    `INSERT INTO i_hate_sqlite VALUES("Robert de niro", "Taxi driver", "Taxi_driver.jpg")`
  );
  db.run(
    `INSERT INTO i_hate_sqlite VALUES("Marlon brando", "The God Father", "The_Godfather.jpg")`
  );
  //   db.each("SELECT name, movie, poster FROM my_top", (err, row) => {
  //     // console.log(`${row.name} ${row.movie} ${row.poster}`);
  //   });
});
db.close();

// hahah i am so stupid don't create your db in the app.js (server) every time you save you will create it again hahhaha and sqlite will throw err that the table is already exist.
