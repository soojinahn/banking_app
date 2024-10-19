import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CheckBalance() {
    const { customerId, accountId } = useParams();
    const [error, setError] = useState("");
    const [accountBal, setAccountBal] = useState(-1);
    
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
            <h2>{accountBal}</h2>
        </div>
    )

}