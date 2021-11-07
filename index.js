const express = require("express");

// Servidor
const server = express();

server.use(express.json());

// Log foguete decolando
console.log("browsing the web 🚀");

const users = ["Jhonatan", "Ingryd", "Italo"];

// Middleware global
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Log da requisição ${req.method} URL ${req.url}`);

  next();

  console.timeEnd("Request");
});

// Middlewares locais
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "User name is required",
    });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.id];

  if (!user) {
    return res.status(400).json({
      error: "User does not exists",
    });
  }

  req.user = user;

  return next();
}

// CRUD ( Create, Read, Update, Delete )

// Leitura de todos usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Leitura de um usuário pelo identificador
server.get("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

// Criação de usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Atualização de usuário
server.put("/users/:id", checkUserExists, checkUserInArray, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;

  return res.json(users[id]);
});

// Deletar um usuário
server.delete("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(users);
});

// Setando porta localhost:3000
server.listen(3000);
