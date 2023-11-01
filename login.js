function Login() {
  const [status, setStatus] = React.useState("");
  const [loggedin, setLoggedin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    let localLoggedIn = false;
    ctx.users.map((user) => {
      if (user.email === email && user.password === password) {
        user.loggedin = true;
        localLoggedIn = true;
        setLoggedin(true);
      }
    });
    if (!localLoggedIn) {
      setStatus("Email or password invalid.");
      setTimeout(() => setStatus(""), 3000);
    }
  }

  function handleLogout() {
    ctx.users.map((user) => {
      user.loggedin = false;
      return "";
    });
    setLoggedin(false);
    setEmail("");
    setPassword("");
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

  return (
    <>
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={
          localLoggedIn === false ? (
            <>
              Email
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <p>{findCurrentAttribute("name")} is logged in.</p>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleLogout}
              >
                logout
              </button>
            </>
          )
        }
      />
    </>
  );
}
