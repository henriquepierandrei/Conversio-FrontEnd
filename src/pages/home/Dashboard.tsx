import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../home/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpenText, faUsersLine, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header/Header';
import Logs from '../../components/logs/Logs';

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
        <div style={{ width: "100%", height: "100vh" }}>
            <div className='container-principal'>
                <div className='header-button-component'><Header /></div>
                <div className="card" style={{height: "180px" }}>
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

                <div className="card" style={{height: "180px" }}>
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

                <div className="card" style={{height: "180px" }}>
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

                <div className="card" style={{height: "180px" }}>
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

        </div>
    )
}

export default Dashboard;
