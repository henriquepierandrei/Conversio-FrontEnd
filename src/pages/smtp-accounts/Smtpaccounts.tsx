import React from 'react'
import '../smtp-accounts/Smtpaccounts.css'
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faFilePen, faFilter, faTrash, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';


function Smtpaccounts() {
  return (
    <div className='container-smtp-account-principal'>
       <div style={{position: "absolute", top: "5px", left: "5px"}}><Header /></div>
      <div className='container-smtp-account'>
        <h1 className='title-smtp-container'><FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />Adicionar Conta SMTP</h1>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Host</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Host" style={{width: "60%"}}/>

            <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">Auth</label>

            <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btncheck2">Starttls</label>
          </div>
          <div>
            
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Porta</label>
          <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Porta" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Senha</label>
          <input type="password" className="form-control" id="formGroupExampleInput" placeholder="Senha" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">SSL Trust</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="SSL Trust" />
        </div>
        <button className='btn btn-create-smtp'>Adicionar Conta</button>
      </div>
      <div className='container-smtp-account-two'>
        <h1 className='title-smtp-container'><FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />Contas SMTPs</h1>
        <div style={{ overflow: "auto", width: "90%", textAlign: "start", borderRadius: "0.5em" }}>
          <table className="table table-striped tb-clients">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20%" }}>Host</th>
                <th scope="col" style={{ width: "5%" }}>Porta</th>
                <th scope="col" style={{ width: "20%" }}>Username</th>
                <th scope="col" style={{ width: "55%" }}>Auth</th>
                <th scope="col" style={{ width: "55%" }}>Starttls</th>
                <th scope="col" style={{ width: "55%" }}>SslTrust</th>


                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "5%" }}>xxxxxxxxxxxxxxxxx</td>
                <td>587</td>
                <td>xxxxxxxxxxxxxxxxx</td>
                <td>Ativado</td>
                <td>Ativado</td>
                <td>xxxxxxxxxxxxxxxxx</td>
                <div style={{ position: "relative", display: "inline-block", marginLeft: "10px", backgroundColor: "rgb(51, 140, 255)", border: "none", paddingRight: "0px", borderRadius: "1em", width: "max-content" }}>
                  <button className='actions-clients-logs-trash'><i><FontAwesomeIcon icon={faTrash} /></i></button>
                  <button className='actions-clients-logs-update'><i><FontAwesomeIcon icon={faFilePen} /></i></button>
                </div>
              </tr>
            </tbody>
          </table>
          
        </div>
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#"><FontAwesomeIcon icon={faArrowLeft} /></a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#"><FontAwesomeIcon icon={faArrowRight} /></a></li>
                </ul>
              </nav>
            </div>
      </div>
    </div>
  )
}

export default Smtpaccounts
