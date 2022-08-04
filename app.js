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
const express = require("express"); // importando biblioteca express
const path = require("path"); // setar caminho padrão

// importando rotas
const checkListRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");

require("./config/database"); // importando config do banco de dados

const app = express(); // importa o express para o app
app.use(express.json()); // usa o middleware json, que verifica se existe json na chamada e o deixa disponível no body

app.use(express.static(path.join(__dirname, "public"))); // informa ao app que os arquivos estáticos ficarão na pasta public

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs"); // configura app para usar o ejs

app.use("/checklists", checkListRouter); // somente utilizar rotas que estão no checklists
app.use("/", rootRouter);

// ouvindo porta 3000
app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
