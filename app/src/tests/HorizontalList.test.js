import { render, screen } from "@testing-library/react";
import HorizontalList from "../components/HorizontalList";

describe("<HorizontalList />", () => {
  test("should render horizontal list with children", () => {
    render(
      <HorizontalList>
        <span>child</span>
      </HorizontalList>
    );
    const horizontalListElement = screen.getByText(/child/i);
    expect(horizontalListElement).toBeInTheDocument();
  });
});
