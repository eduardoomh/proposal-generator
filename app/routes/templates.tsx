import type { MetaFunction } from "@remix-run/node";
import MainContainer from "~/components/containers/MainContainer";
import TemplateTable from "~/components/tables/TemplateTable";
import TitleBanner from "~/components/basics/TitleBanner";
import { templates } from "~/mocks/Templates";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Templates list" },
  ];
};

export default function TemplateList() {
  return (
    <div>
      <TitleBanner showButton buttonLabel="Create New" buttonUrl="/new/template">Templates</TitleBanner>

      <MainContainer>
        <TemplateTable templates={templates} />
      </MainContainer>
    </div>
  );
}
