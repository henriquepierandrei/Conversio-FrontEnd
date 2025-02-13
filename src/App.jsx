import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/home/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Clients from "./pages/clients/Clients";
import Smtpaccounts from "./pages/smtp-accounts/Smtpaccounts";
import Themes from "./pages/emails/Themes";
import Account from "./pages/account/Account";
import PrivateRoute from "./routes/PrivateRoute"; // Seu componente de proteção

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        
        {/* Usando PrivateRoute para proteger as rotas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/contas-smtp" element={<Smtpaccounts />} />
          <Route path="/temas" element={<Themes />} />
          <Route path="/conta" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
