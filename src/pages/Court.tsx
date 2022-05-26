import type { NextPage } from "next";
import dynamic from "next/dynamic";

const BasketballCourt = dynamic(() => import("../components/BasketballCourt"), { ssr: false });

const Court: NextPage = () => {
  return <BasketballCourt />;
};

export default Court;
