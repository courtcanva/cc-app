import { render } from "@testing-library/react";
import EditorSideBarContent from "@/components/EditorSideBar/EditorSideBarContent";

describe("EditorSideBarContent", () => {
  it("Should render closing button", () => {
    const { getByRole } = render(
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
