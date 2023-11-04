import * as React from "react";
import findCurrentAttribute from "./findCurrentAttribute.js";
import DisplayAmountForm from "./DisplayAmountForm.js";
import handleTransaction from "./handleTransaction.js";
import Card from "./context.js";
import { UserContext } from "./usercontext.js";

export default function Withdraw() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [withdrawl, setWithdrawl] = React.useState("");
  const ctx = React.useContext(UserContext);

  let localLoggedIn = false;
  if (findCurrentAttribute("name", ctx) !== null) localLoggedIn = true;

  if (balance === "") setBalance(findCurrentAttribute("balance", ctx));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Withdrawl"
        status={status}
        body={
          localLoggedIn ? (
            <DisplayAmountForm
              balance={balance}
              setAmount={setWithdrawl}
              amount={withdrawl}
              type="Withdrawl"
              handleOnclick={() =>
                handleTransaction(
                  Number(withdrawl),
                  setWithdrawl,
                  ctx,
                  balance,
                  setBalance,
                  setStatus,
                  "withdrawl"
                )
              }
            />
          ) : (
            <>
              <h5>Notice</h5>
              <p>You must be logged in to make a withdrawl.</p>
              <br />
            </>
          )
        }
      />
    </>
  );
}
