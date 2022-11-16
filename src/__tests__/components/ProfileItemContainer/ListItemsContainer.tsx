import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItemsContainer from "@/components/ProfileItemContainer/ListItemContainer";

describe("ProfileItemContainer", () => {
  const props = {
    title: "My Template",
    listArray: [],
    myListsArrayFc: jest.fn(),
    onClickHandler: jest.fn(),
  };
  const props1 = {
    title: "My Template",
    listArray: [],
    myListsArrayFc: jest.fn(),
    onClickHandler: jest.fn(),
  };
  it("should render the title 'My Template' correctly and", () => {
    renderWithMockedProvider(
      <ListItemsContainer
        title={props.title}
        listArray={props.listArray}
        myListsArrayFc={props.myListsArrayFc}
        onClickHandler={props.onClickHandler}
      />
    );
    const myTitle = screen.getByText("My Template");
    expect(myTitle).toBeInTheDocument();
  });

  it("the 'return to design' button should be called when click the button", () => {
    renderWithMockedProvider(
      <ListItemsContainer
        title={props.title}
        listArray={props.listArray}
        myListsArrayFc={props.myListsArrayFc}
        onClickHandler={props.onClickHandler}
      />
    );
    const returnBtn = screen.getByRole("button", { name: "Return To Design" });
    userEvent.click(returnBtn);
    expect(props.onClickHandler).toBeCalled();
  });
  it("should render the title 'My Orders' correctly and", () => {
    renderWithMockedProvider(
      <ListItemsContainer
        title={props1.title}
        listArray={props1.listArray}
        myListsArrayFc={props1.myListsArrayFc}
        onClickHandler={props1.onClickHandler}
      />
    );
    const myTitle = screen.getByText("My Orders");
    expect(myTitle).toBeInTheDocument();
  });
});
