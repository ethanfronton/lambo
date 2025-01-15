const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

const addRoutes = require("./add");
const idRoutes = require("./id");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_cars",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connecté à la base de données MySQL");
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM cars";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.render("index", { cars: result });
    }
  });
});

app.use("/", addRoutes(db));
app.use("/", idRoutes(db));

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
