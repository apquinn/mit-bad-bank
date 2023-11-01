function Balance() {
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const ctx = React.useContext(UserContext);

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
        header="Login"
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
