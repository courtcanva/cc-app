import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { getCourtSpecData, setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeCourtSize } from "@/store/reducer/courtSizeSlice";
import { useGetDesignByUserQuery } from "@/redux/api/designApi";
import { IDesign, ICourtColor } from "@/interfaces/design";
import { designCourtMapping, designNameMapping, designTileMapping } from "@/utils/designMapping";
import { changeTileColor } from "@/store/reducer/tileSlice";
import { changeDesignNames } from "@/store/reducer/designNameSlice";

const Folder: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isError } = useGetDesignByUserQuery("user123");
  const [activateDesign, setActivateDesign] = useState<string>("");
  const [useCourtColor, setCourtColor] = useState<ICourtColor[]>();
  const { courtsData } = useStoreSelector((state) => state.courtSpecData);
  useEffect(() => {
    if (data === undefined) return;
    const mappedCourtData = data.map((item: IDesign) => designCourtMapping(item));
    const mappedtileData = data.map((item: IDesign) => designTileMapping(item));
    setCourtColor(mappedtileData);
    dispatch(getCourtSpecData(mappedCourtData));
    const mappeddesignNames = data.map((item: IDesign) => designNameMapping(item));
    dispatch(changeDesignNames(mappeddesignNames));
  }, [data]);

  const handleCourtSelecting = (courtId: string): void => {
    setActivateDesign(courtId);
    dispatch(setActiveDesign(courtId));
    const selectedDesign = courtsData.find((item) => item.courtId === courtId);
    if (selectedDesign) {
      dispatch(changeCourtSize(selectedDesign));
    }

    if (useCourtColor === undefined) return;
    const selectedDesignColor = useCourtColor.find((item) => item.designId === courtId);
    if (selectedDesignColor === undefined) return;
    for (const tile of selectedDesignColor.tileColor) {
      const selectedColor = tile.color;
      dispatch(changeTileColor({ selectedColor, location: tile.location }));
    }
    const tileQtyOfSelectedCourt = mockTileData.find(
      (item) => item.name === selectedDesign?.courtName
    )?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtsData.map((court) => {
        const { courtId, courtName, designName } = court;
        return (
          <Box
            key={courtId}
            width="230px"
            height="25px"
            background="transparent"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="left"
            cursor="pointer"
            fontSize="14"
            onClick={() => handleCourtSelecting(courtId)}
            data-testid={courtId}
            _hover={{ border: "2px solid #40B484" }}
            opacity={!activateDesign || activateDesign === courtId ? "1" : "0.4"}
          >
            {designName} - {courtName}
          </Box>
        );
      })}
    </Box>
  );
};

export default Folder;
