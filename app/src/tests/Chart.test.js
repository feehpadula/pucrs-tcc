import { render, screen } from "@testing-library/react";
import Chart from "../components/Chart";

const validItem = {
  id: 1,
  topicId: 1,
  name: "Test name",
  field01name: "Test field",
  field02name: null,
  dataRelation: 0,
  dataPresentation: 1,
  dataOutliers: 2,
  contributions: 10,
};

const invalidItem = {
  id: 1,
  topicId: 1,
  name: "Test name",
  field01name: null,
  field02name: null,
  dataRelation: 0,
  dataPresentation: 1,
  dataOutliers: 2,
  contributions: 10,
};

const validItemData = [
  {
    date: "2023",
    field01data: 1,
    contributions: 5,
  },
  {
    date: "2024",
    field01data: 2,
    contributions: 5,
  },
];

describe("<Chart />", () => {
  test("should render chart with valid data", () => {
    render(<Chart item={validItem} itemData={validItemData} />);
    const chartElement = screen.getByTestId("chart");
    expect(chartElement).toBeInTheDocument();
  });

  test("should render error with invalid data", () => {
    render(<Chart item={invalidItem} itemData={validItemData} />);
    const chartErrorElement = screen.getByText("Erro ao gerar visualização");
    expect(chartErrorElement).toBeInTheDocument();
  });

  test("should render error without data", () => {
    render(<Chart />);
    const chartErrorElement = screen.getByText("Erro ao gerar visualização");
    expect(chartErrorElement).toBeInTheDocument();
  });
});
