function Withdraw() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [withdrawl, setWithdrawl] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleWithdrawl() {
    if (!validate(withdrawl, "withdrawl")) return;

    ctx.users.map((user) => {
      let localBalance = Number(user.balance) - Number(withdrawl);
      if (localBalance < 0) {
        setStatus(
          "Your balance will not cover the amount you are trying to withdraw. Please try a smaller amount."
        );
        setTimeout(() => setStatus(""), 3000);
        setWithdrawl(0);
        return false;
      }
      user.balance = Number(user.balance) - Number(withdrawl);
      setBalance(Number(balance) - Number(withdrawl));
      setWithdrawl(0);
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
        header="Withdrawl"
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
              Withdrawl Amount
              <br />
              <input
                type="input"
                className="form-control"
                id="withdrawl"
                placeholder="withdrawl amount"
                value={withdrawl}
                onChange={(e) => setWithdrawl(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleWithdrawl}
              >
                Withdrawl
              </button>
            </>
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
