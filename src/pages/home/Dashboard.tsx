import React from 'react';
import '../home/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUsersGear, faExclamationCircle, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header/Header';
import Logs from '../../components/logs/Logs';

function Dashboard() {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <div className='container-principal'>
                <div className='header-button-component'><Header /></div>
                <div className="card">
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Emails Enviados Hoje
                        </p>
                        <p className="percent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                                </path>
                            </svg> 80%
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            1234
                        </p>
                        <div className="range">
                            <div className="fill">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faExclamationCircle} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Emails Falhados Hoje
                        </p>
                        <p className="percent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                                </path>
                            </svg> 5%
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            50
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: '5%' }}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faCalendarDay} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Total Emails enviados
                        </p>
                        <p className="percent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                                </path>
                            </svg> 100%
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            12
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: '100%' }}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faCalendarDay} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Emails Restantes
                        </p>
                        <p className="percent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                                </path>
                            </svg> 100%
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            12
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: '100%' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line-separator'></div>
            <div className='container-logs'>
                <Logs />
            </div>
            
        </div>
    )
}

export default Dashboard;
