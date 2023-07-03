import { screen, waitFor } from "@testing-library/react";
import Quotation from "@/components/EditorRightSideBar/Quotation";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "../../mockApi/handlers";
import store from "@/store/index";
import renderWithMockedProvider from "../../utils";
import { changeTileQuantity } from "@/store/reducer/priceBarSlice";
import { getColorList } from "@/store/reducer/colorListSlice";
import { updateUserInfo } from "@/store/reducer/userSlice";
import { setCourtDataUrl } from "@/store/reducer/canvasControlSlice";
import { changeConstructionPdfSrc } from "@/store/reducer/constructionSlice";
import * as buttonToggleSlice from "@/store/reducer/buttonToggleSlice";
import { upLoadScreenshot } from "@/utils/manageExternalImage";
import * as cartApi from "@/redux/api/cartApi";
import {
  switchConstructionMounted,
  switchConstructionOpen,
} from "@/store/reducer/buttonToggleSlice";

jest.setTimeout(20000);

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const preloadedState = {
  priceBarState: [{ color: "red", quantity: 10 }],
  colorListState: [
    {
      _id: "mockId",
      name: "mockName",
      colors: [{ name: "red", value: "red" }],
    },
  ],
  userStateNone: {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  userState: {
    userId: "mockId",
    email: "",
    firstName: "",
    lastName: "",
  },
  canvasState: {
    zoomScale: 1,
    dragActivate: false,
    dragStart: false,
    resetState: false,
    courtDataUrl: "mockUrl",
  },
  constructionState: {
    constructionPdfSrc: "mockUrl",
  },
  buttonToggle: {
    isConstructionOpen: false,
    isConstructionMounted: true,
  },
};

beforeEach(() => {
  store.dispatch(changeTileQuantity(preloadedState.priceBarState));
  store.dispatch(getColorList(preloadedState.colorListState));
});

jest.mock("@/utils/priceCalculation", () => {
  return {
    calculateQuotation: jest.fn().mockReturnValue(123),
    calculateDeposit: jest.fn().mockReturnValue(321),
  };
});

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    ...originalModule,
    useToast: () => mockToast,
  };
});

jest.mock("@/utils/manageExternalImage", () => {
  return {
    upLoadScreenshot: jest.fn(),
  };
});

jest.mock("@/components/Construction/index", () => {
  return jest.fn().mockReturnValue(<div>Mocked Component</div>);
});

describe("Quotation", () => {
  it("should render quotation, deposit name and add-to-cart button", () => {
    renderWithMockedProvider(<Quotation />);
    expect(screen.getByText(/Deposit/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Quotation/i)).toHaveLength(2);
    const cartBtn = screen.getByText(/Add to Cart/i);
    expect(cartBtn).toBeInTheDocument();
  });

  it("should render correct quotation and deposit value", async () => {
    renderWithMockedProvider(<Quotation />);
    await waitFor(() => {
      expect(screen.getByText(/123.00/i)).toBeInTheDocument();
      expect(screen.getByText(/321.00/i)).toBeInTheDocument();
    });
  });
});

describe("click add-to-cart button", () => {
  const renderAndClick = () => {
    renderWithMockedProvider(<Quotation />);
    const cartBtn = screen.getByText(/Add to Cart/i);
    userEvent.click(cartBtn);
  };

  it("should call correct dispatch action when user id is null", async () => {
    const mockSwitchLoginModal = jest.spyOn(buttonToggleSlice, "switchLoginModal");
    store.dispatch(updateUserInfo(preloadedState.userStateNone));
    renderAndClick();
    await waitFor(() => expect(mockSwitchLoginModal).toBeCalled());
  });

  it("should call toast when courtDataUrl is null", async () => {
    store.dispatch(updateUserInfo(preloadedState.userState));
    renderAndClick();
    await waitFor(() => expect(mockToast).toBeCalled());
  });

  it("should upload screenshot and add new item to cart", async () => {
    const mockAddToCart = jest.fn();
    jest.spyOn(cartApi, "useAddToCartMutation").mockReturnValue([mockAddToCart, jest.fn()] as any);
    store.dispatch(updateUserInfo(preloadedState.userState));
    store.dispatch(setCourtDataUrl(preloadedState.canvasState.courtDataUrl));
    store.dispatch(changeConstructionPdfSrc(preloadedState.constructionState.constructionPdfSrc));
    store.dispatch(switchConstructionMounted(preloadedState.buttonToggle.isConstructionMounted));
    store.dispatch(switchConstructionOpen(preloadedState.buttonToggle.isConstructionOpen));
    renderAndClick();
    await waitFor(
      () => {
        expect(mockAddToCart).toBeCalled();
        expect(upLoadScreenshot).toBeCalled();
      },
      { timeout: 10000 }
    );
  });
});

describe("click construction-on button", () => {
  it("should switch construction mounted and construction open", async () => {
    const mockSwitchConstructionOpen = jest.spyOn(buttonToggleSlice, "switchConstructionOpen");
    const mockSwitchConstructionMounted = jest.spyOn(
      buttonToggleSlice,
      "switchConstructionMounted"
    );
    renderWithMockedProvider(<Quotation />);
    const constructionBtn = screen.getByText(/Construction on/i);
    userEvent.click(constructionBtn);
    await waitFor(
      () => {
        expect(upLoadScreenshot).toBeCalled();
        expect(mockSwitchConstructionOpen).toBeCalled();
        expect(mockSwitchConstructionMounted).toBeCalled();
      },
      { timeout: 10000 }
    );
  });
});
