/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { IMyTemplates } from "@/interfaces/template";
import { useDispatch } from "react-redux";
import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

interface MyTemplates {
  myTemplates: IMyTemplates[] | undefined;
}

export default function MyTemplateContainer({ myTemplates }: MyTemplates) {
  const title = "My template";
  const dispatch = useDispatch();
  const handleReturnToDesign = () => {
    dispatch(switchMyTemplateDisplay(false));
  };
  const myTemplateLists = (): JSX.Element[] | undefined => {
    return myTemplates?.map((item) => <MyTemplateListItem key={item._id} {...item} />);
  };

  return (
    <ListItemsContainer
      title={title}
      listArray={myTemplates}
      myListsArrayFc={myTemplateLists}
      onClickHandler={handleReturnToDesign}
    />
  );
}
