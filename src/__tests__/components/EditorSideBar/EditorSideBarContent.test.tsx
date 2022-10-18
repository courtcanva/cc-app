import { screen } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";
import EditorSideBarContent from "@/components/EditorSideBar/EditorSideBarContent";

describe("EditorSideBarContent", () => {
  it("Should render closing button", () => {
    renderWithMockedProvider(
      <EditorSideBarContent
        iconClickTitle="some title"
        onHandleCloseClick={() => {
          onclose;
        }}
      />
    );
    const buttonEel = screen.getByRole("button");
    expect(buttonEel).toBeInTheDocument();
  });
});
