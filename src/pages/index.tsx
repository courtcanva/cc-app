import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });

const Home: NextPage = () => {
  return (
    <HeaderLayout>
      {/* <BasketballCourt /> */}
      <ProFullCourt />
    </HeaderLayout>
  );
};

export default Home;
