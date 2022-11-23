import { Button, Center, Text, useToast, Flex } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { ICartItem } from "@/interfaces/cartItem";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign, ITileColor } from "@/interfaces/design";
import { useDispatch } from "react-redux";
import { switchLoginModal } from "@/store/reducer/buttonToggleSlice";
import { upLoadScreenshot } from "@/utils/manageExternalImage";
import { COURT_TYPE } from "../../constants/courtData";
import { BsQuestionCircle } from "react-icons/bs";
import { useGetDepositQuery } from "../../redux/api/depositApi";
import formatCurrency from "@/utils/formatCurrency";

interface IBudgetBoardprops {
  useTotalPrice: string;
}

const BudgetBoard = ({ useTotalPrice }: IBudgetBoardprops) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const courtDataUrl = useStoreSelector((state) => state.canvasControl.courtDataUrl);
  const tiles: ITileColor[] = [...tileData];
  const userId = useStoreSelector((state) => state.user.userId);
  const [addToCart] = useAddToCartMutation();
  const mappedCourtSize = saveDesignMapping(court);
  const { data: depositData } = useGetDepositQuery();

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
    quotation: useTotalPrice,
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
    const imgUrl = await upLoadScreenshot(courtDataUrl, toast);
    addToCart({
      item: { ...newCartItem, image: imgUrl },
    });
  };

  return (
    <Center
      width="50%"
      justifyContent={{ base: "space-around", lg: "flex-end" }}
      paddingLeft={{ base: "10px", lg: "0px", xl: "0px" }}
      borderLeft="1px solid #ABABAD"
      alignItems="center"
      color="brand.primary"
    >
      <Flex flexDirection="column" justifyContent="center" width="40%" color="fontcolor.lightDark">
        <Flex justifyContent="space-around" fontSize="12px">
          <Text marginLeft="20px">Quotation</Text>
          <Text marginLeft="5px">
            {useTotalPrice === "0.00" ? "Loading..." : formatCurrency(useTotalPrice)}
          </Text>
        </Flex>
        <Flex
          justifyContent="space-around"
          fontSize={{ base: "14px", lg: "20px" }}
          fontWeight={{ base: "800", lg: "800" }}
        >
          <Center>
            <BsQuestionCircle />
            <Text marginLeft="5px">Deposit</Text>
          </Center>

          <Text marginLeft="5px" marginRight={{ base: "8px", lg: "20px" }}>
            {useTotalPrice === "0.00"
              ? "Loading..."
              : formatCurrency((Number(useTotalPrice) * depositData?.depositRate).toString())}
          </Text>
        </Flex>
      </Flex>
      <Button variant="shareBtn" marginRight="30px" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Center>
  );
};

export default BudgetBoard;
