import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../components/Input";

describe("<Input />", () => {
  test("should render input with label", () => {
    render(<Input label="Test label" />);
    const inputElement = screen.getByText(/Test label/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("should receive text input", () => {
    render(<Input id="input-id" label="Test label" />);
    const inputElement = screen.getByLabelText(/Test label/i);
    userEvent.type(inputElement, "input text");
    expect(screen.getByDisplayValue("input text")).toBeInTheDocument();
  });
});
