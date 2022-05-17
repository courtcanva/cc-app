import { useStyleConfig } from "@chakra-ui/react";
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";
import courtList from "./CourtList";

const CourtSize = () => {
  const styles = useStyleConfig("CourtSize");

  return (
    <SimpleGrid columns={[2, null, 3]} spacingX="78" spacingY="95" my="78" ml="95" mr="95">
      {courtList.map((court) => {
        const { des, des1, img } = court;

        return (
          <Box sx={styles} key={img}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={img} />
            </Box>
            <Box mt="2">
              <Text>{des}</Text>
              <Text>{des1}</Text>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default CourtSize;
