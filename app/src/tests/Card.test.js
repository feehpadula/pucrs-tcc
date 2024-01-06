import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

describe("<Card />", () => {
  test("should render card with title", () => {
    render(<Card title="test title" />);
    const cardElement = screen.getByText(/test title/i);
    expect(cardElement).toBeInTheDocument();
  });

  test("should render card with children", () => {
    render(
      <Card>
        <span>child</span>
      </Card>
    );
    const cardElement = screen.getByText(/child/i);
    expect(cardElement).toBeInTheDocument();
  });
});
