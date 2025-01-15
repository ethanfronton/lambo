const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/car/:id", (req, res) => {
    const carId = req.params.id;
    const query = "SELECT * FROM cars WHERE id = ?";
    db.query(query, [carId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res.status(500).send("Erreur serveur");
      } else {
        if (result.length > 0) {
          res.render("car", { car: result[0] });
        } else {
          res.status(404).send("Voiture non trouvée");
        }
      }
    });
  });

  return router;
};
