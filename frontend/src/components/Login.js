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

        const formDetails = new URLSearchParams();
        formDetails.append('username', email);
        formDetails.append('password', PIN);

        try {
            const response = await fetch(`http://localhost:8000/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formDetails,
        });

        setLoading(false);
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.access_token, "this is from data.token");
            localStorage.setItem('token', data.access_token);
            setToken(data.access_token);
            setId(data.customer_id);
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
