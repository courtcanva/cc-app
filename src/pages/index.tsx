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
  const { courtId } = useStoreSelector((state) => state.courtName);
  return (
    <HeaderLayout>
      {courtId === "62c432cfb8a9c5f61f03831f" && <ProFullCourt />}
      {courtId === "62c432cfb8a9c5f61f038320" && <FullCourt />}
      {courtId === "62c432cfb8a9c5f61f038321" && <ProHalfCourt />}
      {courtId === "62c432cfb8a9c5f61f038322" && <HalfCourt />}
      {courtId === "62c432cfb8a9c5f61f038323" && <MediumCourt />}
      {courtId === "62c432cfb8a9c5f61f038324" && <SmallCourt />}
    </HeaderLayout>
  );
};

export default Home;
