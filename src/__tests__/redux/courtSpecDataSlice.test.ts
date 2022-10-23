import courtSpecDataReducer, {
  initialState,
  getCourtSpecData,
  setActiveCourt,
  updateBorderLength,
  setActiveDesign,
  setNewDesignActive,
  changeDesignName,
  getCourtNameString,
} from "@/store/reducer/courtSpecDataSlice";

describe("Court Specifications Reducer", () => {
  const courtSpec = [
    {
      courtId: "",
      courtName: "Pro Full Court",
      courtAreaXLength: 28000,
      courtAreaYLength: 15000,
      threePointLineToCourtEdgeLength: 900,
      cornerThreePointLineLength: 1575,
      threePointLineRadius: 6600,
      keyAreaWidth: 5790,
      keyAreaHeight: 4800,
      circleRadius: 1800,
      strokeWidth: 200,
      borderLength: 1000,
      designName: "Court Canva 1",
      customizeCourtAreaXLength: undefined,
      customizeCourtAreaYLength: undefined,
    },
  ];

  const initialCourtSpec = {
    courtsData: courtSpec,
    designsData: [],
    activeCourt: {
      courtId: "",
      courtName: "Pro Full Court",
      courtAreaXLength: 28000,
      courtAreaYLength: 15000,
      threePointLineToCourtEdgeLength: 900,
      cornerThreePointLineLength: 1575,
      threePointLineRadius: 6600,
      keyAreaWidth: 5790,
      keyAreaHeight: 4800,
      circleRadius: 1800,
      strokeWidth: 200,
      borderLength: 1000,
      designName: "Court Canva 1",
      customizeCourtAreaXLength: undefined,
      customizeCourtAreaYLength: undefined,
    },
    isLoading: true,
    isError: "",
  };

  const activeCourt = {
    courtsData: courtSpec,
    designsData: [],
    activeCourt: courtSpec[0],
    isLoading: true,
    isError: "",
  };

  const courtWithBorder = {
    courtsData: [],
    designsData: [],
    activeCourt: courtSpec[0],
    isLoading: true,
    isError: "",
  };

  const courtSpecWithId = {
    courtId: "001",
    courtName: "Pro Full Court",
    courtAreaXLength: 28000,
    courtAreaYLength: 15000,
    threePointLineToCourtEdgeLength: 900,
    cornerThreePointLineLength: 1575,
    threePointLineRadius: 6600,
    keyAreaWidth: 5790,
    keyAreaHeight: 4800,
    circleRadius: 1800,
    strokeWidth: 200,
    borderLength: 1000,
    designName: "Court Canva 1",
  };

  const courtSpecWithIdAndName = {
    courtId: "001",
    courtName: "Pro Full Court",
    courtAreaXLength: 28000,
    courtAreaYLength: 15000,
    threePointLineToCourtEdgeLength: 900,
    cornerThreePointLineLength: 1575,
    threePointLineRadius: 6600,
    keyAreaWidth: 5790,
    keyAreaHeight: 4800,
    circleRadius: 1800,
    strokeWidth: 200,
    borderLength: 1000,
    designName: "CourtCanva 2",
  };

  const designData = {
    courtsData: courtSpec,
    designsData: [courtSpecWithId],
    activeCourt: courtSpecWithId,
    isLoading: true,
    isError: "",
  };

  const changedDesignData = {
    courtsData: courtSpec,
    designsData: [courtSpecWithId],
    activeCourt: courtSpecWithIdAndName,
    isLoading: true,
    isError: "",
  };

  it("should get court data", () => {
    expect(courtSpecDataReducer(initialState, getCourtSpecData(courtSpec))).toStrictEqual(
      initialCourtSpec
    );
  });

  it("should set active court", () => {
    expect(courtSpecDataReducer(initialCourtSpec, setActiveCourt("Pro Full Court"))).toEqual(
      activeCourt
    );
  });

  it("should update border length", () => {
    expect(courtSpecDataReducer(initialState, updateBorderLength(1000))).toEqual(courtWithBorder);
  });

  it("should set active design", () => {
    expect(courtSpecDataReducer(designData, setActiveDesign("001"))).toEqual(designData);
  });

  it("should set New Design Active", () => {
    expect(courtSpecDataReducer(designData, setNewDesignActive("Court Canva 1"))).toEqual(
      designData
    );
  });

  it("should change Design Name", () => {
    expect(courtSpecDataReducer(designData, changeDesignName("CourtCanva 2"))).toEqual(
      changedDesignData
    );
  });

  it("should get Court Name String", () => {
    const activeCourt = {
      courtId: "",
      courtName: "Full Court",
      courtAreaXLength: 28000,
      courtAreaYLength: 15000,
      threePointLineToCourtEdgeLength: 900,
      cornerThreePointLineLength: 1575,
      threePointLineRadius: 6600,
      keyAreaWidth: 5790,
      keyAreaHeight: 4800,
      circleRadius: 1800,
      strokeWidth: 200,
      borderLength: 1000,
      designName: "Court Canva 1",
    };
    const name = getCourtNameString(activeCourt);
    expect(name).toBe("420 m² Full Court ( 28 m × 15 m)");
  });
});
