import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import useOnClickOutside from "@/utils/useOnClickOutside";
import { useRef } from "react";
import svgIcon from "@/utils/svgIcon";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });
const MediumCourt = dynamic(() => import("@/components/MediumCourt"), { ssr: false });
const SmallCourt = dynamic(() => import("@/components/SmallCourt"), { ssr: false });

const Home: NextPage = () => {
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const dispatch = useDispatch();
  const ref = useRef(null); // click outside the canvas area can stop color changing
  const handleClickOutside = () => {
    dispatch(changeSelectedColor("none"));
    document.body.style.cursor = "auto";
  };
  useOnClickOutside(ref, handleClickOutside);

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
    <HeaderLayout>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {courtName === "510 m² Pro Court (17 m × 30 m)" && <ProFullCourt />}
        {courtName === "420 m² Full Court (15 m × 28 m)" && <FullCourt />}
        {courtName === "210 m² Pro Half Court (15 m × 14 m)" && <ProHalfCourt />}
        {courtName === "150 m² Half Court (15 m × 10 m)" && <HalfCourt />}
        {courtName === "70 m² Medium Court (7 m × 10 m)" && <MediumCourt />}
        {courtName === "45 m² Small Court (5 m × 9 m)" && <SmallCourt />}
      </div>
    </HeaderLayout>
  );
};

export default Home;
