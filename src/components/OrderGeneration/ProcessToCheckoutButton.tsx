import { Button, Box } from "@chakra-ui/react";
interface Props {
  isChecked: boolean;
  handleProceedToCheckOut: () => void;
}
const ProcessToCheckOutButton = ({ isChecked, handleProceedToCheckOut }: Props) => {
  return (
    <Box>
      <Button
        variant="shareBtn"
        onClick={handleProceedToCheckOut}
        isDisabled={!isChecked}
        padding="10px 24px"
        fontWeight="700"
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default ProcessToCheckOutButton;
