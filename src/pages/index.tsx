import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import dynamic from "next/dynamic";

const BasketballCourt = dynamic(() => import("@/components/BasketballCourt"), { ssr: false });

const Home: NextPage = () => {
  return (
    <HeaderLayout>
      <BasketballCourt />
    </HeaderLayout>
  );
};

export default Home;
