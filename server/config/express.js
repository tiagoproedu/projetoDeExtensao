const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");
const cors = require("cors");
const database = require("./database");

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set("port", process.env.PORT || config.get("server.port"));

  // MIDDLEWARES
  app.use(bodyParser.json());
  app.use(cors());

  // INICIALIZANDO A CONEXÃO COM O BANCO DE DADOS
  database.initialize();

  consign({ cwd: "api" })
    .then("data")
    .then("controller")
    .then("routes")
    .into(app);

  // ENCERRANDO A CONEXÃO COM O BANCO DE DADOS
  process.on("SIGINT", () => {
    database.close().then(() => {
      console.log("Aplicação finalizada");
      process.exit(0);
    });
  });

  return app;
};
