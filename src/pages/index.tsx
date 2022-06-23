import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });

const Home: NextPage = () => {
  return (
    <HeaderLayout>
      {/* <ProFullCourt /> */}
      {/* <FullCourt /> */}
      {/* <ProHalfCourt /> */}
      <HalfCourt />
    </HeaderLayout>
  );
};

export default Home;
