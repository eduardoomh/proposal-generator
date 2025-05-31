import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleBanner from "~/components/basics/TitleBanner";
import PdfContentForm from "~/components/forms/PdfForm";
import { pdfContent } from "~/mocks/PdfContent";

export const loader: LoaderFunction = async ({ params }) => {
  const content = pdfContent.find((p) => p.id === params.id);
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  return content;
};

export default function UseProposal() {
  const content = useLoaderData<typeof loader>();

  return (
    <>
      <TitleBanner>Edit PDF Content</TitleBanner>
      <PdfContentForm pdfData={content} />
     
    </>
  );
}