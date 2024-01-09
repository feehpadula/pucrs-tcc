import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../components/Select";

const testOptions = [
  { value: "1", label: "first data option" },
  { value: "2", label: "second data option" },
  { value: "3", label: "third data option" },
];

const testChildren = () => {
  return (
    <Select>
      <option value="opt01">first child option</option>
      <option value="opt02">second child option</option>
      <option value="opt03">third child option</option>
    </Select>
  );
};

describe("<Select />", () => {
  test("should render select label", () => {
    render(<Select label="test label" />);
    const selectElement = screen.getByText(/test label/i);
    expect(selectElement).toBeInTheDocument();
  });

  test("should render select options by children", () => {
    render(testChildren());
    const selectElement = screen.getByText(/second child option/i);
    expect(selectElement).toBeInTheDocument();
  });

  test("should render select options by props", () => {
    render(<Select data={testOptions} />);
    const selectElement = screen.getByText(/second data option/i);
    expect(selectElement).toBeInTheDocument();
  });

  test("should receive option change", () => {
    render(<Select label="test label" id="test-label" data={testOptions} />);
    const optionElement = screen.getByLabelText(/test label/i);
    const firstOptionElement = screen.getByText(/first data option/i);
    const secondOptionElement = screen.getByText(/second data option/i);
    const thirdOptionElement = screen.getByText(/third data option/i);
    userEvent.selectOptions(optionElement, ["2"]);
    expect(firstOptionElement.selected).toBe(false);
    expect(secondOptionElement.selected).toBe(true);
    expect(thirdOptionElement.selected).toBe(false);
  });

  test("should call onChange", () => {
    const handleChange = jest.fn();
    render(
      <Select
        label="test label"
        id="test-label"
        data={testOptions}
        onChange={handleChange}
      />
    );
    const optionElement = screen.getByLabelText(/test label/i);
    const secondOptionElement = screen.getByText(/second data option/i);
    userEvent.selectOptions(optionElement, ["2"]);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
