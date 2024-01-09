import { render, screen } from "@testing-library/react";
import Tags from "../components/Tags";

const tags = ["first tag", "second tag", "third tag"];

describe("<Tags />", () => {
  test("should render tags", () => {
    render(<Tags tags={tags} />);
    const tagsElement = screen.getByText(/second tag/i);
    expect(tagsElement).toBeInTheDocument();
  });
});
