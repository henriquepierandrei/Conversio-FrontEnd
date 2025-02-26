import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersRectangle, faPlusCircle, faMinusCircle, faRotate, faSearch, faMailBulk, faPaperPlane, faBorderTopLeft, faTimeline, faCalendar, faGears, faTrash, faChevronDown, faChevronUp, faUserPlus, faUserMinus, faUserGear, faAddressCard, faEdit, faHeader, faDownLong, faSquare, faX, faUser, faGear, faUserEdit, faBookOpen, faHistory, faUsersBetweenLines, faUsersViewfinder, faPersonChalkboard, faUsersGear, faDashboard, faBars } from '@fortawesome/free-solid-svg-icons';

import '../header/Header.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import necessário para os componentes funcionarem
import logo from '../../assets/images/logos/Logo.png';


function Header() {
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const toggleMailDropdown = () => setIsMailOpen(!isMailOpen);
  const toggleUserDropdown = () => setIsUserOpen(!isUserOpen);
  const toggleTemplateDropdown = () => setIsTemplateOpen(!isTemplateOpen);


  useEffect(() => {
    // Garante que o Bootstrap funcione corretamente
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container mt-5">
      <button className="btn-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <span className="material-symbols-outlined"><FontAwesomeIcon icon={faBars} style={{fontWeight: "900"}}/></span>
      </button>
      <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header" style={{ padding: "2% 5% 0% 5%" }}>
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={logo} alt="" style={{ width: "25%" }} />
          </h5>
          <button type="button" className="btn-closer" data-bs-dismiss="offcanvas" aria-label="Close"><FontAwesomeIcon icon={faX} className='icons-header' /></button>
        </div><br />

        <div className="accordion accordion-flush" id="accordionSmtp">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <a href="/dashboard">
              <button className="accordion-button collapsed no-arrow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSmtp" aria-expanded="false" aria-controls="flush-collapseSmtp">
                <FontAwesomeIcon icon={faDashboard} className='icons-header' />DashBoard
              </button>
              </a>
            </h2>
          </div>
        </div>


        <div className="accordion accordion-flush" id="accordionSmtp">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <a href="/conta">
              <button className="accordion-button collapsed no-arrow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSmtp" aria-expanded="false" aria-controls="flush-collapseSmtp">
                <FontAwesomeIcon icon={faUser} className='icons-header' />Minha Conta
              </button>
              </a>
            </h2>
          </div>
        </div>

        <div className="accordion accordion-flush" id="accordionEmail">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEmail" aria-expanded="false" aria-controls="flush-collapseEmail">
                <FontAwesomeIcon icon={faMailBulk} className='icons-header' />Email
              </button>
            </h2>
            <div id="flush-collapseEmail" className="accordion-collapse collapse" data-bs-parent="#accordionEmail">
              <a href="/enviar"><button className='btn-header'><FontAwesomeIcon icon={faPaperPlane} className='icons-header' />Enviar</button></a>
              <a href="/temas"><button className='btn-header'><FontAwesomeIcon icon={faBorderTopLeft} className='icons-header' />Temas</button></a>
              <a href="#"><button className='btn-header'><FontAwesomeIcon icon={faHistory} className='icons-header' />Logs</button></a>
            </div>
          </div>
        </div>

        <div className="accordion accordion-flush" id="accordionEmail">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <a href="/clientes">
              <button className="accordion-button collapsed no-arrow">
                <FontAwesomeIcon icon={faUsersBetweenLines} className='icons-header' />Clientes
              </button>
              </a>
            </h2>
            
          </div>
        </div>

        <div className="accordion accordion-flush" id="accordionSmtp">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <a href="/contas-smtp">
              <button className="accordion-button collapsed no-arrow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSmtp" aria-expanded="false" aria-controls="flush-collapseSmtp">
                <FontAwesomeIcon icon={faUsersGear} className='icons-header' />Contas SMTP
              </button>
              </a>
            </h2>
          </div>
        </div>




        <p style={{ color: "gray", fontWeight: "900" }}>Conversio - 2025</p>
      </div>

    </div>
  );
}

export default Header;
