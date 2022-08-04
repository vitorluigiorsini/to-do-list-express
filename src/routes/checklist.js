const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist"); // importando o model checklist

// rota GET - listar
router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as listas" });
  }
});

// rota POST - inserir
router.post("/", async (req, res) => {
  let { name } = req.body;

  try {
    let checklist = await Checklist.create({ name });
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
  }
});

// adicionando parâmetro na rota - listar por id
router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as listas de tarefas" });
  }
  // console.log(req.body);
  // res.send(`ID: ${req.params.id}`);
});

// rota PUT - atualizar
router.put("/:id", async (req, res) => {
  let { name } = req.body;
  try {
    let checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // exibir objeto atualizado
    );
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
  }

  // console.log(req.body);
  // res.send(`PUT ID: ${req.params.id}`);
});

// rota DELETE - deletar
router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
  }

  // console.log(req.body);
  // res.send(`DELETE ID: ${req.params.id}`);
});

module.exports = router;
