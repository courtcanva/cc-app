import type { NextPage } from "next";
import dynamic from 'next/dynamic';


const BasketballCourt = dynamic(() => import('../components/BasketballCourt'), { ssr: false });


const POC: NextPage = () => {

    return (
        <BasketballCourt />
    );
};

export default POC;
