import { useStyleConfig } from "@chakra-ui/react";
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";
import courtList from "./CourtList";

const CourtSize = () => {
  const styles = useStyleConfig("CourtSize");

  return (
    <SimpleGrid
      columns={3}
      spacingX={{ base: 8, lg: 78 }}
      spacingY="95"
      marginY={{ base: 50, lg: 78 }}
      marginX={{ base: 35, lg: 78 }}
    >
      {courtList.map((court) => {
        const { courtSizeName, courtSizeDetails, img } = court;

        return (
          <Box sx={styles} key={img}>
            <Box
              width="255"
              height="205"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={img} objectFit={"contain"} paddingX={{ base: 1, lg: 0 }} />
            </Box>
            <Box marginTop="2">
              <Text fontSize={{ base: "sm", lg: "md" }}>{courtSizeName}</Text>
              <Text fontSize={{ base: "xs", lg: "sm" }}>{courtSizeDetails}</Text>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default CourtSize;
