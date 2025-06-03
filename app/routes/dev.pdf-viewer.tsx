// app/routes/dev/pdf-preview.tsx
import { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { proposals } from "~/mocks/Proposals";
import { pdfContent } from "~/mocks/PdfContent";
import PDFView from "~/components/PDF/PDFView";

export default function PDFPreviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const proposal = proposals[0];
  const content = pdfContent[0];

  if (!isClient) return <p className="p-4">Loading preview...</p>;

  return (
    <div className="w-screen h-[100dvh]">
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <PDFView proposal={proposal} content={content} />
      </PDFViewer>
    </div>
  );
}