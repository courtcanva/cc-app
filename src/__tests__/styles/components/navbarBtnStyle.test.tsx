import navbarBtnStyle from "../../../styles/components/navbarBtnStyle";

describe("Navbar styles", () => {
  const {
    bg,
    color,
    fontSize,
    _hover: { bg: hoverBg },
  } = navbarBtnStyle.variants.navbarIconBtn;

  test("background color should be transparent", () => {
    expect(bg).toBe("transparent");
  });
  test("color should be white", () => {
    expect(color).toBe("white");
  });
  test("fontSize should be xl", () => {
    expect(fontSize).toBe("xl");
  });
  test("hover background color should be #496A80", () => {
    expect(hoverBg).toBe("#496A80");
  });
  test("default size should be sm", () => {
    expect(navbarBtnStyle.defaultProps.size).toBe("sm");
  });
});
