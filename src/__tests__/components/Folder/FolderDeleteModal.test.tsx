import FolderDeleteModal from "@/components/FolderList/FolderDeleteModal";
import { screen } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

const mocks = {
  isOpen: true,
  onOpen: jest.fn(),
  onClose: jest.fn(),
  deleteDesign: jest.fn(),
};

jest.mock("@chakra-ui/react", () => {
  const restOFUI = jest.requireActual("@chakra-ui/react");
  return {
    ...restOFUI,
    useDisclosure: () => {
      return {
        isOpen: mocks.isOpen,
        onOpen: mocks.onOpen,
        onClose: mocks.onClose,
      };
    },
  };
});

jest.mock("@/redux/api/designApi", () => {
  const restOFAPI = jest.requireActual("@/redux/api/designApi");
  return {
    ...restOFAPI,
    useDeleteDesignMutation: () => {
      return [mocks.deleteDesign];
    },
  };
});

jest.mock("@/store/hooks", () => {
  const restOFAPI = jest.requireActual("@/store/hooks");
  return {
    ...restOFAPI,
    useStoreSelector: () => {
      return { activeCourt: 1 };
    },
  };
});

describe("Render folder item delete modal", () => {
  it("Should render delete modal icon correctly", () => {
    const { container } = renderWithMockedProvider(<FolderDeleteModal />);
    expect(container).toMatchSnapshot();
  });
  it("Should open delete modal when clicking delete icon on folder list", () => {
    mocks.isOpen = false;
    renderWithMockedProvider(<FolderDeleteModal />);
    const button = screen.getByTestId("delete-btn");
    userEvent.click(button);
    expect(mocks.onOpen).toHaveBeenCalled();
  });
  it("Should render delete modal text correctly", async () => {
    mocks.isOpen = true;
    renderWithMockedProvider(<FolderDeleteModal />);
    const modalText = screen.getByTestId("delete-modal-text");
    expect(modalText).toBeInTheDocument();
  });
  it("Should close delete modal when clicking cancel icon on modal", () => {
    mocks.isOpen = true;
    renderWithMockedProvider(<FolderDeleteModal />);
    const closeBtn = screen.getByTestId("delete-modal-close");
    userEvent.click(closeBtn);
    expect(mocks.onClose).toHaveBeenCalled();
  });

  it("Should call delete function when clicking delete button on modal", () => {
    mocks.isOpen = true;
    renderWithMockedProvider(<FolderDeleteModal />);
    const button = screen.getByTestId("delete-modal-confirm");
    userEvent.click(button);
    expect(mocks.deleteDesign).toHaveBeenCalled();
  });
});
