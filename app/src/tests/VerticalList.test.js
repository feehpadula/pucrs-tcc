import { render, screen } from "@testing-library/react";
import VerticalList from "../components/VerticalList";

describe("<VerticalList />", () => {
  test("should render vertical list with children", () => {
    render(
      <VerticalList>
        <span>child</span>
      </VerticalList>
    );
    const verticalListElement = screen.getByText(/child/i);
    expect(verticalListElement).toBeInTheDocument();
  });
});
