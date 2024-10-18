import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login.js';
import AccountsPage from './components/Accounts.js';
import ActionsPage from './components/Actions.js'
import { useState, useEffect } from 'react';

import 'bulma/css/bulma.min.css';
import "./index.css";

function App() {
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/accounts/:customerId" element={<AccountsPage />} />
        <Route path="/accounts/:customerId/:accountId" element={<ActionsPage />} />
        <Route path="*" element={<div> Not Found or You do not have permission.</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
