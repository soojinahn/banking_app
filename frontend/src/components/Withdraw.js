import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Withdraw() {
    const { customerId, accountId } = useParams();
    const [error, setError] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    
    const validateAmount = () => {
        if (withdrawAmount > accountBalance) {
            setError("Not enough balance in account");
            return false;
        }
        setError("");
        return true;
    };

    const dataFilter = (amount) => {
        if (amount * 1 === 0) return;

        let number = parseFloat(amount);
        setWithdrawAmount(number.toFixed(2));
    };

    const handleSubmit = () => {

        if (!validateAmount()) return;

        dataFilter(withdrawAmount);
        if (accountBalance > 0) {
            setAccountBalance(parseFloat(accountBalance) - parseFloat(withdrawAmount));
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
                console.log("New balance: ", data.balance);
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
      }, []);

      useEffect(() => {
        if(isLoaded) {
            updateAccount();
        }
      }, [accountBalance]);

    return(
        <div>
            <input class="input" type="number" placeholder="Input amount" onChange={e => setWithdrawAmount(e.target.value)}/>
            <button class="button is-link" onClick={handleSubmit}>Submit</button>
        </div>
    )

}