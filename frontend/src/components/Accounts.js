import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function AccountsPage() {
    const { customerId } = useParams();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [accountId, setAccountId] = useState(0);
    const [validToken, setValidToken] = useState(true);

    const navigate = useNavigate();
    const curr_URL = useLocation().pathname;

    const fetchAccounts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}/`)
            if(response.ok) {
                const data = await response.json();
                setName(data.name);
                setAccounts(data.accounts);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Something went wrong.");
            }
        } catch (error) {
            setError("An error occured. Please try again later");
        }
    };

    useEffect(() => {
        fetchAccounts();
      }, [customerId]);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8000/verify-token/${token}`);

                console.log(response);
                if(!response.ok) {
                    throw new Error("Token verification failed");
                }
            } catch(error) {
                localStorage.removeItem('token');
                setValidToken(false);
            }
        };
        verifyToken();
        console.log("verified token");
    }, [navigate]);

    useEffect(() => {
        if (accountId){
            navigate(curr_URL + "/" + accountId)
        }
        if (!validToken){
            navigate("/");
        }
      }, [accountId, validToken]);

    return(
        <div>
            <section class="hero is-primary is-fullheight has-background-white">
            <div class="hero-body">
                <div class="container content">
                <div class="columns is-centered"></div>
                    <div class="column is-half">
                        <p class="subtitle is-5">Welcome, {name}</p>
                        <p class="title is-3">Please select an account</p>
                        <div class="buttons">
                            {accounts.map((account) => (
                                <button class="button" onClick={() => setAccountId(account.id)}>Account: {account.id}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                {error && 
                    <article class="message is-small is-warning">
                    <div class="message-header">
                        {error}
                        <button class="delete is-small" aria-label="delete"></button>
                    </div>
                    </article>
                }
            </section>
        </div>
    );
}
