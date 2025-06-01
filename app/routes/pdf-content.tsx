import { Suspense, useState, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { defer, Await, useLoaderData } from "@remix-run/react";

import MainContainer from "~/components/containers/MainContainer";
import TitleBanner from "~/components/basics/TitleBanner";
import PDFContentTable from "~/components/tables/PDFContentTable";
import { delay } from "~/utils/General";
import SkeletonPdfContent from "~/components/skeletons/SkeletonPdfContent";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "PDF Content list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const pdfContentPromise = fetch(`${process.env.API_BASE_URL}/api/pdf-content`)
    .then((res) => res.json())
    .then((data) => delay(500, data)); // delay para evitar parpadeo

  return defer({
    pdfContent: pdfContentPromise,
  });
};

export default function StaticContent() {
  const { pdfContent } = useLoaderData<typeof loader>();
  const [localContents, setLocalContents] = useState<PDFContentI[] | null>(null);


  const handleDelete = (id: string) => {
    setLocalContents((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  return (
    <div>
      <TitleBanner showButton buttonLabel="Create New" buttonUrl="/new/pdf-content">
        PDF Content
      </TitleBanner>

      <MainContainer>
        <Suspense fallback={<SkeletonPdfContent />}>
          <Await resolve={pdfContent}>
            {(resolvePdfContent: PDFContentI[]) => {
              useEffect(() => {
                setLocalContents(resolvePdfContent);
              }, []);

              return (
                <PDFContentTable
                  contents={localContents ?? resolvePdfContent}
                  onDelete={handleDelete}
                />
              )
            }}
          </Await>
        </Suspense>
      </MainContainer>
    </div>
  );
}