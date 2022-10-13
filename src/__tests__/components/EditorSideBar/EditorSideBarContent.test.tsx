import renderWithMockedProvider from "../../utils";
import EditorSideBarContent from "@/components/EditorSideBar/EditorSideBarContent";

describe("EditorSideBarContent", () => {
  it("Should render closing button", () => {
    const { getByRole } = renderWithMockedProvider(
      <EditorSideBarContent
        iconClickTitle="some title"
        onHandleCloseClick={() => {
          onclose;
        }}
      />
    );
    expect(getByRole("button")).toBeInTheDocument();
  });
});
