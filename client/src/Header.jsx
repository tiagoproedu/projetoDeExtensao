import { useState } from "react";
import { PiDetectiveDuotone } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import iconUser from "./assets/icon_user.png";

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id="header">
        <div id="logo">
          <a href="/">
            <PiDetectiveDuotone size={30} />
          </a>
          <h2>InfoGuard</h2>
        </div>
        <div id="menu">
          <Button variant="secondary" onClick={handleShow}>
            <MdMenu size={25} />
          </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="tituloMenu">
                <img alt={"icon_user"} src={iconUser} className="iconUser" />
                <div className="helloUser">
                  <h2>Olá,</h2>
                  <h2>Usuário</h2>
                  <h6>O que deseja fazer hoje ?</h6>
                </div>
                {/* <p>o que deseja hoje?</p> */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="offcanvasBody">
              <ul id="opcoesMenu">
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
