import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import ListItemsContainer from "@/components/ProfileItemContainer/ListItemContainer";

describe("ProfileItemContainer", () => {
  const props = {
    title: "My Template",
    listArray: [],
    myListsArrayFc: jest.fn(),
    onClickHandler: jest.fn(),
  };
  it("should render the title correctly", () => {
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
});
