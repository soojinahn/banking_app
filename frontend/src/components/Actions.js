import { useState } from "react";
import checkBalance from './CheckBalance.js';
import deposit from './Deposit.js';
import withdraw from './Withdraw.js';

export default function ActionsPage(props) {
    const actions = ["Check Balance", "Deposit", "Withdraw"];
    const customer_account = props.data;

    return(
        <div>
            <h1>Account:{customer_account}</h1>
            {actions.map((action) => 
                <button class="button">{action}</button>
            )}
        </div>
    )

}