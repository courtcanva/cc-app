import { Box, Button } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import { switchConstructionMounted } from "@/store/reducer/buttonToggleSlice";
import CourtConstruction from "./CourtConstruction";
import { findDistinctColor } from "@/utils/findDistinctColor";
const Construction = () => {
  const dispatch = useDispatch();
  const imgSrc = useStoreSelector((state) => state.canvasControl.courtDataUrl);
  const constructionInfo = useStoreSelector((state) => state.construction.constructionInfo);
  const tiles = useStoreSelector((state) => state.tile.present.court);
  const tilesColor = useMemo(() => tiles.map((item) => item.color), []);
  const distinctColor = useMemo(() => {
    return findDistinctColor(tilesColor);
  }, []);

  const { beginPointX, beginPointY, endPointX, endPointY, tileSize } = constructionInfo;
  // extract the position of original construction button
  const constructionButton = document.getElementById("constructionButton");
  const rect = constructionButton?.getBoundingClientRect();

  const handleConstructionClose = useCallback(() => {
    dispatch(switchConstructionMounted(false));
  }, []);

  return (
    <Box position="fixed" h="100vh" w="100vw" bottom="0" left="0" bg="blackAlpha.600" zIndex="5999">
      <CourtConstruction
        beginPointX={beginPointX}
        beginPointY={beginPointY}
        endPointX={endPointX}
        endPointY={endPointY}
        tileSize={tileSize}
        imgSrc={imgSrc as string}
        distinctColor={distinctColor}
        isForDownloadPdf={false}
      />
      {rect && (
        <Button
          variant="solid"
          w="160px"
          bg="black"
          color="white"
          onClick={handleConstructionClose}
          position="fixed"
          zIndex="5999"
          top={rect.top}
          left={rect.left}
        >
          Construction Off
        </Button>
      )}
    </Box>
  );
};

export default Construction;
