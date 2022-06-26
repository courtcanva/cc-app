import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import BorderDimensionLine from "../BasketballCourt/BorderDimensionLine";
import ArrowLine from "../BasketballCourt/Arrow";
import { useStoreSelector } from "@/store/hooks";
import { STAGE_MARGIN, START_POINT } from "@/constants/courtSize";
import { tileNumberCalculator } from "../../utils/tileNumberCalculator";
import debounce from "lodash.debounce";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength } = useStoreSelector(
    (state) => state.courtSize
  );
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const startPoint = useContext(START_POINT);

  const canvasRef = useRef(null);
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  const debouncedCalculation = useCallback(
    debounce(() => {
      canvas = canvasRef.current as unknown as HTMLCanvasElement;
      if (canvas) {
        ctx = canvas.getContext("2d");
        const tileNumResult = tileNumberCalculator(ctx, courtAndTileInfo);
        // To Delete later, console for preview only
        console.log(tileNumResult);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", checkSize);
    debouncedCalculation();
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const convasWidth = courtAreaXLength + STAGE_MARGIN * 2; // actual court size plus reserved margin size (prepare for 2m border)
  const convasHeight = courtAreaYLength + STAGE_MARGIN * 2;

  let stageHeight: number;
  size.height >= 768 ? (stageHeight = size.height - 250) : (stageHeight = 768 - 250);
  let stageWidth = stageHeight * (convasWidth / convasHeight);

  if ((size.height - 250) / (size.width - 118) > convasHeight / convasWidth) {
    size.width >= 768 ? (stageWidth = size.width - 118) : (stageWidth = 768 - 118);
    stageHeight = stageWidth * (convasHeight / convasWidth);
  }

  const courtRatio = stageHeight / (courtAreaYLength + STAGE_MARGIN * 2);
  const courtAndTileInfo = {
    beginPointX: (STAGE_MARGIN - borderLength) * courtRatio,
    beginPointY: (STAGE_MARGIN - borderLength) * courtRatio,
    endPointX: (STAGE_MARGIN + courtAreaXLength + borderLength) * courtRatio,
    endPointY: (STAGE_MARGIN + courtAreaYLength + borderLength) * courtRatio,
    // TO CHANGE LATER: tile size will be passed in instead of hard coding
    tileSize: 300 * courtRatio,
  };

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={stageWidth}
      minHeight={stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={stageHeight}
            width={stageWidth}
            scaleX={courtRatio}
            scaleY={courtRatio}
            visible={true}
            style={{ backgroundColor: "white" }}
            data-testid="stage"
          >
            <Provider store={store}>
              <Layer ref={canvasRef}>
                {/* border only for pro full court size */}
                <Border />
                {/* arrowLine & dimensionText can be reuse for all courts*/}
                <ArrowLine />
                {/* left side of pro full court*/}
                <Group>
                  <BorderDimensionLine />
                  <CourtArea courtWidth={courtAreaXLength / 2} />
                  <ThreePointArea />
                  <KeyArea />
                  <CircleArea />
                  <TopKeyArea />
                </Group>
                {/* right side of pro full court(flip the left side)*/}
                <Group scaleX={-1} x={startPoint.X * 2 + courtAreaXLength}>
                  <BorderDimensionLine />
                  <CourtArea courtWidth={courtAreaXLength / 2} />
                  <ThreePointArea />
                  <KeyArea />
                  <CircleArea />
                  <TopKeyArea />
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
