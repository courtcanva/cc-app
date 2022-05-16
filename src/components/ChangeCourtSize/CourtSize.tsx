import { useStyleConfig } from "@chakra-ui/react";
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";

const CourtSize = () => {
  const styles = useStyleConfig("CourtSize");

  return (
    <SimpleGrid columns={[2, null, 3]} spacingX="78" spacingY="95" my="78" ml="95" mr="95">
      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-510m2.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>510 m2 Pro full court</Text>
          <Text>(17 m* 30 m)</Text>
        </Box>
      </Box>

      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-420m2.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>420 m2 Medium full court</Text>
          <Text>(15 m* 28 m)</Text>
        </Box>
      </Box>

      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-45m2.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>45 m2 Small full court</Text>
          <Text>(5 m* 9 m) </Text>
        </Box>
      </Box>

      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-210m2.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>210 m2 Pro half court</Text>
          <Text>(15 m* 14 m) </Text>
        </Box>
      </Box>

      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-150m2.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>150 m2 Half court</Text>
          <Text>(15 m* 28 m)</Text>
        </Box>
      </Box>

      <Box sx={styles}>
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
          <Image src="./courtSize/court-Meduim-half.jpg" />
        </Box>
        <Box transform="translateY(10px)">
          <Text>Medium half court</Text>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default CourtSize;
