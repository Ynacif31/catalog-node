// Importando o express
const express = require("express");

// Inicializando o express
const app = express();

// Criando uma rota
app.get("/", (req, res) => {
  res.write("Olá Mundo");
  res.end();
});

// Iniciando o servidor
app.listen(8080, () => {
  console.log("Servidor rodando na porta 3000");
});
