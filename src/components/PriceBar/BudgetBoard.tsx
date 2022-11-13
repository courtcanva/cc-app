import { Button, Center, Text, useToast } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { ICartItem } from "@/interfaces/cartItem";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign, ITileColor } from "@/interfaces/design";
import { useDispatch } from "react-redux";
import { switchLoginModal } from "@/store/reducer/buttonToggleSlice";
import { upLoadScreenshot } from "@/utils/manageExternalImage";

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
  const courtType = "basketball";

  const currentDesign: IDesign = {
    _id: court.courtId,
    user_id: userId,
    designName: court.designName,
    courtSize: mappedCourtSize,
    tileColor: tiles,
    courtType: courtType,
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
      justifyContent={{ base: "flex-start", lg: "flex-end" }}
      paddingLeft={{ base: "10px", lg: "0px", xl: "0px" }}
      borderLeft="1px solid #ABABAD"
      alignItems="center"
      color="brand.primary"
    >
      <Center alignItems="baseline">
        <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="600" marginLeft="50px">
          Estimated Budget
        </Text>
        <Text
          fontSize={{ base: "xs", lg: "sm" }}
          fontWeight={{ base: "700", lg: "800" }}
          marginLeft="8px"
        >
          From
        </Text>
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight={{ base: "700", lg: "800" }}
          marginLeft="5px"
          marginRight="20px"
        >
          ${useTotalPrice === "0.00" ? "Loading..." : useTotalPrice}
        </Text>
      </Center>
      <Button variant="shareBtn" marginRight="30px" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Center>
  );
};

export default BudgetBoard;
