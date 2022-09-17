import { Button, Center, Text } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useAddToCartMutation } from "@/redux/api/cartAPi";
import { ICartItem } from "@/interfaces/cartItem";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign, ITileColor } from "@/interfaces/design";

type BudgetBoardprops = { useTotalPrice: string };

const BudgetBoard = (props: BudgetBoardprops) => {
  const tileBlocks = useStoreSelector((state) => state.priceBar.blocks);
  const court = useStoreSelector((state) => state.courtSpecData).activeCourt;
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const tiles: ITileColor[] = [...tileData];
  const userId = useStoreSelector((state) => state.user.userId);
  const [addToCart] = useAddToCartMutation();
  const mappedCourtSize = saveDesignMapping(court);

  const currentDesign: IDesign = {
    _id: court.courtId,
    user_id: userId,
    designName: court.designName,
    courtSize: mappedCourtSize,
    tileColor: tiles,
  };

  const newCartItem: ICartItem = {
    user_id: userId,
    design: currentDesign,
    quotation: props.useTotalPrice,
    quotationDetails: tileBlocks,
    previewPic: "",
  };

  const handleAddToCart = () => {
    addToCart({ item: newCartItem });
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
          ${props.useTotalPrice === "0.00" ? "Loading..." : props.useTotalPrice}
        </Text>
      </Center>
      <Button variant="shareBtn" marginRight="30px" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Center>
  );
};

export default BudgetBoard;
