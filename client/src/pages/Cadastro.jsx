import { useState } from "react";
import { postUser } from "../../service/requests";

function Cadastro() {

    const [userInfo, setUserInfo] = useState({name: '', email: ''});

    

    function handleFormSubmit() {
        console.log('aaa', userInfo)
        // if (!userInfo.name || !userInfo.email) {
        //     alert("É preciso preencher os campos corretamente")
        // }

            postUser(userInfo).then((response) => {
                console.log('aaa')
                let id = response.data.id
                getUser(id).then((response) => {
                    let userCreated = response.data
                    localStorage.setItem("user", JSON.stringify(userCreated))
                });
            }) .finally(()=>{
                alert('Cadastro Realizado com sucesso')
            })
    }

    return (
        <>
            <div id="bodyCadastro">
                <div id="headerCadastro">
                    <h2>Gerenciamento de cadastro</h2>
                </div>
                <form onSubmit={handleFormSubmit} >
                    <div id="nome">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" onChange={(object) => {
                            const dadosUser = { ...userInfo }
                            dadosUser['name'] = object.target.value
                            setUserInfo({ ...userInfo, ...dadosUser })
                        }} />
                    </div>
                    <div id="dep">
                        <label htmlFor="dep">Departamento:</label>
                        <input type="text" id="dep" />
                    </div>
                    <div id="email">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" onChange={(object) => {
                             const dadosUser = { ...userInfo }
                             dadosUser['email'] = object.target.value
                             setUserInfo({ ...userInfo, ...dadosUser })
                        }}/>
                    </div>
                    <div id="nomedisp">
                        <label htmlFor="nomedisp">Nome do dispositivo:</label>
                        <input type="text" id="nomedisp" />
                    </div>
                    <div id="tipodisp">
                        <label htmlFor="tipodisp">Tipo do dispositivo:</label>
                        <input type="text" id="tipodisp" />
                    </div>
                    <div id="so">
                        <label htmlFor="so">Sistema operacional:</label>
                        <input type="text" id="so" />
                    </div>
                    <button onClick={handleFormSubmit}>Adicionar dispositivo</button>
                </form>
            </div>
        </>
    )
}

export default Cadastro;