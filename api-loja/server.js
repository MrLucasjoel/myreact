// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Config do MySQL
const db = mysql.createConnection({
  host: "localhost",   // ou ip do servidor
  user: "root",        // seu usuário
  password: "root",        // sua senha
  database: "loja_db", // nome do banco
});

const salvarItem = () => {
    axios.post("http://10.0.2.2:3000/itens", { // troque pelo IP do seu PC
      nome,
      preco: parseFloat(preco)
    })
    .then(res => {
      console.log("Item salvo:", res.data);
      alert("Item salvo com sucesso!");
    })
    .catch(err => {
      console.log("Erro ao salvar:", err.message);
      alert("Erro ao salvar item");
    });
  };

// Teste de conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

// Rota para listar itens
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Rota para adicionar item
app.post("/itens", (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || !preco) return res.status(400).json({ error: "Faltando dados" });

  db.query(
    "INSERT INTO itens (nome, preco) VALUES (?, ?)",
    [nome, preco],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, nome, preco });
    }
  );
});

// Rota para confirmar compra (exemplo simples: limpa itens)
app.post("/confirmar", (req, res) => {
  db.query("DELETE FROM itens", (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Compra confirmada e carrinho limpo!" });
  });
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
