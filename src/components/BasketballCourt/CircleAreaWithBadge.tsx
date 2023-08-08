import { Circle } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { courtWhiteLine } from "../../store/reducer/courtSpecDataSlice";
import { ICourtStartPoint } from "@/interfaces/courtStartPoint";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { switchBadgeUsed } from "@/store/reducer/badgeSlice";
interface CircleAreaProps {
  startPoint: ICourtStartPoint;
}

const FULL_COURT_SIZE = 28000;

const CircleArea: React.FC<CircleAreaProps> = ({ startPoint }) => {
  const dispatch = useDispatch();
  const { courtAreaXLength, threePointLineToCourtEdgeLength, threePointLineRadius, circleRadius } =
    useStoreSelector((state) => state.courtSpecData.activeCourt);
  const { badgeImage, isBadgeUsed } = useStoreSelector((state) => state.badge);
  const offset = { x: badgeImage.width / 2, y: badgeImage.height / 2 };
  const scale = {
    x: (2 * circleRadius) / badgeImage.width,
    y: (2 * circleRadius) / badgeImage.height,
  };

  // coz pro full court is flipped, courtAreaXLength needs to be half of the court length
  const newCourtAreaXLength =
    courtAreaXLength === FULL_COURT_SIZE ? courtAreaXLength / 2 : courtAreaXLength;

  const [image, setImage] = useState(new Image());
  const loadingImg = new Image();
  loadingImg.onload = () => {
    setImage(loadingImg);
  };
  if (badgeImage.badgeImageUrl) {
    loadingImg.src = badgeImage.badgeImageUrl;
  }

  useEffect(() => {
    if (loadingImg.src) dispatch(switchBadgeUsed(true));
  }, [loadingImg.src]);

  return (
    <>
      {isBadgeUsed && (
        <Circle
          x={startPoint.X + newCourtAreaXLength}
          y={startPoint.Y + (threePointLineToCourtEdgeLength + threePointLineRadius)}
          radius={circleRadius}
          fillPatternImage={image}
          fillPatternOffset={offset}
          fillPriority="pattern"
          fillPatternRepeat={"no-repeat"}
          fillPatternScale={scale}
          stroke="white"
          strokeWidth={courtWhiteLine}
        />
      )}
    </>
  );
};

export default CircleArea;
