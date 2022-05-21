import { render } from "@testing-library/react";
import EditorSideBarContent from "@/components/EditorSideBar/EditorSideBarContent";

describe("EditorSideBarContent", () => {
  it("Should render closing button", () => {
    const { getByRole } = render(<EditorSideBarContent />);
    expect(getByRole("button")).toBeInTheDocument();
  });
});
