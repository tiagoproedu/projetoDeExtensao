const uuidv4 = require("uuid/v4");
const axios = require("axios");
const oracledb = require("oracledb");

module.exports = (app) => {
  const cadastroUserDB = app.data.cadastroUser;
  const controller = {};

  const sendResponse = ({ message, res, status, BD }) =>
    res.status(status).json({ message, BD });

  const sendResponseVazamento = ({ message, res, status, response }) =>
    res.status(status).json({ message, response });

  const { cadastroUser: cadastroUserMock } = cadastroUserDB;

  const { data } = cadastroUserMock;

  controller.list = (req, res) => {
    res.status(200).json(data);
  };

  controller.getUser = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
      // Obtém uma conexão do pool
      connection = await oracledb.getConnection();
      const result2 = await connection.execute('SELECT 1 FROM DUAL');
      console.log(result2.rows);
      // Chama a procedure getUser do banco de dados
      const result = await connection.execute(
        `BEGIN 
           getUser(:id, :user);
         END;`,
        {
          id: { val: id, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
          user: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        }
      );

      // Obtém os dados do cursor
      const resultSet = result.outBinds.user;
      const user = await resultSet.getRow();

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
          // Fecha a conexão
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.save = async (req, res) => {
    let connection;
    try {
      // Obtém uma conexão do pool
      connection = await oracledb.getConnection();

      // Chama a procedure saveUser do banco de dados
      await connection.execute(
        `BEGIN 
           saveUser(:id, :name, :email);
         END;`,
        {
          id: { val: uuidv4(), type: oracledb.STRING, dir: oracledb.BIND_IN },
          name: {
            val: req.body.name,
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },
          email: {
            val: req.body.email,
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },
        }
      );

      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
          // Fecha a conexão
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.update = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
      // Obtém uma conexão do pool
      connection = await oracledb.getConnection();

      // Chama a procedure updateUser do banco de dados
      await connection.execute(
        `BEGIN 
           updateUser(:id, :name, :email);
         END;`,
        {
          id: { val: id, type: oracledb.STRING, dir: oracledb.BIND_IN },
          name: {
            val: req.body.name,
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },
          email: {
            val: req.body.email,
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },
        }
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
          // Fecha a conexão
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.remove = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
      // Obtém uma conexão do pool
      connection = await oracledb.getConnection();

      // Chama a procedure deleteUser do banco de dados
      await connection.execute(
        `BEGIN 
           deleteUser(:id);
         END;`,
        {
          id: { val: id, type: oracledb.STRING, dir: oracledb.BIND_IN },
        }
      );

      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
          // Fecha a conexão
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.getLeak = (req, res) => {
    const { email } = req.params;

    const apiKey = "chave";
    const urlFicticia = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`;
    let message = "";
    let status = null;
    axios
      .get(urlFicticia, {
        headers: {
          "hibp-api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data.error) {
          message = "Usuário não possui vazamentos";
          status = 404;

          return sendResponse({ message, status, BD, res });
        }
        message = "Usuário possui vazamentos";
        status = 200;
        return sendResponseVazamento({
          message,
          status,
          response: response.data,
          res,
        });
      })
      .catch((error) => {
        if (error) {
          message = "Usuário não possui vazamentos";
          status = 404;

          return sendResponseVazamento({ message, status, res });
        }
      });
  };

  return controller;
};
