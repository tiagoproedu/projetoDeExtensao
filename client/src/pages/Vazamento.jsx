import { useEffect, useState } from "react";
import { getAllLeaks } from "../../service/requests";

function Vazamento() {
  const [vazamentos, setVazamentos] = useState([]);

  useEffect(() => {
    getAllLeaks().then((data) => {
      setVazamentos(data.data.rows);
    });
  }, []);

  function removeDuplicados(str) {
    const valoresArray = str.split(",");

    const valoresUnicos = [];

    const vistos = {};

    valoresArray.forEach((valor) => {
      if (!vistos[valor]) {
        valoresUnicos.push(valor);
        vistos[valor] = true;
      }
    });

    return valoresUnicos.join(",");
  }

  return (
    <>
      <div id="page_vazamentos">
        <div id="Vazamento">
          <div id="headerVazamento">
            <h2>Verificação de vazamentos</h2>
          </div>
          <div id="bodyVazamento">
            {vazamentos.map((vazamento, key) => {
              console.log(vazamento);
              return (
                <div className="vazaCards" key={key}>
                  <div className="header_vazaCard">
                    <h5>Vazamento de dados</h5>
                  </div>
                  <div className="body_vazaCard">
                    <div id="conteudo_card">
                      <h6>
                        <strong>Origem</strong>
                      </h6>
                      <p>{vazamento[2]}</p>
                      <h6>
                        <strong>Tipo de dados</strong>
                      </h6>
                      <p>{removeDuplicados(vazamento[1])}</p>
                      <h6>
                        <strong>Data da detecção</strong>
                      </h6>
                      <p>
                        {new Date(vazamento[0]).toLocaleDateString("pt-BR", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                      <h6>
                        <strong>Medidas recomendadas</strong>
                      </h6>
                      <p>
                        Para sua segurança é necessário que sua senha e email
                        sejam alterados
                      </p>
                    </div>
                    <div id="buttonplus">
                      <button>+</button>
                    </div>
                    <button className="button_card">Corrigir problema</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Vazamento;
