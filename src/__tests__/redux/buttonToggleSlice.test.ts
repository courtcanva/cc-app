import reducer, {
  switchRuler,
  initialState,
  ButtonToggleState,
  switchCartDisplay,
  openCartDisplay,
  switchPaintBucket,
  switchSavePopover,
  switchBadgeUpload,
  switchMyAccount,
  switch3D,
  startSelectTemplate,
  switchMyTemplateDisplay,
  switchOrderGeneration,
  switchCreateTemplate,
  switchLoginModal,
  switchSideBar,
} from "@/store/reducer/buttonToggleSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().buttonToggle;
  expect(state).toEqual(initialState);
});

it("should render correct button toggle state", () => {
  const previousState: ButtonToggleState = initialState;
  expect(reducer(previousState, switchRuler(false))).toEqual({
    ...previousState,
    isRulerOn: false,
  });
  expect(reducer(previousState, switchCartDisplay())).toEqual({
    ...previousState,
    isCartOpen: previousState.isOrderGenerationOpen || !previousState.isCartOpen,
    isSideBarOpen: false,
    isOrderGenerationOpen: false,
    isMyTemplateOpen: false,
    isSwitch3D: false,
    isMyAccountOpen: false,
  });
  expect(reducer(previousState, openCartDisplay())).toEqual({
    ...previousState,
    isCartOpen: true,
    isSideBarOpen: false,
    isOrderGenerationOpen: false,
    isMyTemplateOpen: false,
    isSwitch3D: false,
    isMyAccountOpen: false,
  });
  expect(reducer(previousState, switchPaintBucket(true))).toEqual({
    ...previousState,
    isPaintPopoverOpen: true,
    isSideBarOpen: false,
  });
  expect(reducer(previousState, switchSavePopover(true))).toEqual({
    ...previousState,
    isSavePopoverOpen: true,
    isSideBarOpen: false,
  });
  expect(reducer(previousState, switchSideBar(true))).toEqual({
    ...previousState,
    isSideBarOpen: true,
    isCartOpen: false,
  });
  expect(reducer(previousState, switchLoginModal(true))).toEqual({
    ...previousState,
    isLoginModalOpen: true,
    isSideBarOpen: false,
    isSwitch3D: false,
  });
  expect(reducer(previousState, switchCreateTemplate(true))).toEqual({
    ...previousState,
    isCreateTemplateOpen: true,
    isCartOpen: false,
    isSideBarOpen: false,
    isOrderGenerationOpen: false,
    isMyTemplateOpen: false,
    isSwitch3D: false,
    isMyAccountOpen: false,
  });
  expect(reducer(previousState, switchOrderGeneration(true))).toEqual({
    ...previousState,
    isOrderGenerationOpen: true,
  });
  expect(reducer(previousState, switchMyTemplateDisplay(true))).toEqual({
    ...previousState,
    isMyTemplateOpen: true,
    isMyAccountOpen: false,
    isCartOpen: false,
    isOrderGenerationOpen: false,
    isSwitch3D: false,
  });
  expect(reducer(previousState, startSelectTemplate(true))).toEqual({
    ...previousState,
    isTemplateSelect: true,
  });
  expect(reducer(previousState, switch3D(true))).toEqual({
    ...previousState,
    isSwitch3D: true,
    isCartOpen: false,
    isOrderGenerationOpen: false,
    isSideBarOpen: false,
    isPaintPopoverOpen: false,
    isTemplateSelect: false,
    isMyTemplateOpen: false,
    isSavePopoverOpen: false,
  });
  expect(reducer(previousState, switchMyAccount(true))).toEqual({
    ...previousState,
    isMyAccountOpen: true,
    isCartOpen: false,
    isOrderGenerationOpen: false,
    isSwitch3D: false,
    isMyTemplateOpen: false,
    isCreateTemplateOpen: false,
  });
  expect(reducer(previousState, switchBadgeUpload(true))).toEqual({
    ...previousState,
    isBadgeUploadOpen: true,
    isSideBarOpen: false,
  });
});
