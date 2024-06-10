function Vazamento() {
    return (
        <>
            <div id="page_vazamentos">
                <div id="Vazamento">
                    <div id="headerVazamento">
                        <h2>Verificação de vazamentos</h2>
                    </div>
                    <div id="bodyVazamento">
                        <div className="vazaCards">
                            <div className="header_vazaCard">
                                <h5>Vazamento de dados</h5>
                            </div>
                            <div className="body_vazaCard">
                                <div id="conteudo_card">
                                    <h6><strong>Origem</strong></h6>
                                    <p>[detalhes da origem]</p>
                                    <h6><strong>Tipo de dados</strong></h6>
                                    <p>[tipo de dado]</p>
                                    <h6><strong>Data da detecção</strong></h6>
                                    <p>[data]</p>
                                    <h6><strong>Medidas recomendadas</strong></h6>
                                    <p>[ações sugeridas]</p>
                                </div>
                                <div id="buttonplus">
                                    <button>+</button>
                                </div>
                                <button className="button_card">Corrigir problema</button>
                            </div>
                        </div>
                        <div className="vazaCards">
                            <div className="header_vazaCard">
                                <h5>Vazamento de dados 2</h5>
                            </div>
                            <div className="body_vazaCard">
                                <div id="conteudo_card">
                                    <h6><strong>Origem</strong></h6>
                                    <p>[detalhes da origem]</p>
                                    <h6><strong>Tipo de dados</strong></h6>
                                    <p>[tipo de dado]</p>
                                    <h6><strong>Data da detecção</strong></h6>
                                    <p>[data]</p>
                                    <h6><strong>Medidas recomendadas</strong></h6>
                                    <p>[ações sugeridas]</p>
                                </div>
                                <div id="buttonplus">
                                    <button>+</button>
                                </div>
                                <button className="button_card">Corrigir problema</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vazamento;