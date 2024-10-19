import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function AccountsPage() {
    const { customerId } = useParams();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [accountId, setAccountId] = useState(0);

    const curr_URL = useLocation().pathname;
    const navigate = useNavigate();

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
        if (accountId){
            navigate(curr_URL + "/" + accountId)
        }
      }, [accountId]);

    return(
        <div>
            <h2>Welcome, {name}</h2>
            {accounts.map((account) => (
                <button class="button" onClick={() => setAccountId(account.id)}>Account: {account.id}</button>
            ))}
        </div>
    );
}
