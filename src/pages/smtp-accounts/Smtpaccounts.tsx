import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { parseCookies } from "nookies";
import '../smtp-accounts/Smtpaccounts.css';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheck, faFilePen, faFilter, faTrash, faUserPlus, faUsers, faX } from '@fortawesome/free-solid-svg-icons';

interface SmtpAccount {
  id: number;
  host: string;
  port: number;
  username: string;
  auth: boolean;
  starttls: boolean;
  sslTrust: string;
}

const Smtpaccounts = () => {
  const [id, setId] = useState<number | null>(null);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sslTrust, setSslTrust] = useState('');
  const [auth, setAuth] = useState(false);
  const [starttls, setStarttls] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [smtpAccounts, setSmtpAccounts] = useState<SmtpAccount[]>([]);
  const [showUpdateFields, setShowUpdateFields] = useState(false);

  // Função para buscar as contas SMTP
  const fetchSmtpAccounts = async () => {
    const cookies = parseCookies();
    const token = cookies["accessToken"];

    if (token) {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/smtpaccount/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSmtpAccounts(response.data); // Armazenando as contas SMTP na tabela
      } catch (error) {
        console.error("Erro ao buscar contas SMTP:", error);
      }
    }
  };

  // Função para deletar a conta SMTP
  const handleDeleteSmtpAccount = async (id: number) => {
    const token = Cookies.get('accessToken'); // Pegando o token salvo nos cookies

    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/v1/smtpaccount/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Conta SMTP deletada com sucesso!");
      fetchSmtpAccounts(); // Atualiza a lista após excluir a conta
    } catch (err) {
      console.error("Erro ao deletar conta SMTP:", err);
      setError("Falha ao deletar conta SMTP.");
    }
  };

  // Função para criar uma conta SMTP
  const handleCreateSmtpAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('accessToken'); // Pegando o token salvo nos cookies

    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/smtpaccount/create", {
        host,
        auth,
        starttls,
        port,
        username,
        password,
        sslTrust
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
          "Content-Type": "application/json"
        }
      });

      setSuccess("Conta SMTP criada com sucesso!");
      fetchSmtpAccounts(); // Atualiza a lista após criar a conta
    } catch (err) {
      console.error("Erro ao criar conta SMTP:", err);
      setError("Falha ao criar conta SMTP.");
    }
  };

  // Função para preencher os campos de atualização com os dados da conta selecionada
  const handleEditSmtpAccount = (account: SmtpAccount) => {
    setId(account.id);
    setHost(account.host);
    setPort(account.port.toString());
    setUsername(account.username);
    setSslTrust(account.sslTrust);
    setAuth(account.auth);
    setStarttls(account.starttls);
    setShowUpdateFields(true); // Mostra o formulário de atualização
  };

  // Função para atualizar a conta SMTP
  const handleUpdateSmtpAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("accessToken"); // Pegando o token salvo nos cookies
  
    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }
  
    // Verifique os valores antes de enviar a requisição
    console.log("Valores enviados:", {
      host,
      auth,
      starttls,
      port,
      username,
      password,
      sslTrust,
    });
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/smtpaccount/update?id=${id}`, // Endpoint de atualização
        {
          host,
          auth,
          starttls,
          port: parseInt(port), // Certifique-se de que a porta é um número
          username,
          password,
          sslTrust,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
            "Content-Type": "application/json",
          },
        }
      );
  
      setSuccess("Conta SMTP atualizada com sucesso!");
      fetchSmtpAccounts(); // Atualiza a lista após a atualização
      setShowUpdateFields(false); // Oculta os campos de atualização após o sucesso
  
      // Limpa os estados após a atualização
      setId(null);
      setHost("");
      setPort("");
      setUsername("");
      setPassword("");
      setSslTrust("");
      setAuth(false);
      setStarttls(false);
    } catch (err) {
      console.error("Erro ao atualizar conta SMTP:", err.response?.data || err.message);
      setError("Falha ao atualizar conta SMTP: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchSmtpAccounts();

    // Timeout para limpar a mensagem de erro
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

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, success]);

  return (
    <div className='container-smtp-account-principal'>
      <div style={{ position: "absolute", top: "5px", left: "5px" }}><Header /></div>

      {/* Formulário de criação de conta SMTP */}
      <div className='container-smtp-account'>
        <h1 className='title-smtp-container'><FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />Adicionar Conta SMTP</h1>
        {error && <div className='alert alert-danger'><FontAwesomeIcon icon={faX} /> {error}</div>}
        {success && <div className='alert alert-success'><FontAwesomeIcon icon={faCheck} /> {success}</div>}
        <form onSubmit={handleCreateSmtpAccount} className='form-smtp'>
          <div className='mb-3'>
            <label className='form-label'>Host</label>
            <input type='text' className='form-control' value={host} onChange={(e) => setHost(e.target.value)} placeholder='Host' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Porta</label>
            <input type='number' className='form-control' value={port} onChange={(e) => setPort(e.target.value)} placeholder='Porta' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input type='email' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Senha</label>
            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Senha' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>SSL Trust</label>
            <input type='text' className='form-control' value={sslTrust} onChange={(e) => setSslTrust(e.target.value)} placeholder='SSL Trust' required />
          </div>
          <div className='form-check form-switch'>
            <input className='form-check-input' type='checkbox' id='auth' checked={auth} onChange={(e) => setAuth(e.target.checked)} />
            <label htmlFor='auth'> Auth</label>
          </div>
          <div className='form-check form-switch'>
            <input type='checkbox' className='form-check-input' id='starttls' checked={starttls} onChange={(e) => setStarttls(e.target.checked)} />
            <label htmlFor='starttls'> Starttls</label>
          </div><br />
          <button type='submit' className='btn btn-create-smtp'>Adicionar Conta</button>
        </form>
      </div>

      {/* Lista de contas SMTP */}
      <div className='container-smtp-account-two'>
        <h1 className='title-smtp-container'><FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />Contas SMTPs</h1>
        <div style={{ overflow: "auto", width: "90%", textAlign: "start", borderRadius: "0.5em" }}>
          <table className="table table-striped tb-clients">
            <thead>
              <tr>
                <th scope="col" style={{ width: "5%" }}>Id</th>
                <th scope="col" style={{ width: "20%" }}>Host</th>
                <th scope="col" style={{ width: "5%" }}>Porta</th>
                <th scope="col" style={{ width: "20%" }}>Username</th>
                <th scope="col" style={{ width: "15%" }}>Auth</th>
                <th scope="col" style={{ width: "15%" }}>Starttls</th>
                <th scope="col" style={{ width: "15%" }}>SslTrust</th>
                <th scope="col" style={{ width: "15%" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {smtpAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.host}</td>
                  <td>{account.port}</td>
                  <td>{account.username}</td>
                  <td>{account.auth ? "Ativado" : "Desativado"}</td>
                  <td>{account.starttls ? "Ativado" : "Desativado"}</td>
                  <td>{account.sslTrust}</td>
                  <td>
                    <div style={{ position: "relative", display: "inline-block", marginLeft: "5px", backgroundColor: "rgb(51, 140, 255)", border: "none", padding: "5px 5px 5px 10px", borderRadius: "1em", width: "max-content" }}>
                      <button onClick={() => handleDeleteSmtpAccount(account.id)} className='actions-clients-logs-trash'><FontAwesomeIcon icon={faTrash} /></button>
                      <button onClick={() => handleEditSmtpAccount(account)} className='actions-clients-logs-update'><FontAwesomeIcon icon={faFilePen} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulário de atualização de conta SMTP */}
      {showUpdateFields && (
        <>
          {/* Overlay para escurecer o fundo */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 1000,
            }}
          ></div>

          {/* Card de atualização */}
          <div
            className="card p-4"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              width: "90%",
              maxWidth: "500px",
            }}
          >
            {/* Botão para fechar */}
            <button
              onClick={() => setShowUpdateFields(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#000",
              }}
            >
              &times;
            </button>

            <h3 className="card-title mb-4">Atualizar Conta SMTP</h3>
            <form onSubmit={handleUpdateSmtpAccount}>
              <div className="mb-3">
                <label htmlFor="host" className="form-label">Host:</label>
                <input
                  type="text"
                  id="host"
                  className="form-control"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="port" className="form-label">Porta:</label>
                <input
                  type="number"
                  id="port"
                  className="form-control"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sslTrust" className="form-label">SSL Trust:</label>
                <input
                  type="text"
                  id="sslTrust"
                  className="form-control"
                  value={sslTrust}
                  onChange={(e) => setSslTrust(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="auth"
                  className="form-check-input"
                  checked={auth}
                  onChange={(e) => setAuth(e.target.checked)}
                />
                <label htmlFor="auth" className="form-check-label">Autenticação (auth)</label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="starttls"
                  className="form-check-input"
                  checked={starttls}
                  onChange={(e) => setStarttls(e.target.checked)}
                />
                <label htmlFor="starttls" className="form-check-label">STARTTLS</label>
              </div>
              <button type="submit" className="btn btn-success">Salvar Alterações</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Smtpaccounts;