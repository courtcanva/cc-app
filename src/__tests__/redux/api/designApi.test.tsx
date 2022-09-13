import { fetchDesignData, useGetDesignQuery } from "@/redux/api/designApi";
import renderWithMockedProvider from "../../utils";
import React from "react";

const setup = () => {
  const returnVal = {};

  const UseGetDesignQueryTest = () => {
    const { data, isLoading } = useGetDesignQuery("001");
    Object.assign(returnVal, { data: isLoading ? [] : data });
    return null;
  };

  renderWithMockedProvider(<UseGetDesignQueryTest />);
  return returnVal;
};

describe("designApi", () => {
  it("should return design", async () => {
    const response = await fetchDesignData("001");
    expect(response.data).toEqual([]);
  });

  it("should get user design", () => {
    const response = setup();
    expect(response).toEqual({ data: [] });
  });
});
