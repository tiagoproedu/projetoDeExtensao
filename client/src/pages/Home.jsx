import { FaCheckCircle } from "react-icons/fa";

function Home() {
  return (
    <>
      <div id="home">
        <div id="corpo">
          <div id="dispositivos">
            <h6>Os dispositivos estão seguros</h6>
            <FaCheckCircle size={70} />
            <h6>Dispositivos protegidos</h6>
            <div className="numDispositivos">
              <span>Hoje</span>
            </div>
            <div className="numDispositivos">
              <span className="labelTime">Últimos 30 dias</span>
            </div>
            <div className="numDispositivos">
              <span>Total</span>
            </div>
          </div>
          <div id="funcoes">
            <a href="/cadastro">
              <div className="cadastro">Gerenciamento de cadastro</div>
            </a>
            <a href="/vazamento">
              <div className="vazamento">Verificação de vazamento</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
