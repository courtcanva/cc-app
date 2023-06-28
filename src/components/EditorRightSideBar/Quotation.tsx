import React, { useEffect, useState } from "react";
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
import { switchLoginModal } from "@/store/reducer/buttonToggleSlice";
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
  const [addToCart] = useAddToCartMutation();
  const mappedCourtSize = saveDesignMapping(court);

  const [quotation, setQuotation] = useState("Loading");
  const [deposit, setDeposit] = useState("Loading");
  const [isConstructionOpen, setIsConstructionOpen] = useState(false);
  const [isConstructionMounted, setIsConstructionMounted] = useState(false);

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

  const handleAddToCart = async () => {
    if (!userId) return dispatch(switchLoginModal(true));
    if (!courtDataUrl) {
      return toast({
        title: `Fail to get courtDataUrl`,
        description: "Try again or contact IT support",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsConstructionMounted(true);
    const imgUrl = await upLoadScreenshot(courtDataUrl, toast);
    addToCart({
      item: { ...newCartItem, image: imgUrl },
    });
  };

  const handleConstructionOpen = () => {
    dispatch(resetAll());
    dispatch(switchRuler(false));
    setIsConstructionOpen(true);
    setIsConstructionMounted(true);
  };

  const handleConstructionClose = () => {
    setIsConstructionOpen(false);
    setIsConstructionMounted(false);
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
      <Button variant="shareBtn" w="160px" mt="12px" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      {isConstructionOpen ? (
        <Button
          variant="shareBtn"
          w="160px"
          mt="12px"
          onClick={handleConstructionClose}
          position="relative"
          zIndex={3999}
        >
          Construction
        </Button>
      ) : (
        <Button
          variant="shareBtn"
          w="160px"
          mt="12px"
          onClick={handleConstructionOpen}
          position="relative"
        >
          Construction
        </Button>
      )}
      {isConstructionMounted && <Construction isConstructionOpen={isConstructionOpen} />}
    </Box>
  );
};

export default Quotation;
