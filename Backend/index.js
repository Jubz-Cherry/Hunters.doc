const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const cors = require ('cors');
const users = require("./Models/users");
const Note = require("./Models/notes");
const monstersList = require('./Data/monstersList');
const gunsList = require('./Data/gunsList');
const path = require('path');


app.use(express.json());
app.use(cors());
app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));
app.use('/imguns', express.static(path.join(__dirname, 'public/imguns')));

mongoose.connect("mongodb://localhost:27017/register", {})
.then(() => {
    console.log("Mongo funcionando!");
}).catch((err) => {
    console.log("Mongo não esta conectado", err);
}); 

app.post("/register", async (req, res) => {
    try {
        const { name, email, senha } = req.body;

        const userExist = await users.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const newUser = new users({ name, email, senha });
        await newUser.save();

        
        const { senha: _, ...userNoPass } = newUser._doc;

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: userNoPass,
        });

    } catch (err) {
        console.error("Erro ao criar usuário:", err);
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
   
    return res.json({
      message: "Login efetuado com sucesso!", 
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor." });
  }
  
});

app.get("/monsters", async (req, res) => {
  try {
    res.send(monstersList);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar monstros' });
  }
});

app.get("/monsters/:name", async (req, res) => {
    const { name } = req.params;
  try {
    const monster = monstersList.find((m) => m.name === name);

    if (!monster) {
      return res.status(404).json({ error: 'Monstro não encontrado' });
    }

    res.status(200).json(monster);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar o monstro' });
  }
});

app.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Campos obrigatórios' });

  const note = await Note.create({ title, content });
  res.status(201).json(note);
});

app.delete("/note/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.get("/guns", async (req, res) => {
  try {
    res.send(gunsList);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar armas' });
  }
});

app.get('/guns/:name', (req, res) => {
 const { name } = req.params;
  try {
    const guns = gunsList.find((m) => m.name === name);

    if (!guns) {
      return res.status(404).json({ error: 'Arma não encontrada' });
    }

    res.status(200).json(guns);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar a arma' });
  }
});



app.listen(3001, () => {
    console.log("API rodando em http://localhost:3001");
});