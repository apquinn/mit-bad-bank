import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../app";
import React from "react";
import "@testing-library/jest-dom";

test("User login component should render", async () => {
  const { getByText, getByLabelText } = render(<App />);

  getByText("Welcome to the bank");

  await fireEvent.click(screen.getByText("Login"));
  expect(screen.getByText("Login")).toBeInTheDocument();

  fireEvent.change(getByLabelText("Email"), {
    target: { value: "abel@mit.edu" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "secret" },
  });

  fireEvent.click(getByText("Login"));
});
