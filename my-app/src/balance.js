import * as React from "react";
import { createContext, useContext } from "react";
import findCurrentAttribute from "./findCurrentAttribute.js";
import Card from "./context.js";
import { UserContext } from "./usercontext.js";

export default function Balance() {
  const [status] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const ctx = useContext(UserContext);

  let localLoggedIn = false;
  if (findCurrentAttribute("name", ctx) !== null) localLoggedIn = true;
  if (balance === "") setBalance(findCurrentAttribute("balance", ctx));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={
          localLoggedIn ? (
            <>
              <div
                style={{
                  display: "inline-block",
                  width: "150px",
                  paddingBottom: "20px",
                }}
              >
                Balance
              </div>
              <div style={{ display: "inline-block" }}>{balance}</div>
              <br />
            </>
          ) : (
            <>
              <h5>Notice</h5>
              <p>You must be logged in to view your balance.</p>
              <br />
            </>
          )
        }
      />
    </>
  );
}
