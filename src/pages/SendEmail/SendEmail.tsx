import React, { useState, useEffect } from 'react';
import '../SendEmail/SendEmail.css';
import axios from 'axios';
import Header from '../../components/header/Header';
import Cookies from 'js-cookie';
import { parseCookies } from "nookies";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faX } from '@fortawesome/free-solid-svg-icons';

function SendEmail() {
    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            if (error) {
                setError('');
            }
        }, 3000);

        // Timeout para limpar a mensagem de sucesso
        const successTimeout = setTimeout(() => {
            if (success) {
                setSuccess('');
            }
        }, 3000);

        setTimeout(() => {
            setIsVisible(true);
        }, 100); // Pequeno delay para ativar a animação

        return () => {
            clearTimeout(errorTimeout);
            clearTimeout(successTimeout);
        };



    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const [templateType, setTemplateType] = useState("ALERT"); // Valor padrão inicial
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [checkboxHabilitado, setCheckboxHabilitado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadResponse, setUploadResponse] = useState(null);



    const handleUploadCsv = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("accessToken");

        if (!token) {
            setError("Usuário não autenticado. Faça login novamente.");
            return;
        }

        const fileInput = document.getElementById("csvFileInput") as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (!file) {
            setError("Nenhum arquivo CSV selecionado.");
            return;
        }

        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/send/email/upload/csv",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Armazena a resposta no estado
            setUploadResponse(response.data);

            fileInput.value = "";
            setFileName(null);
        } catch (err) {
            console.error("Erro ao enviar arquivo CSV:", err.response?.data || err.message);
            setError(`Falha ao enviar arquivo CSV: ${err.response?.data?.message || err.message}`);
        }
    };


    const [formData, setFormData] = useState<{
        from: string;
        subject: string;
        pOne: string;
        pTwo: string;
        urlButton: string;
        urlBanner: string;
        type: string;
        clients: any[]; // Permite armazenar qualquer tipo de cliente
    }>({
        from: '',
        subject: '',
        pOne: '',
        pTwo: '',
        urlButton: '',
        urlBanner: '',
        type: '',
        clients: []
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Atualiza apenas o campo específico
        }));

        if (name === "type") {
            setTemplateType(value); // Atualiza o template somente quando for o campo "type"
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        const token = Cookies.get('accessToken');

        if (!token) {
            setError("Usuário não autenticado. Faça login novamente.");
            return;
        }

        setLoading(true); // Inicia o carregamento

        try {
            let updatedClients: any[] = [];

            if (checkboxHabilitado) {
                // Buscar os clients já salvos no banco de dados
                const clientsResponse = await axios.get("http://localhost:8080/api/v1/clients/get/all/no-pageable", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                updatedClients = Array.isArray(clientsResponse.data) ? clientsResponse.data : [];
            } else {
                // Usar os clientes do último upload (evitando null)
                updatedClients = Array.isArray(uploadResponse) ? uploadResponse : [];
            }

            // Enviar e-mail com a lista correta de clientes
            await axios.post("http://localhost:8080/api/v1/send/email",
                { ...formData, clients: updatedClients },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setSuccess("Email enviado com sucesso!");

            // Aguarda 2 segundos antes de recarregar a página
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (err) {
            console.error("Erro ao enviar e-mail:", err);
            setError("Falha ao enviar e-mail.");
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };




    return (
        <div className='container-send-email-principal'>
            {error && <div className='alert alert-danger' style={{zIndex: "9999"}}><FontAwesomeIcon icon={faX} /> {error}</div>}
            {success && <div className='alert alert-success' style={{zIndex: "9999"}}><FontAwesomeIcon icon={faCheck} /> {success}</div>}
            <div style={{ position: "absolute", top: "5px", left: "5px" }}><Header /></div>

            <div className='container-send-email'>
                <div className='form-send-email'>
                    <h1 className='h1-send-email'>Envio de Emails</h1>
                    <form onSubmit={handleSendEmail}>
                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text">Conta Smtp</span>
                            <input
                                type="text"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>

                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text" id="inputGroup-sizing-default">Título</span>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text" id="inputGroup-sizing-default">Texto Primário</span>
                            <input
                                type="text"
                                name="pOne"
                                value={formData.pOne}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text" id="inputGroup-sizing-default">Texto Secundário</span>
                            <input
                                type="text"
                                name="pTwo"
                                value={formData.pTwo}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text" id="inputGroup-sizing-default">URL Botão</span>
                            <input
                                type="text"
                                name="urlButton"
                                value={formData.urlButton}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="input-group mb-3 send-email-input">
                            <span className="input-group-text" id="inputGroup-sizing-default">URL Imagem</span>
                            <input
                                type="text"
                                name="urlBanner"
                                value={formData.urlBanner}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            style={{ cursor: "pointer" }}
                        >
                            <option value="" disabled>Selecione o Template</option>
                            <option value="ALERT">Alerta</option>
                            <option value="PROMOTION">Promoção</option>
                            <option value="CHARGE">Cobrança</option>
                        </select>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                onChange={(e) => setCheckboxHabilitado(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                Enviar para todos os Clientes.
                            </label>


                        </div><br />

                        <button type="submit" className='btn btn-primary' style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}><FontAwesomeIcon icon={faEnvelope} /> Enviar Emails {loading && <div className="spinner-grow" role="status" style={{ position: "relative", height: "20px", width: "20px" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>}</button>
                    </form><br />
                    <form onSubmit={handleUploadCsv} style={{ width: "400px", margin: "auto" }}>
                        <label className="custum-file-upload" htmlFor="csvFileInput">
                            <div className="icon"></div>
                            <div className="text">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    height="80"
                                    fill="currentColor"
                                >
                                    {/* Ícone SVG */}
                                </svg>
                                <img src="https://cdn3.iconfinder.com/data/icons/ikooni-outline-file-formats/128/files2-19-512.png" alt="" width={"20%"} />
                                <span>Clique aqui para enviar o Arquivo.CSV</span>
                            </div>
                            <input
                                type="file"
                                id="csvFileInput"
                                name="file"
                                accept=".csv"
                                required
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFileName(file.name); // Atualiza o nome do arquivo selecionado
                                    }
                                }}
                            />
                        </label>
                        <br />
                        {/* Exibe o nome do arquivo selecionado */}
                        {fileName && <p>Arquivo selecionado: <strong>{fileName}</strong></p>}
                        <button type="submit" className='btn btn-add-client'>
                            Fazer o Upload do arquivo CSV
                        </button>
                    </form>
                </div>

                <div className={`template-send-email ${isVisible ? 'fade-in' : ''}`}>
                    {templateType === "PROMOTION" && (
                        <table width="100%" cellSpacing={0} cellPadding={0} style={{ borderCollapse: 'collapse', display: "block" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <table width="355" cellSpacing={0} cellPadding={0} style={{ backgroundColor: '#ffffff', border: '1px solid #E6E6E6' }}>
                                            {/* Header */}
                                            <tr style={{ backgroundColor: '#333333' }}>
                                                <td align="center" style={{ padding: '5px', color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
                                                    <img src="https://img.icons8.com/?size=100&id=12095&format=png&color=FFFFFF" width={30} height={30} alt="Gift" />
                                                    <h2 style={{ margin: '10px 0', wordBreak: "break-word", fontSize: "1em" }}>
                                                        {/* {formData.subject || "Título Default"} */}
                                                        Título Default
                                                    </h2>
                                                </td>
                                            </tr>
                                            {/* Content */}
                                            <tr>
                                                <td style={{ padding: '10px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
                                                    <p style={{ fontSize: '1em' }}>Olá <strong>Usuário</strong>, confira as promoções!</p>
                                                    <hr style={{ backgroundColor: 'gray', height: '5px' }} />
                                                    <br />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pOne || "Promoção incrível disponível agora!"}
                                                    </p>
                                                    <hr style={{ width: '150px', backgroundColor: 'rgb(218, 218, 218)', border: 'none', height: '2px' }} />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pTwo || "Aproveite antes que acabe!"}
                                                    </p>

                                                    <img
                                                        src={formData.urlBanner || "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-103.png?ssl=1"}
                                                        alt="Banner Promocional"
                                                        style={{ width: '45%', borderRadius: '10px', margin: '10px auto' }}
                                                    />
                                                    <br />
                                                    <hr />
                                                    <p>Se você tiver dúvidas sobre nossos serviços, visite nossa <a href="#" style={{ color: '#00aaff', textDecoration: 'none' }}>Central de Ajuda</a>.</p>
                                                    <p>Obrigado,<br /><strong>Nome da Empresa</strong></p>
                                                </td>
                                            </tr>
                                            {/* Button */}
                                            <tr>
                                                <td align="center" style={{ padding: '10px' }}>
                                                    <a

                                                        style={{
                                                            backgroundColor: '#00c6a9',
                                                            color: '#ffffff',
                                                            padding: '10px 20px',
                                                            textDecoration: 'none',
                                                            fontSize: '14px',
                                                            fontFamily: 'Arial, sans-serif',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        Acessar Agora!
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {templateType === "CHARGE" && (
                        <table width="100%" cellSpacing={0} cellPadding={0} style={{ borderCollapse: 'collapse', display: "block" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <table width="355" cellSpacing={0} cellPadding={0} style={{ backgroundColor: '#ffffff', border: '1px solid #E6E6E6' }}>
                                            {/* Header */}
                                            <tr style={{ backgroundColor: '#44a0ce' }}>
                                                <td align="center" style={{ padding: '5px', color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
                                                    <img src="https://img.icons8.com/?size=100&id=123507&format=png&color=FFFFFF" width={30} height={30} alt="Gift" />
                                                    <h2 style={{ margin: '10px 0', wordBreak: "break-word", fontSize: "1em" }}>
                                                        Título Default

                                                    </h2>
                                                </td>
                                            </tr>
                                            {/* Content */}
                                            <tr>
                                                <td style={{ padding: '10px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
                                                    <p style={{ fontSize: '1em' }}>Prezado <strong>Usuário</strong>,</p>
                                                    <hr style={{ backgroundColor: 'gray', height: '5px' }} />
                                                    <br />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pOne || "Exemplo de texto"}
                                                    </p>
                                                    <hr style={{ width: '150px', backgroundColor: 'rgb(218, 218, 218)', border: 'none', height: '2px' }} />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pTwo || "Exemplo de texto"}
                                                    </p>

                                                    <img
                                                        src={formData.urlBanner || "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-103.png?ssl=1"}
                                                        alt="Banner Promocional"
                                                        style={{ width: '50%', borderRadius: '10px', margin: '10px auto' }}
                                                    />
                                                    <br />
                                                    <hr />
                                                    <p>Se você tiver dúvidas sobre nossos serviços, visite nossa <a href="#" style={{ color: '#00aaff', textDecoration: 'none' }}>Central de Ajuda</a>.</p>
                                                    <p>Obrigado,<br /><strong>Nome da Empresa</strong></p>
                                                </td>
                                            </tr>
                                            {/* Button */}
                                            <tr>


                                                <td align="center" style={{ padding: '10px' }}>
                                                    <a
                                                        style={{
                                                            backgroundColor: '#44a0ce',
                                                            color: '#ffffff',
                                                            padding: '10px 20px',
                                                            textDecoration: 'none',
                                                            fontSize: '14px',
                                                            fontFamily: 'Arial, sans-serif',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        Pagar Agora!
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {templateType === "ALERT" && (
                        <table width="100%" cellSpacing={0} cellPadding={0} style={{ borderCollapse: 'collapse', display: "block" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <table width="355" cellSpacing={0} cellPadding={0} style={{ backgroundColor: '#ffffff', border: '1px solid #d4d4d4' }}>
                                            {/* Header */}
                                            <tr style={{ backgroundColor: '#ffd30d' }}>
                                                <td align="center" style={{ padding: '5px', color: '#1f1b1b', fontFamily: 'Arial, sans-serif' }}>
                                                    <img src="https://img.icons8.com/?size=100&id=8122&format=png&color=1f1b1b" width={30} height={30} alt="Gift" />
                                                    <h2 style={{ margin: '10px 0', wordBreak: "break-word", fontSize: "1em", color: "#1f1b1b" }}>
                                                        {/* {formData.subject || "Título do Email"} */}
                                                        Título Default

                                                    </h2>
                                                </td>
                                            </tr>
                                            {/* Content */}
                                            <tr>
                                                <td style={{ padding: '10px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
                                                    <p style={{ fontSize: '1em' }}>Prezado <strong>Usuário</strong>, leia esse email com atenção!</p>
                                                    <hr style={{ backgroundColor: 'gray', height: '5px' }} />
                                                    <br />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pOne || "Promoção incrível disponível agora!"}
                                                    </p>
                                                    <hr style={{ width: '150px', backgroundColor: 'rgb(218, 218, 218)', border: 'none', height: '2px' }} />
                                                    <p style={{ color: 'rgb(83, 81, 81)', padding: '5px', wordBreak: "break-word" }}>
                                                        {formData.pTwo || "Aproveite antes que acabe!"}
                                                    </p>

                                                    <img
                                                        src={formData.urlBanner || "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-103.png?ssl=1"}
                                                        alt="Banner Promocional"
                                                        style={{ width: '50%', borderRadius: '10px', margin: '10px auto' }}
                                                    />
                                                    <br />
                                                    <hr />
                                                    <p>Se você tiver dúvidas sobre nossos serviços, visite nossa <a href="#" style={{ color: '#00aaff', textDecoration: 'none' }}>Central de Ajuda</a>.</p>
                                                    <p>Obrigado,<br /><strong>Nome da Empresa</strong></p>
                                                </td>
                                            </tr>
                                            {/* Button */}
                                            <tr>


                                                <td align="center" style={{ padding: '10px' }}>
                                                    <a
                                                        style={{
                                                            backgroundColor: ' #ffd30d',
                                                            color: '#202020',
                                                            padding: '10px 20px',
                                                            textDecoration: 'none',
                                                            fontSize: '14px',
                                                            fontFamily: 'Arial, sans-serif',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        Ver Agora!
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div >
    )
}

export default SendEmail;
