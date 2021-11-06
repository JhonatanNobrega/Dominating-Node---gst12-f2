const express = require("express");

// Servidor
const server = express();

// Log foguete decolando
console.log("browsing the web 🚀");

// Rota de requisição
server.get("/users/:id", (req, res) => {
  // Tipos de parametros que podemos receber na requisição
  const { id } = req.params;
  const nome = req.query.nome;

  // Resposta para o cliente
  return res.json({
    message: `Pegando resposta usuário ${id} com nome ${nome}`,
  });
});

// Setando porta localhost:3000
server.listen(3000);
