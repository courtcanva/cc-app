import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
  MutableRefObject,
  LegacyRef,
  MouseEventHandler,
} from "react";
import { Stage, Layer, Group, KonvaNodeComponent } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import { useStoreSelector } from "@/store/hooks";
import DashedLine from "../BasketballCourt/DashedLine";
import BorderDimension from "../BasketballCourt/BorderDimension";
import { calculation } from "@/utils/tileNumberCalculator";
import { useDispatch } from "react-redux";
import { changeTileQuantity } from "@/store/reducer/tileSlice";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import svgIcon from "@/utils/svgIcon";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const stageMargin = 2500;
  const startPoint = {
    X: stageMargin,
    Y: stageMargin,
  };
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const courtAndInfo = getCourtAndTileInfo(
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    stageMargin,
    size
  );
  const court = courtAndInfo.court;
  const courtAndTileInfo = courtAndInfo.courtAndTileInfo;

  const canvasRef = useRef(null);

  const tileCalculation = useCallback(calculation, []);

  const tileColorState = useStoreSelector((state) => state.tile.court);

  useLayoutEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const tileNumberResult = tileCalculation(canvasRef, courtAndTileInfo);
      dispatch(changeTileQuantity(tileNumberResult));
    }, 100);
    return () => clearTimeout(timer);
  }, [tileColorState]);

  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  useEffect(() => {
    if (typeof window !== "undefined" && selectedColor === "none") {
      document.body.style.cursor = "auto";
    }
  }, [selectedColor]);

  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref?.current && !ref.current.contains(event.target)) {
  //       dispatch(changeSelectedColor("none"));
  //       document.body.style.cursor = "auto";
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);

  const handleMouseEnter = () => {
    if (selectedColor !== "none") {
      const iconUrl = // import svg string from utils and convert it to cur type (svg cannot be used as cursor directly)
        `data:image/svg+xml;base64,` +
        window.btoa(unescape(encodeURIComponent(svgIcon(selectedColor))));
      document.body.style.cursor = `url(` + iconUrl + `) 24 24, auto`;
    }
  };
  const handleMouseLeave = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <Flex
      id="basketballCourt"
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={court.stageWidth}
      minHeight={court.stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // ref={ref}
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={court.stageHeight}
            width={court.stageWidth}
            scaleX={court.courtRatio}
            scaleY={court.courtRatio}
            visible={true}
            style={{ backgroundColor: "white" }}
            data-testid="stage"
          >
            <Provider store={store}>
              <Layer ref={canvasRef}>
                {/* border only for pro full court size */}
                <Border
                  startPoint={startPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <CourtDimension startPoint={startPoint} />
                <BorderDimension startPoint={startPoint} />
                {/* left side of pro full court*/}
                <Group>
                  <DashedLine startPoint={startPoint} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength}>
                  <DashedLine startPoint={startPoint} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={startPoint} />
                  <ThreePointArea startPoint={startPoint} />
                  <KeyArea startPoint={startPoint} />
                  <CircleArea startPoint={startPoint} />
                  <TopKeyArea startPoint={startPoint} />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default ProFullCourt;
