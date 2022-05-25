import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";

const Blueprints = () => {
  return (
      <Box pl="24px" pt="24px" height="100%" className="scrollbox"
    >
          {courtList.map((court) => {
              const {img } = court;
              return (
                  <Box key={img} w="308px" h="150px" bg="#fff" mb="18px" display="flex" alignItems="center" justifyContent="center">
                        <Image src={img} objectFit={"contain"} />
                  </Box>
              );
          })}
    </Box>
  );
};

export default Blueprints;
