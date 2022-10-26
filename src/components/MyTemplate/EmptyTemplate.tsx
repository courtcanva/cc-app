/* eslint-disable require-jsdoc */
import { Text, Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

// FIXME: need to optimize ui
function EmptyTemplate() {
  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    disPatch(switchMyTemplateDisplay(false));
  };
  return (
    <Flex
      width="100vw"
      justifyContent="center"
      alignItems="center"
      margin="80px 10px"
      bg="#f3f6fb"
      borderTop="5px solid #7088B1"
      zIndex={1900}
    >
      <Flex flexDirection="column" justifyContent="space-evenly" alignItems="center" height="400px">
        <Text fontSize="50px" fontWeight="700">
          My Template
        </Text>
        <Text fontSize="lg" fontWeight="500" color="black" data-testid="emptyText">
          You currently have
          <Text display="inline" fontWeight="900">
            no items
          </Text>
          in your Template
        </Text>
        {/* <Button
          aria-label="ReturnHomeBtn"
          variant="shareBtn"
          size="lg"
          padding="10px 20px"
          onClick={handleReturnToDesign}
        >
          RETURN TO DESIGN
        </Button> */}
      </Flex>
    </Flex>
  );
}

export default EmptyTemplate;
