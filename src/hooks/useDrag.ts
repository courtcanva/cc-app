import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const useDrag = ({ ref }: { ref: RefObject<HTMLElement> }) => {
  const rawPosRef = useRef({ left: 0, top: 0 });
  const startPosRef = useRef({ left: 0, top: 0 });
  const [movedPosRefLeft, setMovedPosRefLeft] = useState(0);
  const [movedPosRefTop, setMovedPosRefTop] = useState(0);
  const onMouseMove = useCallback((e) => {
    window.requestAnimationFrame(() => {
      if (ref.current) {
        setMovedPosRefLeft(rawPosRef.current.left + e.clientX - startPosRef.current.left);
        setMovedPosRefTop(rawPosRef.current.top + e.clientY - startPosRef.current.top);
        // ref.current.style.transform = `translate(${
        //   rawPosRef.current.left + e.clientX - startPosRef.current.left
        // }px, ${rawPosRef.current.top + e.clientY - startPosRef.current.top}px)`;
        // ref.current.style.transform = `translate(${
        //   rawPosRef.current.left + e.clientX - startPosRef.current.left
        // }px, ${rawPosRef.current.top + e.clientY - startPosRef.current.top}px)`;
      }
    });
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      console.log("onMouseDown");
      if (ref.current) {
        ref.current.style.position = "absolute";
        rawPosRef.current = {
          left: ref.current.clientLeft,
          top: ref.current.clientTop,
        };
        startPosRef.current = {
          left: e.clientX,
          top: e.clientY,
        };
      }
      document.body.addEventListener("mousemove", onMouseMove);
    },
    [onMouseMove]
  );

  const onMouseUp = useCallback(() => {
    console.log("onMouseUp");
    if (ref.current) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.position = "static";
          ref.current.style.transform = "initial";
        }
      }, 100);
    }

    document.body.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", onMouseDown);
      document.body.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", onMouseDown);
        document.body.removeEventListener("mouseup", onMouseUp);
        document.body.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, []);
  return [movedPosRefLeft, movedPosRefTop];
};
export default useDrag;
