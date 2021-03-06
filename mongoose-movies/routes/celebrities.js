const express = require("express");
const router = express.Router();
const Celebrities = require("../models/celebrity");

/*  C(R)UD: Retrieve -> Lista de Celebridades */

router.get("/celebrities", (req, res, next) => {
  Celebrities.find({})
    .then(celebritiesArray => {
      res.render("celebrities/index", { celebritiesArray });
      console.log("Ruta de celebridades OK");
    })
    .catch(error => {
      console.log(error);
    });
});

/*  C(R)UD: Retrieve -> Detalles de una celebridad */
router.get("/celebrities/:id", (req, res, next) => {
  let celID = req.params.id;
  console.log("El celID vale: " + celID);
  Celebrities.findById(celID)
    .then(celebrity => {
      console.log(`Informacion de celebridad ${celebrity} OK!`);
      res.render("celebrities/show", { celebrity });
    })
    .catch(error => {
      console.log(error);
    });
});

/* (C)RUD: Agrega forma de nueva celebridad */
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

/* (C)RUD: Agrega una celebridad a la DB */
router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  new Celebrities({ name, occupation, catchPhrase })
    .save()
    .then(celebrity => {
      console.log("Celebridad creada!");
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log(error);
      res.render("celebrities/new");
    });
});

/* CRU(D): Elimina una celebridad de la DB */
router.post("/celebrities/:id/delete", (req, res, next) => {
  let celID = req.params.id;
  Celebrities.findByIdAndRemove(celID)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log(error);
    });
});

/* CR(U)D: GET Agrega forma de nueva celebridad */
router.get("/celebrities/:id/edit", (req, res, next) => {
  let celID = req.params.id;
  Celebrities.findById(celID)
    .then(celebrity => {
      console.log(`Informacion ha actualizar de la celebridad ${celebrity} OK!`);
      res.render("celebrities/edit", { celebrity });
    })
    .catch(error => {
      console.log(error);
    });
});

/* CR(U)D: POST Modifica una celebridad */
router.post("/celebrities/edit", (req, res, next) => {
  const { id, name, occupation, catchPhrase } = req.body;
  console.log(`Estos son los parametros: ${name} mas ${occupation} mas ${catchPhrase} mas ${id}`);
  Celebrities.findByIdAndUpdate(id,{ name, occupation, catchPhrase })
  .then( celebrity => {
    res.redirect('/celebrities')
  })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
