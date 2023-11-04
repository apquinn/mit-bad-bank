import * as React from "react";
import { createContext } from "react";
import findCurrentAttribute from "./findCurrentAttribute.js";
import DisplayAmountForm from "./DisplayAmountForm.js";
import handleTransaction from "./handleTransaction.js";
import Card from "./context.js";
import { UserContext } from "./usercontext.js";

export default function Deposit() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [deposit, setDeposit] = React.useState("");
  const ctx = React.useContext(UserContext);

  let localLoggedIn = false;
  if (findCurrentAttribute("name", ctx) !== null) localLoggedIn = true;

  if (balance === "") setBalance(findCurrentAttribute("balance", ctx));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          localLoggedIn ? (
            <DisplayAmountForm
              balance={balance}
              setAmount={setDeposit}
              amount={deposit}
              type="Deposit"
              handleOnclick={() =>
                handleTransaction(
                  deposit,
                  setDeposit,
                  ctx,
                  balance,
                  setBalance,
                  setStatus,
                  "deposit"
                )
              }
            />
          ) : (
            <>
              <h5>Notice</h5>
              <p>You must be logged in to make a deposit.</p>
              <br />
            </>
          )
        }
      />
    </>
  );
}
