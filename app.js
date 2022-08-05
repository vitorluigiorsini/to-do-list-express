// // criando um middleware que loga o que está no body e mostra a data atual
// const log = (req, res, next) => {
//   console.log(req.body);
//   console.log(`Data: ${Date.now()}`);
//   next(); // passa para próximo middleware
// };
// app.use(log);

const express = require("express"); // importa biblioteca express
const path = require("path"); // importa biblioteca de caminho de pastas

// importa rotas
const rootRouter = require("./src/routes/index");
const checklistRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");

const methodOverride = require("method-override"); // importa método para utilizar PUT e DELETE

require("./config/database"); // importa config do banco de dados

const app = express(); // importa o express para o app
app.use(express.json()); // middleware para disponibilizar arquivos json
app.use(express.urlencoded({ extended: true })); // middleware para disponibilizar dados do form
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public"))); // define caminho dos arquivos estáticos

app.set("views", path.join(__dirname, "src/views")); // define caminho das views
app.set("view engine", "ejs"); // configura app para usar o ejs

app.use("/", rootRouter); // define caminho da rota root
app.use("/checklists", checklistRouter); // define caminho das rotas dos checklists
app.use("/checklists", taskRouter.checklistDependent);

// define a porta em que o servidor será inicializado
app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
