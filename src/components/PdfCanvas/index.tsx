import { Center } from "@chakra-ui/react";
import { ICourtSize, ITileColor, IDesign } from "@/interfaces/design";
import { useDispatch } from "react-redux";
import {
  changeCourtDesign,
  changeCourtSrc,
  changeConstructionSrc,
} from "@/store/reducer/constructionSlice";

import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import CourtConstruction from "@/components/Construction/CourtConstruction";
import { useEffect } from "react";
import { downloadToPDF } from "@/utils/printConstructionPDF";
import { useStoreSelector } from "@/store/hooks";

interface Props {
  courtDesign: IDesign;
  imgSrc: string;
}

const PdfCanvas = ({ courtDesign, imgSrc }: Props) => {
  const dispatch = useDispatch();
  const {
    sideBorderWidth: borderLength,
    length: courtAreaXLength,
    width: courtAreaYLength,
  } = courtDesign.courtSize;
  const stageMargin = 2500;
  const size = { width: window.innerWidth, height: window.innerHeight };
  const constructionPdfSrc = useStoreSelector((state) => state.construction.constructionSrc);
  const {
    courtAndTileInfo: { beginPointX, beginPointY, endPointX, endPointY, tileSize },
  } = getCourtAndTileInfo(courtAreaXLength, courtAreaYLength, borderLength, stageMargin, size);
  const asyncDownloadConstruction = async () => {
    if (constructionPdfSrc) {
      await downloadToPDF(courtDesign, constructionPdfSrc);
      dispatch(changeCourtDesign(null));
      dispatch(changeCourtSrc(null));
      dispatch(changeConstructionSrc(null));
    }
  };
  useEffect(() => {
    asyncDownloadConstruction();
  }, [constructionPdfSrc]);

  return (
    <>
      <Center position="fixed" w="100vw" h="100vh" zIndex={99999} visibility="hidden">
        <CourtConstruction
          beginPointX={beginPointX}
          beginPointY={beginPointY}
          endPointX={endPointX}
          endPointY={endPointY}
          tileSize={tileSize}
          imgSrc={imgSrc as string}
          isForDownloadPdf={true}
        />
      </Center>
    </>
  );
};

export default PdfCanvas;
