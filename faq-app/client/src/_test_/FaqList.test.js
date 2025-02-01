import React from "react";
import { render, screen } from "@testing-library/react";
import FaqList from "../components/FaqList";

test("renders FAQ list component", () => {
  render(<FaqList />);
  expect(screen.getByText(/FAQs/i)).toBeInTheDocument();
});
