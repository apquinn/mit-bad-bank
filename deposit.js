function Deposit() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [deposit, setDeposit] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(deposit, "deposit")) return;

    ctx.users.map((user) => {
      if (user.loggedin === true) {
        user.balance = Number(user.balance) + Number(deposit);
        setBalance(Number(balance) + Number(deposit));
        setDeposit(0);
      }
    });
  }

  function findCurrentAttribute(attribute) {
    let selectedItem = "";
    ctx.users.forEach((user) => {
      if (user.loggedin === true) {
        if (attribute === "name") selectedItem = user.name;
        else if (attribute === "balance") selectedItem = user.balance;
      }
    });
    if (selectedItem !== "") return selectedItem;
    else return null;
  }

  let localLoggedIn = false;
  if (findCurrentAttribute("name") !== null) localLoggedIn = true;

  if (balance === "") setBalance(findCurrentAttribute("balance"));

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          localLoggedIn ? (
            <>
              <div
                style={{
                  display: "inline-block",
                  width: "150px",
                  "padding-bottom": "20px",
                }}
              >
                {" "}
                Balance
              </div>
              <div style={{ display: "inline-block" }}>{balance}</div>
              <br />
              Deposit Amount
              <br />
              <input
                type="input"
                className="form-control"
                id="deposit"
                placeholder="deposit amount"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </>
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
