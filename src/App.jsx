import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/home/Dashboard.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import Clients from './pages/clients/Clients.tsx';
import Smtpaccounts from './pages/smtp-accounts/Smtpaccounts.tsx';
import Themes from './pages/emails/Themes.tsx';
import Account from './pages/account/Account.tsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/contas-smtp" element={<Smtpaccounts />} />
        <Route path="/temas" element={<Themes />} />
        <Route path="/conta" element={<Account />} />


      </Routes>
    </div>
  );
}

export default App;
