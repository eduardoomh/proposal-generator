import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import MainContainer from "~/components/containers/MainContainer";
import TitleBanner from "~/components/basics/TitleBanner";
import PDFContentTable from "~/components/tables/PDFContentTable";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Templates list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/pdf-content`);
  const pdfContent: PDFContentI[] = await res.json();

  return new Response(JSON.stringify(pdfContent), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export default function StaticContent() {
  const loaderData = useLoaderData<PDFContentI[]>();
  const [contents, setContents] = useState(loaderData);

  const handleDelete = (id: string) => {
    setContents((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <TitleBanner showButton buttonLabel="Create New" buttonUrl="/new/pdf-content">PDF Content</TitleBanner>

      <MainContainer>
        <PDFContentTable contents={contents} onDelete={handleDelete} />
      </MainContainer>
    </div>
  );
}
