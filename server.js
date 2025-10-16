const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Criar inscrição
app.post("/api/subscribe", (req, res) => {
  const { full_name, birthdate, email, gender } = req.body;

  if (!full_name || !birthdate || !email) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  if (!email) {
    return res.status(400).json({ error: "Email inválido." });
  }

  const sql =
    "INSERT INTO subscribers (full_name, birthdate, email, gender) VALUES (?, ?, ?, ?)";
  const params = [
    full_name.trim(),
    birthdate.trim(),
    email.trim().toLowerCase(),
    gender || null,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Email já cadastrado." });
      }
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar no banco." });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Listar inscritos
app.get("/api/subscribers", (req, res) => {
  const sql =
    "SELECT id, full_name, birthdate, email, gender, created_at FROM subscribers ORDER BY created_at DESC LIMIT 100";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar inscritos." });
    }
    res.json(rows);
  });
});

// Exporta app (Vercel usa isso)
module.exports = app;

// Se rodar localmente (npm run dev), escuta na porta 3000
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  );
}
