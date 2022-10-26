import { ControlPanelSlider } from "./ControlPanelSlider";
import { ReactNode, useRef, useState } from "react";
import { Button, Switch } from "@chakra-ui/react";
import useDrag from "@/hooks/useDrag";

const Container3D = ({
  stageWidth,
  stageHeight,
  children,
}: {
  stageWidth: number;
  stageHeight: number;
  children: ReactNode;
}) => {
  const [rotateHorizontalDeg, setRotateHorizontalDeg] = useState<number>(1);
  const [rotateVerticalDeg, setRotateVerticalDeg] = useState<number>(40);
  const [switch3D, setSwitch3D] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const [movedPosRefLeft, movedPosRefTop] = useDrag({ ref });
  return (
    <>
      <style jsx>{`
        .scene_3d {
          perspective: 2000px;
          transform-style: preserve-3d;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }
        .court_plane {
          height: ${stageHeight}px;
          width: ${stageWidth}px;
          perspective: 10000px;

          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          transform: rotateX(calc(${rotateVerticalDeg} * ${
        movedPosRefTop * 0.1
      } * 1deg)) rotateZ(calc(${rotateHorizontalDeg} * ${movedPosRefLeft} * 1deg))
             translate3d(0, 0, 0) translate(0px, 0px) scale(0.8);
        }
        .hoop_left {
          position:absolute;
          background-image: url("./hoop.png");
          background-size: 100% 100%;
          height: 20%;
          width: 10%;
          transform-style: preserve-3d;
          transform: rotateX(270deg) rotateY(90deg) translate3d(-245%, -50%, ${
            stageWidth * 0.025
          }px) ;
        }
        .hoop_right {
          position:absolute;
          background-image: url("./hoop.png");
          background-size: 100% 100%;
          height: 20%;
          width: 10%;
          transform-style: preserve-3d;
          transform: rotateX(270deg) rotateY(90deg) translate3d(-245%, -50%, ${
            stageWidth - stageWidth * 0.125
          }px) ;
        }
        
        .background{
          position:absolute;
          width:100vw;
          height:100vh;
          top:0px;
          left:0px;
          background-image: url("https://images.pexels.com/photos/5967934/pexels-photo-5967934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
        }
        .control_panel{
          position: absolute;
          width: 40%;
          height: 20%;
          right: 60px;
          bottom: 10px;
          z-index: 10;
        }
      }
      `}</style>
      <div className="background"></div>

      <div className="control_panel">
        <ControlPanelSlider
          setRotateDeg={setRotateHorizontalDeg}
          rotateDeg={rotateHorizontalDeg}
          minDeg={0}
          maxDeg={360}
        />
        <ControlPanelSlider
          setRotateDeg={setRotateVerticalDeg}
          rotateDeg={rotateVerticalDeg}
          minDeg={0}
          maxDeg={80}
          defaultDeg={40}
        />
        <Button colorScheme="twitter" size="md" onClick={() => setSwitch3D(!switch3D)}>
          2D/3D
        </Button>
      </div>

      {switch3D ? (
        <div className="scene_3d" ref={ref}>
          <div className="court_plane">
            <div className="hoop_left"></div>
            <div className="hoop_right"></div>
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Container3D;
