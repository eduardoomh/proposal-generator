import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleBanner from "~/components/basics/TitleBanner";
import PdfContentForm from "~/components/forms/PdfForm";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${process.env.API_BASE_URL}/api/pdf-content/${id}`);

  if (!res.ok) {
    throw new Response("PDF Content not found", { status: 404 });
  }

  const pdfContent: PDFContentI = await res.json();
  return pdfContent
};

export default function UseProposal() {
  const content = useLoaderData<typeof loader>();

  return (
    <>
      <TitleBanner>Edit PDF Content</TitleBanner>
      <PdfContentForm pdfData={content} edit={true} />
     
    </>
  );
}