// utils/pdfHelpers.tsx
import { pdf } from "@react-pdf/renderer";
import PDFView from '../components/basics/PDFView';

export const handleDownloadPDF = async (proposal: ProposalI, content: PDFContentI) => {
  const blob = await pdf(
    <PDFView
      proposal={proposal}
      content={content}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IP Insight Support - Business Proposal.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};