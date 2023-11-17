import { render, screen } from "@testing-library/react";
import { App } from "../app";

test("User login component should render", () => {
  const { getByText, getByLabel } = render(<App />);

  console.log(getByText);
});
