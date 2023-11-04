import * as React from "react";
import { createContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./usercontext.js";

export default function AllData() {
  const ctx = React.useContext(UserContext);
  return (
    <>
      <h5>All Data in Store</h5>
      {JSON.stringify(ctx)}
      <br />
    </>
  );
}
