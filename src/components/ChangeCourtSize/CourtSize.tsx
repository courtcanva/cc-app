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
      my={{ base: 50, lg: 78 }}
      mx={{ base: 35, lg: 78 }}
    >
      {courtList.map((court) => {
        const { des, des1, img } = court;

        return (
          <Box sx={styles} key={img}>
            <Box w="255" h="205" display="flex" alignItems="center" justifyContent="center">
              <Image src={img} objectFit={"contain"} px={{ base: 1, lg: 0 }} />
            </Box>
            <Box mt="2">
              <Text fontSize={{ base: "sm", lg: "md" }}>{des}</Text>
              <Text fontSize={{ base: "xs", lg: "sm" }}>{des1}</Text>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default CourtSize;
