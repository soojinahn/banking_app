import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
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

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, pin: PIN })
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
            setLoading(false);
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
      }, [isLoggedIn]);

    return(
        <div className='login'>
           <section class="hero is-primary is-fullheight has-background-white">
            <div class="hero-body">
                <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                    <div class='login'>

                        <form class="box" onSubmit={handleSubmit}>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input class="input" type="email" placeholder="e.g. bobsmith@gmail.com" onChange={e => setEmail(e.target.value)} />
                                <span class="icon is-small is-left">
                                <i class="fa fa-envelope"></i>
                            </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">PIN</label>
                            <div class="control has-icons-left">
                                <input class="input" type="password" placeholder="****" onChange={e => setPIN(e.target.value)}/>
                            <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                            </span>  
                            </div>
                        </div>

                        <p class="help is-danger p-1">{error}</p>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" disabled={loading} type="submit">Submit</button>
                            </div>
                        </div>
                        </form>
                    </div>

                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        );
  }

Login.propTypes = {
    setToken: propTypes.func.isRequired,
}
