import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import { useStoreSelector } from "@/store/hooks";
import courtList from "@/components/ChangeCourtSize/CourtList";

const Home: NextPage = () => {
  const { name: courtName } = useStoreSelector((state) => state.courtName);
  return (
    <HeaderLayout>
      {
        courtList.map(court => 
          courtName === (`${court.courtSizeName} ${court.courtSizeDetails}`) && court.court
        )
      }
    </HeaderLayout>
  );
};

export default Home;
