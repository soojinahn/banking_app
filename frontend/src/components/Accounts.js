import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AccountsContext = React.createContext({
    accounts: [], fetchAccounts: () => {}
})

export default function AccountsPage() {
    const { customerid } = useParams();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerid}/`)
       
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
      }, [customerid]);

    return(
        <div>
            <h2>Welcome, {name}</h2>
            <AccountsContext.Provider value={{accounts, fetchAccounts}}>
                {accounts.map((account) => (
                    <button>Account: {account.id}</button>
                ))}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </AccountsContext.Provider>
        </div>
    );
}
