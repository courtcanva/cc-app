import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("TopBar", () => {
  it("should render court name", () => {
    renderWithMockedProvider(<TopBar />);
  });

  it("should render width text", () => {
    renderWithMockedProvider(<TopBar />);
    const borderWidthTextElement = screen.getByTestId("borderIcon");

    expect(borderWidthTextElement).toBeInTheDocument();
    expect(borderWidthTextElement).toBeInTheDocument();
  });

  it("should render color select button", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("colorSelectBtn")).toBeTruthy();
  });

  it("should render upload image btn", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("uploadBtn")).toBeTruthy();
  });

  it("Should render Share button", () => {
    renderWithMockedProvider(<TopBar />);
    const downloadButton = screen.getByTestId("download-btn");
    expect(downloadButton).toBeInTheDocument();
  });

  // todo
  // it("should change value when slide the arrow", () => {
  //   renderWithMockedProvider(<TopBar />);
  //   const slider = screen.getByLabelText("slider");
  //   fireEvent.change(slider, { target: { ariaValueNow: "1" } });
  //   const sliderValue = screen.getByText("1m");
  //   expect(sliderValue).toBeInTheDocument();
  // });

  // todo
  // it("should open save button", () => {
  //   renderWithMockedProvider(<TopBar />);
  //   const saveBtn = screen.getByTestId("save-btn");
  //   fireEvent.click(saveBtn);
  //   expect("Log in or sign up in seconds").toBeInTheDocument();
  // });

  // todo
  // it("should delete design", () => {
  //   renderWithMockedProvider(<TopBar />);
  //   const delBtn = screen.getByLabelText("Bin");
  //   fireEvent.click(delBtn);
  //   expect("del").toBeInTheDocument();
  // });
});
