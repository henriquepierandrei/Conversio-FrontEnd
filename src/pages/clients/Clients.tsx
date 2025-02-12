import React from 'react'
import '../clients/Clients.css';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUsersGear, faExclamationCircle, faCalendarDay, faMailBulk, faFilter, faTrash, faFilePen, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


function Clients() {
  return (
    <div className='container-client-principal'>
      <div style={{ position: "absolute", top: "5px", left: "5px" }}><Header /></div>
      <div className='container-client'>
        <h1 className='title-container-client'>Adicione Clientes</h1><br />
        <form action="">
          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
            </div>
            <div className="text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="80"
                fill="currentColor"
              >
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path>
                </g>
              </svg>
              <span>Clique aqui para enviar o Arquivo.CSV</span>
            </div>
            <input type="file" id="file" className="form-control" />
          </label><br />
          <button className='btn btn-add-client'>Adicionar Clientes</button>
        </form>
      </div>


      <div className='container-client-two'>
        <div style={{ overflow: "auto", width: "90%", textAlign: "start", borderRadius: "0.5em" }}>
          <div className="input-group mb-3">
            <div className="dropdown">
              <div style={{ display: "flex" }}>
                <select className="form-select" aria-label="Default select example">
                  <option value="1">ID</option>
                  <option value="2">Nome</option>
                  <option value="3">WhatsApp</option>
                  <option value="3">Email</option>
                </select>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar Cliente"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-filter" type="button" id="button-addon2"><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px" }} />
              Filtrar</button>
          </div>
          <table className="table table-striped tb-clients">
            <thead>
              <tr>
                <th scope="col" style={{ width: "1%" }}>ID</th>
                <th scope="col" style={{ width: "35%" }}>Nome</th>
                <th scope="col" style={{ width: "20%" }}>WhatsApp</th>
                <th scope="col" style={{ width: "55%" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "5%" }}>1</td>
                <td className='td-name'>Joao Gomes</td>
                <td>32999583732</td>
                <td>testeste123arroba@gmail.com </td>
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

export default Clients
