import NavBar from "./navbar.js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import Home from "./home.js";
import CreateAccount from "./createaccount.js";
import Login from "./login.js";
import Deposit from "./deposit.js";
import Withdraw from "./withdraw.js";
import Balance from "./balance.js";
import AllData from "./alldata.js";
import { UserContext } from "./usercontext.js";

function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
              loggedin: false,
            },
          ],
        }}
      >
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/balance/" element={<Balance />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
