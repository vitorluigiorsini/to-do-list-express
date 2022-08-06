const mongoose = require("mongoose"); // importação do adaptador Mongoose para a variável
mongoose.Promise = global.Promise; // informar ao mongoose para utilizar a Promise global do Node

// conectar banco de dados mongodb da máquina ao app através do mongoose
mongoose
  .connect(
    "mongodb://localhost/todo-list"
    /*, { useNewUrlParser: true, useUnifiedTopology: true, } // não é necessário a partir da versão 6 do mongoose*/
  )
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error(err));
