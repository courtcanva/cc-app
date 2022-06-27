import dynamic from "next/dynamic";

const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
const FullCourt = dynamic(() => import("@/components/FullCourt"), { ssr: false });
const ProHalfCourt = dynamic(() => import("@/components/ProHalfCourt"), { ssr: false });
const HalfCourt = dynamic(() => import("@/components/HalfCourt"), { ssr: false });
const MediumCourt = dynamic(() => import("@/components/MediumCourt"), { ssr: false });
const SmallCourt = dynamic(() => import("@/components/SmallCourt"), { ssr: false });

const courtList = [
  {
    courtSizeName: "510 ㎡ Pro Court",
    courtSizeDetails: "(17 m * 30 m)",
    img: "./courtSize/Pro-Full-Court.png",
    court: <ProFullCourt />
  },
  {
    courtSizeName: "420 ㎡ Full Court",
    courtSizeDetails: "(15 m * 28 m)",
    img: "./courtSize/Full-Court.png",
    court: <FullCourt />
  },
  {
    courtSizeName: "45 ㎡ Small Court",
    courtSizeDetails: "(5 m * 9 m)",
    img: "./courtSize/Small-Court.png",
    court: <ProHalfCourt />
  },
  {
    courtSizeName: "210 ㎡ Pro Half Court",
    courtSizeDetails: "(15 m * 14 m)",
    img: "./courtSize/Pro-Half-Court.png",
    court: <HalfCourt />
  },
  {
    courtSizeName: "150 ㎡ Half Court",
    courtSizeDetails: "(15 m * 10 m)",
    img: "./courtSize/Half-Court.png",
    court: <MediumCourt />
  },
  {
    courtSizeName: "70 ㎡ Medium Court",
    courtSizeDetails: "(7 m * 10 m)",
    img: "./courtSize/Medium-Court.png",
    court: <SmallCourt />
  },
];
export default courtList;
