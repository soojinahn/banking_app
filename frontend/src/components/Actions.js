import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function ActionsPage() {
    const { customerId, accountId } = useParams();
    const actions = ["Check Balance", "Deposit", "Withdraw"];
    const [selectAction, setAction] = useState("");
    
    const navigate = useNavigate();
    const curr_URL = useLocation().pathname;

    useEffect(() => {
        if (selectAction){
            let url = selectAction.replace(' ','').toLowerCase(); // Format action string for url
            navigate(curr_URL + url)
        }
      }, [navigate, selectAction]);
    
      return(
        <div>
            <h1>Customer: {customerId} Account:{accountId}</h1>
            {actions.map((action) => 
                <button class="button" onClick={() => setAction(action)}>{action}</button>
            )}
        </div>
    )
}