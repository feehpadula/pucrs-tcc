import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";

describe("<Button />", () => {
  test("should render button with title", () => {
    render(<Button title="test title" />);
    const buttonElement = screen.getByText(/test title/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("should call onClick", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} title="test title" />);
    userEvent.click(screen.getByText(/test title/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shouldn't call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} title="test title" disabled={true} />);
    const buttonElement = screen.getByText(/test title/i);
    userEvent.click(screen.getByText(/test title/i));
    expect(buttonElement).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
