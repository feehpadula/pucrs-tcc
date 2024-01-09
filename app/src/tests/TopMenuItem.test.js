import { render, screen } from "@testing-library/react";
import TopMenuItem from "../components/TopMenuItem";

const topMenuItems = [
  { path: "/first", label: "first item" },
  { path: "/second", label: "second item" },
  { path: "/third", label: "third item" },
];

describe("<TopMenuItem />", () => {
  test("should render top menu items", () => {
    render(<TopMenuItem routes={topMenuItems} />);
    const topMenuItemElement = screen.getByText(/second item/i);
    expect(topMenuItemElement).toBeInTheDocument();
  });
});
