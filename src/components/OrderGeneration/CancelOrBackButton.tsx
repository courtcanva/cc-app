import { Button } from "@chakra-ui/react";

interface Props {
  handleBackToCart: () => void;
  buttonTitle: string;
}

const CancelOrBackButton = ({ handleBackToCart, buttonTitle }: Props) => {
  return (
    <Button
      padding="10px 24px"
      fontSize="lg"
      fontWeight="700"
      borderWidth="1px"
      borderColor="brand.primary"
      backgroundColor="#F3F2F7"
      onClick={handleBackToCart}
    >
      {buttonTitle}
    </Button>
  );
};

export default CancelOrBackButton;
