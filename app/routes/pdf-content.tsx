import type { MetaFunction } from "@remix-run/node";
import MainContainer from "~/components/containers/MainContainer";
import TitleBanner from "~/components/basics/TitleBanner";
import PDFContentTable from "~/components/tables/PDFContentTable";
import { pdfContent } from "~/mocks/PdfContent";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Templates list" },
  ];
};

export default function StaticContent() {
  return (
    <div>
      <TitleBanner>PDF Content</TitleBanner>

      <MainContainer>
        <PDFContentTable contents={pdfContent} />
      </MainContainer>
    </div>
  );
}
