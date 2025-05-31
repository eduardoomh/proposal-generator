import type { MetaFunction } from "@remix-run/node";
import MainContainer from "~/components/containers/MainContainer";
import ProposalsTable from "~/components/tables/ProposalsTable";
import TitleBanner from "~/components/basics/TitleBanner";
import { proposals } from "~/mocks/Proposals";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Proposals list" },
  ];
};

export default function Proposals() {
  return (
    <div>
      <TitleBanner>List of proposals</TitleBanner>
  
      <MainContainer>
        <ProposalsTable proposals={proposals} />
      </MainContainer>
      
    </div>
  );
}
