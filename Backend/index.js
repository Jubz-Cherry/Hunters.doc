const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const cors = require ('cors');
const users = require("./Models/users");

app.use(express.json());
app.set('view engine', 'ejs');
app.use(cors());

mongoose.connect("mongodb://localhost:27017/register", {})
.then(() => {
    console.log("Mongo funcionando!");
}).catch((err) => {
    console.log("Mongo não esta conectado", err);
}); 


app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/register", async (req, res) => { 
  try {
    const createUser = await users.create({
      name: req.body.name,
      email: req.body.email,
      senha: req.body.senha,
    });

    res.status(201).json({ message: "Usuário criado com sucesso!", user: createUser });
  } catch (err) {
    console.error("Erro ao criar usuário:", err); // 
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});


app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email não encontrado." });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    return res.json({ message: "Login efetuado com sucesso!", user: { name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor." });
  }
});


app.listen(3001, () => {
    console.log("API rodando em http://localhost:3001");
});