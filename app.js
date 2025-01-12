const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const carsFilePath = path.join(__dirname, "cars.json");

const readCarsFromFile = () => {
  try {
    const data = fs.readFileSync(carsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeCarsToFile = (cars) => {
  fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2), "utf8");
};

app.get("/", (req, res) => {
  const cars = readCarsFromFile();
  res.render("index", { cars });
});

app.get("/addcars", (req, res) => {
  res.render("addcars");
});

app.post("/addcars", (req, res) => {
  const { carName, releaseDate, photoUrl} = req.body;
  const cars = readCarsFromFile();
  cars.push({ carName, releaseDate, photoUrl});
  writeCarsToFile(cars);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
