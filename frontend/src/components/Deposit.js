import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Deposit() {
    const { customerId, accountId } = useParams();
    const [error, setError] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    
    const navigate = useNavigate();

    const validateAmount = () => {
        if (depositAmount <= 0) {
            setError("Please input a valid amount");
            return false;
        }
        setError("");
        return true;
    };

    const dataFilter = (amount) => {
        if (amount * 1 === 0) return;

        let number = parseFloat(amount);
        setDepositAmount(number.toFixed(2));
    };

    const handleSubmit = () => {

        if (!validateAmount()) {
            setError("Please input a valid amount to deposit");
            return;
        }
        dataFilter(depositAmount);
        
        if (accountBalance > 0) {
            setAccountBalance(parseFloat(accountBalance) + parseFloat(depositAmount));
        }

        setLoaded(true);
    };

    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}/accounts/${accountId}`)
            if(response.ok) {
                const data = await response.json();
                setAccountBalance(data.balance);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Something went wrong.");
            }
        } catch (error) {
            setError("An error occured. Please try again later");
        }
    };

    const updateAccount = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}/accounts/${accountId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ balance: accountBalance })
            })
            if(response.ok) {
                const data = await response.json();
                setAccountBalance(data.balance);
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

      useEffect(() => {
        if(isLoaded) {
            updateAccount();
        }
      }, [accountBalance]);

    return(
        <div>
            <section class="hero is-primary is-fullheight has-background-white">
                <div class="hero-body">
                    <div class="container">
                    <div class="columns is-centered"></div>
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <div class="content">
                            <p class="subtitle is-5">Current balance: {accountBalance}</p>
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Input amount" onChange={e => setDepositAmount(e.target.value)} />
                                </div>
                                <div class="control">
                                    <button class="button is-link" onClick={handleSubmit}>
                                    Deposit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button class="button is-link mb-3" onClick={() => navigate(-1)}>Go Back</button>
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
    )

}