import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import svgIcon from "@/utils/svgIcon";
import { useEffect } from "react";
import { getCourtSpecData } from "@/store/reducer/courtSpecDataSlice";
import { changeCourtSize, CourtSpecMapper } from "@/store/reducer/courtSizeSlice";
import { useGetCourtsQuery } from "../redux/api/courtSizeApi";
import { courtSpecMapping } from "../utils/courtSpecMapping";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });
const MediumCourt = dynamic(() => import("@/components/MediumCourt"), { ssr: false });
const SmallCourt = dynamic(() => import("@/components/SmallCourt"), { ssr: false });

const Home: NextPage = () => {
  const { courtId } = useStoreSelector((state) => state.courtName);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const dispatch = useDispatch();

  const { data } = useGetCourtsQuery(0);

  useEffect(() => {
    if (data) {
      const mappedCourtData = data.map((item: CourtSpecMapper) => courtSpecMapping(item));
      dispatch(getCourtSpecData(mappedCourtData));
      dispatch(changeCourtSize(mappedCourtData[0]));
    }
  }, [data]);

  const ref = useRef(null); // click outside the canvas area can stop color changing
  const handleClickOutside = () => {
    dispatch(changeSelectedColor("none"));
    document.body.style.cursor = "auto";
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleMouseEnter = () => {
    if (selectedColor !== "none") {
      const iconUrl =
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
      <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {courtId === "62c432cfb8a9c5f61f03831f" && <ProFullCourt />}
        {courtId === "62c432cfb8a9c5f61f038320" && <FullCourt />}
        {courtId === "62c432cfb8a9c5f61f038321" && <ProHalfCourt />}
        {courtId === "62c432cfb8a9c5f61f038322" && <HalfCourt />}
        {courtId === "62c432cfb8a9c5f61f038323" && <MediumCourt />}
        {courtId === "62c432cfb8a9c5f61f038324" && <SmallCourt />}
      </div>
    </HeaderLayout>
  );
};

export default Home;
