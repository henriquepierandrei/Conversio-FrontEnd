import React from 'react'
import '../emails/Themes.css'
import Header from '../../components/header/Header';
import alertTemplate from '../../assets/images/templates/alertEmail.png';
import chargeTemplate from '../../assets/images/templates/chargeEmail.png';
import promotionTemplate from '../../assets/images/templates/promotionEmail.png';


function Themes() {
  return (
    <div className="container-principal-theme" style={{ backgroundColor: "rgb(236, 236, 236)" }}>
      <div style={{ position: "absolute", left: "5px", top: "5px" }}><Header /></div>
      <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
        <div className='container-fluid'>
          <div className="card">
            <h3 style={{color: "rgb(161, 163, 22)", fontWeight: "900"}}>Template Alerta</h3>
            <img src={alertTemplate} alt="" className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Este modelo será usado para enviar e-mails para <strong style={{color: "gray"}}>alertar sobre perigos, golpes ou qualquer atividade maliciosa</strong> relacionada à sua empresa.</p>
            </div>
          </div>

          <div className="card">
          <h3 style={{color: "rgb(255, 52, 52)", fontWeight: "900"}}>Template Oferta</h3>
            <img src={promotionTemplate} alt="" className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Este modelo será usado para enviar e-mails para <strong style={{color: "gray"}}> promover seus serviços ou produtos.</strong></p>
            </div>
          </div>

          <div className="card">
          <h3 style={{color: "rgb(96, 142, 228)", fontWeight: "900"}}>Template Cobrança</h3>
            <img src={chargeTemplate} alt="" className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Este modelo será usado para enviar e-mails para aqueles que têm alguma <strong style={{color: "gray"}}>dívida financeira com sua empresa.</strong></p>
            </div>
          </div>
        </div></div>
    </div>
  )
}

export default Themes
