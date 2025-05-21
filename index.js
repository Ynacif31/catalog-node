// Imports
const express = require("express");
const mysql = require("mysql2");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");

// Inicializando o express
const app = express();

// Configuração do upload de arquivos
app.use(fileUpload());

// adcionar bootstrap
app.use('/bootstrap', express.static('/node_modules/bootstrap/dist'));
app.use('/css', express.static('./css'));

// adcionar imagens
app.use('/imagens', express.static('./imagens'));

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nacif@3019",
  database: "curso-fullstack",
});

// Configuração do handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados");
  } else {
    console.log("Conectado ao banco de dados");
  }
});

// Criando uma rota
app.get("/", function(req, res){
  
  let sql = 'SELECT * FROM produtos';
  db.query(sql, function(err, result){
    res.render('formulario', {produtos: result});
  });
});

// Rota para cadastrar
app.post("/cadastrar", (req, res) => {
  console.log('Dados recebidos:', req.body);
  console.log('Arquivo recebido:', req.files);

  const { nome, valor } = req.body;
  const imagem = req.files.imagem.name;

  console.log('Dados processados:', { nome, valor, imagem });

  const sql = 'INSERT INTO produtos (nome, valor, imagem) VALUES (?, ?, ?)';
  
  console.log('SQL a ser executado:', sql);
  console.log('Parâmetros:', [nome, valor, imagem]);
  
  db.query(sql, [nome, valor, imagem], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar produto:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar produto', details: err.message });
    }

    console.log('Produto cadastrado com sucesso:', result);

    req.files.imagem.mv(`./imagens/${imagem}`, (err) => {
      if (err) {
        console.error('Erro ao salvar imagem:', err);
        return res.status(500).json({ error: 'Erro ao salvar imagem', details: err.message });
      }
      
      console.log('Imagem salva com sucesso');
      res.redirect('/');
    });
  });
});

// Iniciando o servidor
app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
