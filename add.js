const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/addcars", (req, res) => {
    res.render("addcars");
  });

  router.post("/addcars", (req, res) => {
    const { carName, releaseDate, photoUrl } = req.body;
    const query =
      "INSERT INTO cars (carName, releaseDate, photoUrl) VALUES (?, ?, ?)";
    db.query(query, [carName, releaseDate, photoUrl], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion des données dans la base de données :",
          err
        );
        res.status(500).send("Erreur serveur");
      } else {
        res.redirect("/");
      }
    });
  });

  return router;
};
