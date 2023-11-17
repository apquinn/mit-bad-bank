import * as React from "react";
import { useEffect } from "react";
import { findCurrentAttribute } from "./components/findAttribute.js";
import Card from "./components/SCard.js";
import { UserContext } from "./contexts/usercontext.js";
import DisplayField from "./components/DisplayField.js";

export default function Login() {
  const ctx = React.useContext(UserContext);
  const [loggedin, setLoggedin] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  console.log(loggedin);

  useEffect(() => {
    setEmail(findCurrentAttribute("email", ctx));
    setPassword(findCurrentAttribute("password", ctx));
  }, [ctx]);

  function validate(field, label) {
    if (field === "") {
      alert("Error: " + label + " is required");
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

        ctx.users.push({
          type: "login",
          name: user.name,
          email: user.email,
          action: "login",
          balance: user.balance,
        });
      }
      return "";
    });
    if (!localLoggedIn) {
      alert("Email or password invalid.");
    }
  }

  function handleLogout() {
    ctx.users.map((user) => {
      if (user.type === "user") {
        if (user.loggedin === true) {
          ctx.users.push({
            type: "login",
            name: user.name,
            email: user.email,
            action: "logout",
            balance: user.balance,
          });
        }
        user.loggedin = false;
      }
      return "";
    });
    setEmail("");
    setPassword("");
    setLoggedin(false);
  }

  let localLoggedIn = false;
  if (findCurrentAttribute("name", ctx) !== "") localLoggedIn = true;

  return (
    <>
      <Card
        bgcolor="primary"
        header="Login"
        status=""
        body={
          localLoggedIn === false ? (
            <>
              <DisplayField
                type="input"
                id="email"
                value={email}
                name="Email"
                handleChange={(e) => setEmail(e.currentTarget.value)}
              />
              <DisplayField
                type="password"
                id="password"
                value={password}
                name="Password"
                handleChange={(e) => setPassword(e.currentTarget.value)}
              />
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
              <p>{findCurrentAttribute("name", ctx)} is logged in.</p>
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
