import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../home/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpenText, faUsersLine, faEnvelopeCircleCheck, faArrowRight, faFilter, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header/Header';
import Logs from '../../components/logs/Logs';
import banner from "../../assets/images/banner-dashboard.jpg";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        emailsSentToday: 0,
        totalEmailsSent: 0,
        totalClients: 0,
        fullEmailCapicity: 0

    });
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = async () => {
        const token = Cookies.get("accessToken");

        if (!token) {
            setError("Usuário não autenticado. Faça login novamente.");
            return;
        }

        try {
            const response = await axios.get(
                'http://localhost:8080/api/v1/dashboard/get/datas',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Atribuindo valores padrão 0 caso algum campo seja null ou undefined
            setDashboardData({
                emailsSentToday: response.data.emailsSentToday ?? 0,
                totalEmailsSent: response.data.totalEmailsSent ?? 0,
                totalClients: response.data.totalClients ?? 0,
                fullEmailCapicity: response.data.fullEmailCapicity ?? 0

            });
        } catch (err) {
            setError("Falha ao buscar dados do dashboard: " + (err.response?.data?.message || err.message));
        }
    };


    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div style={{ width: "100%", height: "auto", paddingBottom: "50px" }}>
            <div className='container-principal'>
                <div className='header-button-component'><Header /></div>
                <div className="card" style={{ height: "180px" }}>
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Emails Enviados Hoje
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            {dashboardData.emailsSentToday}
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: `${(dashboardData.emailsSentToday / 100) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ height: "180px" }}>
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Total de Emails Enviados
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            {dashboardData.totalEmailsSent}
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: `${(dashboardData.totalEmailsSent / 100) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ height: "180px" }}>
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faUsersLine} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Total de Clientes
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            {dashboardData.totalClients}/100
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: `${(dashboardData.totalClients / 100) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ height: "180px" }}>
                    <div className="title">
                        <span>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className='icons-header' />
                        </span>
                        <p className="title-text">
                            Capacidade Total de Envios
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            {dashboardData.fullEmailCapicity}/5000
                        </p>
                        <div className="range">
                            <div className="fill" style={{ width: `${(dashboardData.fullEmailCapicity / 100) * 5}%` }}></div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='line-separator'></div>
            <div className='container-logs'>
                <Logs />
            </div>
            <div style={{ width: "100%", margin: "auto", display: "flex", gap: "10px" }} className='div-banner-texts'>
                <div style={{width: "100%"}}>
                <img src={banner} className="img-fluid" alt="..." style={{ borderRadius: "0.8em", height: "50vh", marginLeft: "1%" }} />
                </div>
                <div style={{ maxWidth: "100%" }} className='p-div-container-dashboard'>
                    <h1 className='title' style={{fontSize: "3em", padding: "20px", textAlign:"start", lineHeight: "1em"}}>Oque você precisa saber sobre Automação de E-mails</h1>
                    <p style={{color: "gray", fontSize: "1.5em"}}>
                        A automação de e-mails permite que você envie <strong>mensagens personalizadas</strong>
                         no momento certo para cada lead ou cliente, <strong>aumentando as chances de
                         engajamento e conversão</strong>. Com ela, é possível criar fluxos de nutrição,
                        segmentar contatos e otimizar suas campanhas de marketing digital.
                    </p><hr />
                    <ul style={{color: "gray"}}>
                        <li style={{fontSize:"1.3em"}}> <FontAwesomeIcon icon={faArrowRight} style={{color: "rgb(49, 118, 182)"}}/> Fluxos de automação para cada etapa do objetivo!</li>
                        <li style={{fontSize:"1.3em"}}> <FontAwesomeIcon icon={faFilter} style={{color: "rgb(49, 118, 182)"}}/> Segmentação avançada de leads</li>
                        <li style={{fontSize:"1.3em"}}> <FontAwesomeIcon icon={faChartSimple} style={{color: "rgb(49, 118, 182)"}}/> Métricas para otimizar resultados</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
