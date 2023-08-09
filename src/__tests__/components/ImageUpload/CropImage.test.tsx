import renderWithMockedProvider from "../../utils";
import CropImage from "@/components/ImageUpload/CropImage";
import { fireEvent, screen } from "@testing-library/react";

describe("Crop Image component", () => {
  const setImage = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    renderWithMockedProvider(
      <CropImage name={"test"} picture={"test"} setImage={setImage} onClose={onClose} />
    );
  });

  it("should show Zoom, Rotation, Reset and Apply button", () => {
    expect(screen.getByText("Zoom")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Rotation")).toBeInTheDocument();
    expect(screen.getByText("0\u00B0")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Apply test")).toBeInTheDocument();
  });

  it("should change value when slide the zoom slider", async () => {
    const zoomSlider = screen.getByRole("slider", { name: /zoom-slider/i });
    fireEvent.change(zoomSlider, { target: { ariaValueNow: "2" } });
    setTimeout(() => expect(screen.getByText("200%")).toBeInTheDocument(), 0);
  });

  it("should change value when slide the rotation slider", async () => {
    const rotateSlider = screen.getByRole("slider", { name: /rotate-slider/i });
    fireEvent.change(rotateSlider, { target: { ariaValueNow: "180" } });
    setTimeout(() => expect(screen.getByText("180\u00B0")).toBeInTheDocument(), 0);
  });
});
