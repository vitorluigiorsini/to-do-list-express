const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist"); // importando o model checklist

// rota GET
router.get("/", (req, res) => {
  console.log("Olá");
  res.send();
});

// rota POST
router.post("/", async (req, res) => {
  let { name } = req.body;

  try {
    let checklist = await Checklist.create({ name });
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
  }
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
