const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist"); // importa o model checklist
const Task = require("../models/task");

// rota GET - exibe todas as listas de tarefas
router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    let tasks = await Task.find({ done: true });
    res
      .status(200)
      .render("checklists/index", { checklists: checklists, tasks: tasks });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as listas" });
  }
});

// adiciona nova lista de tarefas
router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao carregar o formulário" });
  }
});

// edita lista de tarefas
router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res.status(500).render("pages/error", {
      error: "Erro ao exibir a edição listas de tarefas",
    });
  }
});

// rota POST - inseri nova lista de tarefas
router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });

  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }
});

// passando parâmetro id - exibe tarefas da lista de tarefas
router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as listas de tarefas" });
  }
});

// rota PUT - atualiza lista de tarefas
router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.updateOne({ name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklist/edit", { checklist: { ...checklist, errors } });
  }
});

// rota DELETE - deleta lista de tarefas e suas respectivas tarefas
router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    // teste para remover a lista junto com todas as suas tarefas
    let tasks = await Task.deleteMany({ checklist: checklist });
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao deletar a lista de tarefas" });
  }
});

module.exports = router;
