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
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  return (
    <HeaderLayout>
      {courtName === "510 m² Pro Court (17 m × 30 m)" && <ProFullCourt />}
      {courtName === "420 m² Full Court (15 m × 28 m)" && <FullCourt />}
      {courtName === "210 m² Pro Half Court (15 m × 14 m)" && <ProHalfCourt />}
      {courtName === "150 m² Half Court (15 m × 10 m)" && <HalfCourt />}
      {courtName === "70 m² Medium Court (7 m × 10 m)" && <MediumCourt />}
      {courtName === "45 m² Small Court (5 m × 9 m)" && <SmallCourt />}
    </HeaderLayout>
  );
};

export default Home;
