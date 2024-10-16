import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import AccountsPage from './components/Accounts.js';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState("");

  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="*" element={<div> Not Found or You do not have permission.</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
