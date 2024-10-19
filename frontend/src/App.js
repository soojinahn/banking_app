import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import AccountsPage from './components/Accounts';
import ActionsPage from './components/Actions'
import CheckBalance from './components/CheckBalance';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';

import { useState, useEffect } from 'react';

import 'bulma/css/bulma.min.css';
import "./index.css";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/accounts/:customerId" element={<AccountsPage />} />
          <Route path="/accounts/:customerId/:accountId" element={<ActionsPage />} />
          <Route path="/accounts/:customerId/:accountId/checkBalance" element={<CheckBalance />} />
          <Route path="/accounts/:customerId/:accountId/deposit" element={<Deposit />} />
          <Route path="/accounts/:customerId/:accountId/withdraw" element={<Withdraw />} />
          <Route path="*" element={<div> Not Found or You do not have permission.</div>}/>
        </Routes>
    </BrowserRouter>
  );
}
