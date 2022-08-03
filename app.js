// // criando um middleware que loga o que está no body e mostra a data atual
// const log = (req, res, next) => {
//   console.log(req.body);
//   console.log(`Data: ${Date.now()}`);
//   next(); // passa para próximo middleware
// };

// app.use(log);

// // método GET
// app.get("/", (req, res) => {
//   res.send("<h1>Minha lista de tarefas :)</h1>");
// });

// // resposta em JSON
// app.get("/json", (req, res) => {
//   res.json({ title: "Tarefa X", done: true });
// });
const express = require("express"); // importando o express
const checkListRouter = require("./src/routes/checklist");

const app = express();
app.use(express.json()); // usa o middleware json, que verifica se existe json na chamada e o deixa disponível no body

app.use("/checklists", checkListRouter); // somente utilizar rotas que estão no checklists

// ouvindo porta 3000
app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
