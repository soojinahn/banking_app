import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CheckBalance() {
    const { customerId, accountId } = useParams();
    const [error, setError] = useState("");
    const [accountBal, setAccountBal] = useState(-1);
    
    const navigate = useNavigate();

    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}/accounts/${accountId}`)
            if(response.ok) {
                const data = await response.json();
                setAccountBal(data.balance);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Something went wrong.");
            }
        } catch (error) {
            setError("An error occured. Please try again later");
        }
    };

    useEffect(() => {
        fetchAccount();
      }, [accountId]);

    return(
        <div>
            <section class="hero is-primary is-fullheight has-background-white">
                <div class="hero-body">
                    <div class="container is-centered">
                    <div class="columns is-centered"></div>
                        <div class="content">
                            <p class="subtitle is-5">Account {accountId}</p>
                            <p class="title is-3">Balance {accountBal}</p>
                        </div>
                        <button class="button is-link" onClick={() => navigate(-1)}>Go Back</button>
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
    )

}