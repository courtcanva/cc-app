import { ICourtRatioProps } from "@/interfaces/courtRatio";
import courtRatio from "../../utils/courtRatio";

describe("Adjust data based on ratio of the empty space", () => {
  it("should return the right data when the ratio of the empty space is greater than the ratio of the canvas", () => {
    const mockCourtRatioProps: ICourtRatioProps = {
      courtAreaX: 50,
      courtAreaY: 100,
      margin: 100,
      windowHeight: (1000 + 250) * 2,
      windowWidth: 1000 + 118,
    };

    const result = courtRatio(mockCourtRatioProps);
    expect(result).toStrictEqual({
      stageWidth: 1000,
      stageHeight: 1200,
      courtRatio: 4,
    });
  });

  it("should return the right data when the ratio of the empty space is greater than the ratio of the canvas and window width less then 768", () => {
    const mockCourtRatioProps: ICourtRatioProps = {
      courtAreaX: 50,
      courtAreaY: 100,
      margin: 100,
      windowHeight: (1000 + 250) * 2,
      windowWidth: 500 + 118,
    };

    const result = courtRatio(mockCourtRatioProps);
    expect(result).toStrictEqual({
      stageWidth: 650,
      stageHeight: 780,
      courtRatio: 2.6,
    });
  });
});

describe("Adjust data based on window height", () => {
  it("should return the right data while window height greater or equal to 768px", () => {
    const mockCourtRatioProps: ICourtRatioProps = {
      courtAreaX: 100,
      courtAreaY: 100,
      margin: 100,
      windowHeight: 1000,
      windowWidth: 1000,
    };

    const result = courtRatio(mockCourtRatioProps);
    expect(result).toStrictEqual({
      stageWidth: 750,
      stageHeight: 750,
      courtRatio: 2.5,
    });
  });

  it("should return the right data while window height less than 768px", () => {
    const mockCourtRatioProps: ICourtRatioProps = {
      courtAreaX: 100,
      courtAreaY: 59,
      margin: 100,
      windowHeight: 500,
      windowWidth: 1000,
    };

    const result = courtRatio(mockCourtRatioProps);
    expect(result).toStrictEqual({
      stageWidth: 600,
      stageHeight: 518,
      courtRatio: 2,
    });
  });
});
