import React from 'react'
import '../account/Account.css'
import Header from '../../components/header/Header';
import logo from '../../assets/images/logos/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendar, faCheck, faEnvelope, faEye, faGear, faIdCard, faIdCardAlt, faLock, faPencil, faX } from '@fortawesome/free-solid-svg-icons';

function Account() {
  return (
    <div className='container-user-principal'>
      <div><Header /></div>
      <div className='container-user sticky-sm-top'>
        <h1 className='title' style={{ padding: "25px" }}><FontAwesomeIcon icon={faGear} style={{ marginRight: "10px" }} />Informações da Conta</h1>
        
        
        <div className='container-user-inside'>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div><p style={{ margin: "1px 0px 0px 10px" }}><FontAwesomeIcon icon={faIdCardAlt} style={{ color: "rgb(136, 164, 255)" }} /> Nome</p></div>
            <div><p style={{ margin: "1px 10px 0px 0px" }}>*******************</p></div>
          </div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseNome" role="button" aria-expanded="false" aria-controls="collapseNome">
            <FontAwesomeIcon icon={faPencil} /> Alterar Nome
            </a>
          </div>
        </div>
        <div className="collapse" id="collapseNome">
          <div className="card card-body" style={{ marginTop: "0px" }}>
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <div className='container-user-inside'>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div><p style={{ margin: "1px 0px 0px 10px" }}><FontAwesomeIcon icon={faEnvelope} style={{ color: "rgb(136, 164, 255)" }} /> Email</p></div>
            <div><p style={{ margin: "1px 10px 0px 0px" }}>*******************</p></div>
          </div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseEmail" role="button" aria-expanded="false" aria-controls="collapseEmail">
              <FontAwesomeIcon icon={faPencil} /> Alterar Email
            </a>
          </div>
        </div>
        <div className="collapse" id="collapseEmail">
          <div className="card card-body" style={{ marginTop: "0px" }}>
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>


        <div className='container-user-inside'>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div><p style={{ margin: "1px 0px 0px 10px" }}><FontAwesomeIcon icon={faLock} style={{ color: "rgb(136, 164, 255)" }} /> Senha</p></div>
            <div><p style={{ margin: "1px 10px 0px 0px" }}>*******************</p></div>
          </div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseSenha" role="button" aria-expanded="false" aria-controls="collapseSenha">
              <FontAwesomeIcon icon={faPencil} /> Alterar Senha
            </a>
          </div>
        </div>
        <div className="collapse" id="collapseSenha">
          <div className="card card-body" style={{ marginTop: "0px" }}>
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>


        <div className='container-user-inside'>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div><p style={{ margin: "1px 0px 0px 10px" }}><FontAwesomeIcon icon={faCalendar} style={{ color: "rgb(136, 164, 255)" }} /> Conta criada em:</p></div>
            <div><p style={{ margin: "1px 10px 0px 0px" }}>11/11/1111</p></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Account
