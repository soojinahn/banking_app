import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken, setName }) {
    const [email, setEmail] = useState("");
    const [PIN, setPIN] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setLogIn] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !PIN) {
            setError("Username and password are required");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const formDetails = new URLSearchParams();
        formDetails.append('email', email);
        formDetails.append('pin', PIN);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formDetails,
        });

        setLoading(false);
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.token, "this is from data.token");
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setId(data.id);
            setLogIn(true);
        } else{
            const errorData = await response.json();
            setError(errorData.detail || "Authentication failed");
        }
        } catch (error) {
            setLoading(false);
            setError("An error occured. Please try again later");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/accounts/" + id);
        }
      }, [navigate, isLoggedIn]);

    return(
            <div className='login-wrapper'>
                <h2>Insert card not available. Please provide credentials</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>PIN Number</p>
                        <input type="password" onChange={e => setPIN(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </form>
            </div>
        );
  }

Login.propTypes = {
    setToken: propTypes.func.isRequired,
}
