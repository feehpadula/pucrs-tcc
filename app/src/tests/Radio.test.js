import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Radio from "../components/Radio";

const testOptions = ["first option", "second option", "third option"];

describe("<Radio />", () => {
  test("should render radio with legend", () => {
    render(<Radio legend="test legend" data={testOptions} />);
    const radioElement = screen.getByText(/test legend/i);
    expect(radioElement).toBeInTheDocument();
  });

  test("should render radio with data", () => {
    render(<Radio data={testOptions} />);
    const radioElementOption = screen.getByText(/second option/i);
    expect(radioElementOption).toBeInTheDocument();
  });

  test("shouldn't render radio without data", () => {
    render(<Radio legend="test legend" />);
    const radioElement = screen.queryByText(/test legend/i);
    expect(radioElement).not.toBeInTheDocument();
  });

  test("should receive option change", () => {
    render(<Radio data={testOptions} />);
    const secondOptionElement = screen.getByLabelText(/second option/i);
    userEvent.click(secondOptionElement);
    expect(secondOptionElement).toBeChecked();
  });

  test("should call onChange", () => {
    const handleChange = jest.fn();
    render(<Radio data={testOptions} onChange={handleChange} />);
    userEvent.click(screen.getByText(/second option/i));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
