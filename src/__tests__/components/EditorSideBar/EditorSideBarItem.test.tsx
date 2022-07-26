import { render } from "@testing-library/react";
import EditorSideBarItem from "@/components/EditorSideBar/EditorSideBarItem";

describe("EditorSideBarItem", () => {
  const item = {
    title: "title",
    icon: "icon",
    onHandleIconClick: (title: string) => title,
    iconClick: "",
  };

  it("Should render the property successfully", () => {
    const { getByText } = render(
      <EditorSideBarItem
        key={item.title}
        title={item.title}
        icon={item.icon}
        onHandleIconClick={() => item.onHandleIconClick(item.title)}
        iconClickTitle=""
      />
    );

    expect(getByText(/title/i)).toBeInTheDocument();
  });
});
