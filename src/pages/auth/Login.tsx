import React, { useState } from 'react';
import '../auth/Auth.css';
import logo from '../../assets/images/logos/Logo.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleLogin = async (e) => {
        e.preventDefault();
      
        if (!email || !password) {
          setError("Por favor, preencha todos os campos.");
          return;
        }
      
        try {
          const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
            email,
            password,
          });
      
          const { accessToken, refreshToken } = response.data;
      
          // Chama a função `login` do AuthContext para salvar os tokens e atualizar o estado
          login(accessToken);
      
          setSuccess("Login bem sucedido!");
      
          // Redireciona após 1 segundo
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
      
        } catch (err) {
          console.error("Erro no login:", err);
          setError("Credenciais inválidas!");
        }
      };
    

    return (
        <div className="container-principal-login">
            <div className="container-login">
                <div style={{ height: "100%", minWidth: "60%" }}>
                    <form className="form_container" onSubmit={handleLogin}>
                        <div className="logo_container"><img src={logo} alt="" /></div>
                        <div className="title_container">
                            <p className="title">Login na sua conta</p>
                            <span className="subtitle">
                                Comece agora a automatizar seus emails para ser mais produtivo e profissional!
                            </span>
                        </div>
                        <br />
                        <div className="input_container">
                            <label className="input_label" htmlFor="email_field">
                                Email
                            </label>
                            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                <path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                    stroke="#141B34"
                                    d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                                ></path>
                                <path
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    stroke="#141B34"
                                    d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                                ></path>
                            </svg>
                            <input
                                placeholder="xxxxxx@mail.com"
                                name="email"
                                type="email"
                                className="input_field"
                                id="email_field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input_container">
                            <label className="input_label" htmlFor="password_field">
                                Senha
                            </label>
                            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                <path
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                    stroke="#141B34"
                                    d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                                ></path>
                                <path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                    stroke="#141B34"
                                    d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                                ></path>
                            </svg>
                            <input
                                placeholder="Senha"
                                name="password"
                                type="password"
                                className="input_field"
                                id="password_field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button title="Sign In" type="submit" className="sign-in_btn">
                            <span>Login</span>
                        </button>

                    
                        {success && <div className='success-message'><FontAwesomeIcon icon={faCircleCheck} className='icons-header' />{success}</div>}

                        {error && <div className='error-message'><FontAwesomeIcon icon={faCircleXmark} className='icons-header' />{error}</div>}

                        <div className="separator">
                            <hr className="line" />
                            <span>Ou</span>
                            <hr className="line" />
                        </div>

                        <button title="Sign In" type="submit" className="sign-in_ggl">
                            <svg
                                height="18"
                                width="18"
                                viewBox="0 0 32 32"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <path
                                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                        id="A"
                                    ></path>
                                </defs>
                                <clipPath id="B"></clipPath>
                                <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                                    <path fill="#fbbc05" clipPath="url(#B)" d="M0 37V11l17 13z"></path>
                                    <path fill="#ea4335" clipPath="url(#B)" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                                    <path fill="#34a853" clipPath="url(#B)" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                                    <path fill="#4285f4" clipPath="url(#B)" d="M48 48L17 24l-4-3 35-10z"></path>
                                </g>
                            </svg>
                            <span>Login com Google</span>
                        </button>
                    </form>
                </div>
                <div className="img-banner-login" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div className="title_container" style={{ border: "1px solid white", width: "95%", padding: "3%", borderRadius: "1em" }}>
                        <p className="title" style={{ fontSize: "2em", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.29)", textAlign: "center", lineHeight: "1em" }}>Crie sua conta</p>

                        <br />
                        <span className="subtitle" style={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.26)" }}>
                            Crie sua conta agora e entre na nova era da tecnologia e aumente a produtividade do seu trabalho com automação de emails!
                        </span>
                        <br />
                        <a href="/registrar"><button className='btn-register-account' style={{width: "100%"}}>Criar Conta</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
