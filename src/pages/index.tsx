import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";
import { useStoreSelector } from "@/store/hooks";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });
const MediumCourt = dynamic(() => import("@/components/MediumCourt"), { ssr: false });
const SmallCourt = dynamic(() => import("@/components/SmallCourt"), { ssr: false });

const Home: NextPage = () => {
  // const { name: courtName } = useStoreSelector((state) => state.courtName);
  const { courtId } = useStoreSelector((state) => state.courtName);
  return (
    <HeaderLayout>
      {courtId === "62c432cfb8a9c5f61f03831f" && <ProFullCourt />}
      {courtId === "62c432cfb8a9c5f61f038320" && <FullCourt />}
      {courtId === "62c432cfb8a9c5f61f038321" && <ProHalfCourt />}
      {courtId === "62c432cfb8a9c5f61f038322" && <HalfCourt />}
      {courtId === "62c432cfb8a9c5f61f038323" && <MediumCourt />}
      {courtId === "62c432cfb8a9c5f61f038324" && <SmallCourt />}
      {/* {courtName === "510 m² Pro Full Court (30 m × 17 m)" && <ProFullCourt />}
      {courtName === "420 m² Full Court (28 m × 15 m)" && <FullCourt />}
      {courtName === "210 m² Pro Half Court (14 m × 15 m)" && <ProHalfCourt />}
      {courtName === "150 m² Half Court (10 m × 15 m)" && <HalfCourt />}
      {courtName === "70 m² Medium Court (10 m × 7 m)" && <MediumCourt />}
      {courtName === "45 m² Small Court (9 m × 5 m)" && <SmallCourt />} */}
    </HeaderLayout>
  );
};

export default Home;
