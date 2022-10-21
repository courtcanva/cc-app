/* eslint-disable require-jsdoc */
import canvasControlModel from "../../utils/canvasControlModel";
import { renderHook } from "@testing-library/react-hooks";
import { IZoomShift } from "../../interfaces/zoomShift";
import { Provider } from "react-redux";
import store from "../../store";
import React from "react";

let wrapper: ({ children }: { children: React.ReactElement }) => JSX.Element;
function resultData(mockZoomShift: IZoomShift) {
  const { result } = renderHook(() => canvasControlModel(mockZoomShift), {
    // @ts-expect-error: Can not find a reasonable type for wrapper yet
    wrapper,
    initialProps: {
      mockZoomShift,
    },
  });
  return result;
}
beforeEach(() => {
  // eslint-disable-next-line react/display-name
  wrapper = ({ children }: { children: React.ReactElement }) => (
    <Provider store={store}>{children}</Provider>
  );
});

describe("canvasControlModel hooks for calculate drag and redraw canvas", () => {
  const mockZoomShift: IZoomShift = {
    courtXLen: 28000,
    courtYLen: 15000,
    oriRatio: 0.020515151515151514,
    startPoint: {
      X: 2500,
      Y: 2500,
    },
  };
  const expectedDataResult = {
    dragActivate: false,
    dragStart: false,
    resetState: false,
    selectedColor: "none",
    zoomScale: 1,
  };

  it("should return currect result", () => {
    const result = resultData(mockZoomShift);
    expect(result.current.canvasStates).toEqual(expectedDataResult);
  });

  it("should run handleCursorChange", () => {
    const result = resultData(mockZoomShift);
    result.current.handleCursorChange();
    expect(window.document.body.style.cursor).toEqual("auto");
  });

  it("should run handleMouseDragStart", () => {
    const result = resultData(mockZoomShift);
    result.current.handleMouseDragStart();
    expect(window.document.body.style.cursor).toEqual("pointer");
  });
});
