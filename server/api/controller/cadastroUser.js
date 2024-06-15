const uuidv4 = require("uuid/v4");
const axios = require("axios");
const oracledb = require("oracledb");
const transformData = require("../utils");

module.exports = (app) => {
  const cadastroUserDB = app.data.cadastroUser;
  const controller = {};

  const sendResponse = ({ message, res, status, BD }) =>
    res.status(status).json({ message, BD });

  const sendResponseVazamento = ({ message, res, status, response }) =>
    res.status(status).json({ message, response: response });

  const { cadastroUser: cadastroUserMock } = cadastroUserDB;
  const { data } = cadastroUserMock;

  controller.list = (req, res) => {
    res.status(200).json(data);
  };

  controller.getUser = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
      connection = await oracledb.getConnection();
      const tablesResult = await connection.execute(
        "SELECT table_name FROM user_tables"
      );

      const result = await connection.execute(
        `BEGIN 
               getUser(:id, :user);
             END;`,
        {
          id: { val: id, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
          user: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        }
      );

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
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.save = async (req, res) => {
    let connection;
    const { email, name, password, type_disp, departament, name_disp, so } =
      req.body;

    try {
      connection = await oracledb.getConnection();

      // Chamar a procedure PRC_INS_INFORMACOES
      await connection.execute(
        `BEGIN
          VAZOU.PRC_INS_INFORMACOES(:name, :email, :password, :type_disp, :departament, :name_disp, :so, :id_admin);
        END;`,
        {
          name: { val: name, type: oracledb.STRING },
          email: { val: email, type: oracledb.STRING },
          password: { val: password, type: oracledb.STRING },
          type_disp: { val: type_disp, type: oracledb.STRING },
          departament: { val: departament, type: oracledb.STRING },
          name_disp: { val: name_disp, type: oracledb.STRING },
          so: { val: so, type: oracledb.STRING },
          id_admin: { val: 1, type: oracledb.NUMBER },
        }
      );

      // Commit da transação
      await connection.execute("COMMIT");

      // Chamar a função getLeak para obter os dados
      const responseLeak = await new Promise((resolve, reject) => {
        controller.getLeak(
          { params: { email } },
          {
            status: (statusCode) => ({
              json: (data) => resolve({ statusCode, data }),
            }),
          }
        );
      });

      const userData = await connection.execute(
        `SELECT "ID_Funcionario" FROM vazou.tb_informacoes WHERE "ID_Funcionario" = (SELECT MAX("ID_Funcionario") FROM vazou.tb_informacoes)`
      );
      if (responseLeak.data.message === "Usuário não possui vazamentos") {
        return res
          .status(200)
          .json({ message: "Usuário não possui vazamentos" });
      }
      const leakData = responseLeak.data;

      const result = await connection.execute(
        `BEGIN 
           VAZOU.PRC_INS_TESTE(:id, :status, :dados, :dominio);
         END;`,
        {
          id: { val: userData.rows[0][0], type: oracledb.NUMBER }, // Gerar um UUID para exemplo
          status: { val: "true", type: oracledb.STRING },
          dados: { val: leakData.response.leaked_data, type: oracledb.STRING },
          dominio: {
            val: leakData.response.name_domain,
            type: oracledb.STRING,
          },
        }
      );

      // Recuperar os dados da procedure PRC_INS_TESTE, se necessário
      const insertedData = {
        id: userData.rows[0][0],
        status: "true",
        dados: leakData.response.leaked_data,
        dominio: leakData.response.name_domain,
      };

      const message = "Usuário criado com sucesso";
      res.status(200).json({ message, leakData, insertedData });
      await connection.execute("COMMIT");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
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
      connection = await oracledb.getConnection();
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
      connection = await oracledb.getConnection();
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
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  controller.getLeak = (req, res) => {
    const { email } = req.params;
    const apiKey = "af0b71df3c064e80a58c9d8cfdac51c4";
    const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`;
    let message = "";
    let status = null;
    axios
      .get(url, {
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
          response: transformData(response.data),
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

  controller.getAllLeaks = async (req, res) => {
    let connection;

    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute(
        "SELECT * FROM TABLE(VAZOU.FN_GET_TESTE)"
      );

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Não há vazamentos" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return controller;
};
