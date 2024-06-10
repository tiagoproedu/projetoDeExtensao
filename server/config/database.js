const oracledb = require("oracledb");
const dbConfig = require("./databaseConfig");

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("Conexão com o banco de dados Oracle estabelecida");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  }
}

async function close() {
  try {
    await oracledb.getPool().close(10);
    console.log("Conexão com o banco de dados Oracle fechada");
  } catch (err) {
    console.error("Erro ao fechar a conexão com o banco de dados:", err);
  }
}

module.exports = {
  initialize,
  close,
};
