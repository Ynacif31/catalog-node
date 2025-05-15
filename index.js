// Imports
const express = require("express");
const mysql = require("mysql2");
const { engine } = require("express-handlebars");

// Inicializando o express
const app = express();

// adcionar bootstrap
app.use('/bootstrap', express.static('/node_modules/bootstrap/dist'));
app.use('/css', express.static('./css'));

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "curso-fullstack",
});

// Configuração do handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados");
  } else {
    console.log("Conectado ao banco de dados");
  }
});

// Criando uma rota
app.get("/", (req, res) => {
  res.render('formulario');
});

// Iniciando o servidor
app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
