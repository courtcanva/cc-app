export default {
  // as EditorFooter's z-index is 1500, all the modals z-index should be higher than 1500
  baseStyle: {
    overlay: { zIndex: "1600" },
    dialogContainer: { zIndex: "1600" },
  },
};
