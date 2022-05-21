import { render } from "@testing-library/react";
import CourtInfo from "@/components/PriceBar/CourtInfo";
import CourtIcon from "@/assets/svg/PriceBarSvg/courticon.svg";

test("should render the property successfully", () => {
  const courts = [
    { id: "1", name: "Court1", icon: <CourtIcon /> },
    { id: "2", name: "Court2", icon: <CourtIcon /> },
  ];

  const { getByText } = render(<CourtInfo courts={courts} />);
  expect(getByText(/Court1/i)).toBeInTheDocument();
});
