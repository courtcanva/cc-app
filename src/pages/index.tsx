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
import { getCourtSpecData, CourtSpecMapper } from "@/store/reducer/courtSpecDataSlice";
import { useGetCourtsQuery } from "../redux/api/courtSizeApi";
import { courtSpecMapping } from "../utils/courtSpecMapping";
import LoadingPage from "@/components/LoadingPage";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });
const MediumCourt = dynamic(() => import("@/components/MediumCourt"), { ssr: false });
const SmallCourt = dynamic(() => import("@/components/SmallCourt"), { ssr: false });

const Home: NextPage = () => {
  const { courtName } = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetCourtsQuery(0);

  useEffect(() => {
    if (data) {
      const mappedCourtData = data.map((item: CourtSpecMapper) => courtSpecMapping(item));
      dispatch(getCourtSpecData(mappedCourtData));
    }
  }, [data]);

  const ref = useRef(null); // click outside the canvas area can stop color changing
  const handleClickOutside = () => {
    dispatch(changeSelectedColor("transparent"));
    document.body.style.cursor = "auto";
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleMouseEnter = () => {
    if (selectedColor !== "transparent") {
      const iconUrl = // import svg string from utils and convert it to cur type (svg cannot be used as cursor directly)
        `data:image/svg+xml;base64,` +
        window.btoa(decodeURIComponent(encodeURIComponent(svgIcon(selectedColor)))); // replace escape with decodeURIComponent https://stackoverflow.com/questions/27926562/deprecation-of-javascript-function-unescape
      document.body.style.cursor = `url(` + iconUrl + `) 24 24, auto`;
    }
  };
  const handleMouseLeave = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <HeaderLayout>
      <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isLoading && <LoadingPage />}
        {courtName === "Pro Full Court" && <ProFullCourt />}
        {courtName === "Full Court" && <FullCourt />}
        {courtName === "Pro Half Court" && <ProHalfCourt />}
        {courtName === "Half Court" && <HalfCourt />}
        {courtName === "Medium Court" && <MediumCourt />}
        {courtName === "Small Court" && <SmallCourt />}
      </div>
    </HeaderLayout>
  );
};

export default Home;
