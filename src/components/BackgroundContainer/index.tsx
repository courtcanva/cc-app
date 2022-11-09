import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BackgroundContainer = ({ children }: Props) => {
  return (
    <Flex
      position="fixed"
      backgroundColor="background.tertiary"
      top="72px"
      padding="20px 20px 80px 20px"
      width="100vw"
      height="100vh"
      zIndex={1600}
      gap="28px"
      overflow="scroll"
      flexDirection="column"
      color="brand.primary"
    >
      {children}
    </Flex>
  );
};

export default BackgroundContainer;
