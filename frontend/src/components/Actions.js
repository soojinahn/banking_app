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
            navigate(curr_URL + '/' + url)
        }
      }, [selectAction]);
    
      return(
        <div>
            <section class="hero is-primary is-fullheight has-background-white">
            <div class="hero-body">
                <div class="container is-centered">
                <div class="columns is-centered"></div>
                    <div class="content">
                        <p class="title is-3">Account {accountId} actions:</p>
                        <div class="buttons">
                        {actions.map((action) => 
                            <button class="button" onClick={() => setAction(action)}>{action}</button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            </section>

        </div>
    )
}