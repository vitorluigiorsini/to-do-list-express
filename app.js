const express = require("express"); // importando o express

const app = express();

// método GET
app.get("/", (req, res) => {
  res.send("<h1>Minha lista de tarefas :)</h1>");
});

// ouvindo porta 3000
app.listen(3000, () => {
  console.log("Servidor foi iniciado");
});
