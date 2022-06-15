import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
1;
import { changeCourtName } from "@/store/reducer/courtNameSlice";
import React from "react";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();

  const handleCourtName = (des: string, des1: string): void => {
    dispatch(changeCourtName(`${des} ${des1}`));
  };

  return (
    <Box pl="24px" pt="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { img, des, des1 } = court;
        return (
          <Box
            key={img}
            w="308px"
            h="150px"
            bg="#fff"
            mb="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleCourtName(des, des1)}
            data-testid={img}
          >
            <Image src={img} objectFit={"contain"} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
