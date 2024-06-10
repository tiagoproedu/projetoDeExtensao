import { FaCheckCircle } from "react-icons/fa";

function Home() {
    return (
        <>
            <div id="home">
                <div id="corpo">
                    <div id="dispositivos">
                        <h6>os dispositivos estão seguros</h6>
                        <FaCheckCircle size={70} />
                        <h6>dispositivos protegidos</h6>
                        <div className="numDispositivos">Hoje</div>
                        <div className="numDispositivos">Últimos 30 dias</div>
                        <div className="numDispositivos">Total</div>
                    </div>
                    <div id="funcoes">
                        <a href="/cadastro"><div className="cadastro">
                            Gerenciamento de cadastro
                        </div></a>
                        <a href="/vazamento"><div className="vazamento">
                            Verificação de vazamento
                        </div></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;