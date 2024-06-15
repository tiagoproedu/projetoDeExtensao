import { useState } from "react";
import { postUser, getUser } from "../../service/requests";

function Cadastro() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    departament: "",
    name_disp: "",
    so: "",
    type_disp: "",
  });

  function handleFormSubmit() {
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.departament ||
      !userInfo.name_disp ||
      !userInfo.so ||
      !userInfo.type_disp
    ) {
      alert("É preciso preencher os campos corretamente");
    }

    postUser(userInfo)
      .then((response) => {
        let id = response.data.id;
        getUser(id).then((response) => {
          let userCreated = response.data;
          localStorage.setItem("user", JSON.stringify(userCreated));
        });
      })
      .finally(() => {
        alert("Cadastro Realizado com sucesso");
      });
  }

  return (
    <>
      <div id="bodyCadastro">
        <div id="headerCadastro">
          <h2>Gerenciamento de cadastro</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div id="nome">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["name"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <div id="dep">
            <label htmlFor="dep">Departamento:</label>
            <input
              type="text"
              id="dep"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["departament"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <div id="email">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["email"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <div id="nomedisp">
            <label htmlFor="nomedisp">Nome do dispositivo:</label>
            <input
              type="text"
              id="nomedisp"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["name_disp"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <div id="tipodisp">
            <label htmlFor="tipodisp">Tipo do dispositivo:</label>
            <input
              type="text"
              id="tipodisp"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["type_disp"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <div id="so">
            <label htmlFor="so">Sistema operacional:</label>
            <input
              type="text"
              id="so"
              onChange={(object) => {
                const dadosUser = { ...userInfo };
                dadosUser["so"] = object.target.value;
                setUserInfo({ ...userInfo, ...dadosUser });
              }}
            />
          </div>
          <button onClick={handleFormSubmit}>Adicionar dispositivo</button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
