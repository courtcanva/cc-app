import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";
import { useStoreSelector } from "@/store/hooks";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { ICartItem } from "@/interfaces/cartItem";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign, ITileColor } from "@/interfaces/design";
import { useDispatch } from "react-redux";
import {
  switchLoginModal,
  switchConstructionOpen,
  switchConstructionMounted,
} from "@/store/reducer/buttonToggleSlice";
import { upLoadScreenshot } from "@/utils/manageExternalImage";
import { COURT_TYPE } from "@/constants/courtData";
import { useGetDepositQuery } from "@/redux/api/depositApi";
import priceFormat from "@/utils/priceFormat";
import { useGetPriceQuery } from "@/redux/api/priceApi";
import { calculateQuotation, calculateDeposit } from "@/utils/priceCalculation";
import { TilePrices } from "@/interfaces/priceCalculation";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import Construction from "../Construction";
import formatCurrency from "@/utils/formatCurrency";
import { changeConstructionPdfSrc } from "@/store/reducer/constructionSlice";
import { DRAW_DELAY } from "@/constants/construction";

const Quotation = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { blocks: tileBlocks } = useStoreSelector((state) => state.priceBar);
  const { data: priceData } = useGetPriceQuery(0);
  const { data: depositData } = useGetDepositQuery();
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const tiles: ITileColor[] = [...tileData];
  const courtDataUrl = useStoreSelector((state) => state.canvasControl.courtDataUrl);
  const { colorList } = useStoreSelector((state) => state.colorList);
  const userId = useStoreSelector((state) => state.user.userId);
  const constructionUrl = useStoreSelector((state) => state.construction.constructionPdfSrc);
  const isConstructionOpen = useStoreSelector((state) => state.buttonToggle.isConstructionOpen);
  const isConstructionMounted = useStoreSelector(
    (state) => state.buttonToggle.isConstructionMounted
  );
  const [addToCart] = useAddToCartMutation();
  const mappedCourtSize = saveDesignMapping(court);

  const [quotation, setQuotation] = useState("Loading");
  const [deposit, setDeposit] = useState("Loading");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (priceData && depositData && tileBlocks.length !== 0) {
      const tilePricesList = priceData[0].tilePrices.find(
        (item: TilePrices) => item.tileName === colorList[0].name
      );
      const quotation = calculateQuotation(tileBlocks, tilePricesList);
      const deposit = calculateDeposit(quotation, depositData.depositRate);
      setQuotation(priceFormat(quotation));
      setDeposit(priceFormat(deposit));
    }
  }, [priceData, depositData, tileBlocks]);

  const currentDesign: IDesign = {
    _id: court.courtId,
    user_id: userId,
    designName: court.designName,
    courtSize: mappedCourtSize,
    tileColor: tiles,
    courtType: COURT_TYPE,
  };

  const newCartItem: ICartItem = {
    user_id: userId,
    design: currentDesign,
    quotation,
    quotationDetails: tileBlocks,
    image: "",
    id: "",
    isExpired: false,
  };

  // const handleAddToCart = async () => {
  //   dispatch(switchRuler(false));
  //   setIsAddingToCart(true);
  //   if (!userId) {
  //     dispatch(switchConstructionMounted(false));
  //     setIsAddingToCart(false);
  //     return dispatch(switchLoginModal(true));
  //   }
  //   if (!courtDataUrl) {
  //     dispatch(switchConstructionMounted(false));
  //     setIsAddingToCart(false);
  //     return toast({
  //       title: `Fail to get courtDataUrl`,
  //       description: "Try again or contact IT support",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  //   dispatch(switchConstructionMounted(true));
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, DRAW_DELAY + 1000);
  //   });
  //   const designImageUrl = await upLoadScreenshot(courtDataUrl, toast, "design");
  //   console.log(constructionUrl);
  //   if (!constructionUrl) {
  //     dispatch(switchConstructionMounted(false));
  //     setIsAddingToCart(false);
  //     return toast({
  //       title: `Fail to get construction url`,
  //       description: "Try again or contact IT support",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  //   dispatch(switchConstructionMounted(false));
  //   const constructionImageUrl = await upLoadScreenshot(constructionUrl, toast, "construction");
  //   addToCart({
  //     item: { ...newCartItem, image: designImageUrl, constructionDrawing: constructionImageUrl },
  //   });
  //   dispatch(changeConstructionPdfSrc(null));
  //   setIsAddingToCart(false);
  // };

  const handleAddToCart = async () => {
    dispatch(switchRuler(false));
    setIsAddingToCart(true);
    if (!userId) {
      dispatch(switchConstructionMounted(false));
      setIsAddingToCart(false);
      return dispatch(switchLoginModal(true));
    }
    if (!courtDataUrl) {
      dispatch(switchConstructionMounted(false));
      setIsAddingToCart(false);
      return toast({
        title: `Fail to get courtDataUrl`,
        description: "Try again or contact IT support",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    dispatch(switchConstructionMounted(true));
  };
  useMemo(async () => {
    console.log(1);
    dispatch(changeConstructionPdfSrc(null));
    if (!isConstructionMounted || isConstructionOpen || !constructionUrl || !courtDataUrl) return;
    console.log(2);
    const constructionImageUrl = await upLoadScreenshot(constructionUrl, toast, "construction");
    const designImageUrl = await upLoadScreenshot(courtDataUrl, toast, "design");
    addToCart({
      item: { ...newCartItem, image: designImageUrl, constructionDrawing: constructionImageUrl },
    });
    setIsAddingToCart(false);
    dispatch(switchConstructionMounted(false));
  }, [constructionUrl]);

  const handleConstructionOpen = () => {
    dispatch(resetAll());
    dispatch(switchRuler(false));
    dispatch(switchConstructionOpen(true));
    dispatch(switchConstructionMounted(true));
  };

  return (
    <Box position="relative" zIndex={500}>
      <Text fontSize="14px" fontWeight="700" mb="10px">
        Quotation
      </Text>
      <Flex w="122px" fontSize="10px" justifyContent="space-between" mb="8px">
        <Text>Quotation</Text>
        <Text>{quotation === "Loading" ? quotation : formatCurrency(quotation)}</Text>
      </Flex>
      <Flex>
        <Flex w="135px" fontSize="14px" fontWeight="700" justifyContent="space-between">
          <Text>Deposit</Text>
          <Text>{deposit === "Loading" ? deposit : formatCurrency(deposit)}</Text>
        </Flex>
        <Flex w="25px" alignItems="center" justifyContent="end">
          <BsQuestionCircle />
        </Flex>
      </Flex>
      <Button
        variant="shareBtn"
        w="160px"
        mt="12px"
        onClick={handleAddToCart}
        isLoading={isAddingToCart}
      >
        Add to Cart
      </Button>
      <Button
        variant="shareBtn"
        w="160px"
        mt="12px"
        onClick={handleConstructionOpen}
        position="relative"
        id="constructionButton"
      >
        Construction
      </Button>
    </Box>
  );
};

export default Quotation;
