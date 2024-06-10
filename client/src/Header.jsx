import { useState } from 'react';
import { PiDetectiveDuotone } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div id='header'>
                <div id='logo'>
                    <a href="/"><PiDetectiveDuotone size={30}/></a>
                    <h2>InfoGuard</h2>
                </div>
                <div id='menu'>
                    <Button variant="secondary" onClick={handleShow}>
                        <MdMenu size={25}/>
                    </Button>

                    <Offcanvas show={show} onHide={handleClose} placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='tituloMenu'>
                                <h2>Olá, Usuário</h2>
                                <p>o que deseja hoje?</p>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul id='opcoesMenu'>
                                <li>Perfil</li>
                                <li>Ajuda e Suporte</li>
                                <li>Configurações gerais</li>
                                <li>Sair da conta</li>
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>
        </>
    );
}

export default Header;