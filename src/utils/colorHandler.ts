
// TODO: 

const handleColorChange = (selectedColor location) => {
  if (selectedColor === "transparent") return;
  dispatch(changeTileColor({ selectedColor, location }));
};
