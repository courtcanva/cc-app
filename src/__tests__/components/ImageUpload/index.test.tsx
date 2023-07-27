import renderWithMockedProvider from "../../utils";
import ImageUpload from "@/components/ImageUpload";
import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Image Upload component", () => {
  const switchUpload = jest.fn();
  const setImage = jest.fn();
  beforeEach(() => {
    renderWithMockedProvider(
      <ImageUpload name={"test"} isOpen={true} switchUpload={switchUpload} setImage={setImage} />
    );
  });

  it("should show the name on the modal header", () => {
    expect(screen.getByText("Upload test Image")).toBeInTheDocument();
  });

  it("should show the button of choose an image", () => {
    expect(screen.getByText("Choose an image")).toBeInTheDocument();
  });

  test("upload file with correct file", () => {
    const corrrectFile = new File([], "test.png", { type: "image/png" });
    const input = screen.getByLabelText("upload file") as HTMLInputElement;

    user.upload(input, corrrectFile);

    expect(input.files?.item(0)).toStrictEqual(corrrectFile);
    expect(input.files).toHaveLength(1);
  });

  it("should call switchUpload with false when onClose is called", () => {
    user.click(screen.getByLabelText("Close"));
    expect(mockDispatch).toBeCalledWith(switchUpload(true));
  });
});
