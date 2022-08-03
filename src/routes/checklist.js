const express = require("express");

const router = express.Router();

// rota GET
router.get("/", (req, res) => {
  console.log("Olá");
  res.send();
});

// rota POST
router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

// adicionando parâmetro na rota
router.get("/:id", (req, res) => {
  console.log(req.body);
  res.send(`ID: ${req.params.id}`);
});

// rota PUT
router.put("/:id", (req, res) => {
  console.log(req.body);
  res.send(`PUT ID: ${req.params.id}`);
});

// rota DELETE
router.delete("/:id", (req, res) => {
  console.log(req.body);
  res.send(`DELETE ID: ${req.params.id}`);
});

module.exports = router;
