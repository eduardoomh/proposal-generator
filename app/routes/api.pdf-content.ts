import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import {
  formatPDFContentForPrisma,
  formatPrismaToPDFContent,
} from "~/utils/PdfContent"; 

export const loader: LoaderFunction = async () => {
  const contents = await prisma.pDFContent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted = contents.map(formatPrismaToPDFContent);

  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const contentJson = formData.get("pdfContent") as string;

  if (!contentJson) {
    return new Response(JSON.stringify({ error: "No PDF content data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const content = JSON.parse(contentJson);
  const prismaData = formatPDFContentForPrisma(content);

  const saved = await prisma.pDFContent.create({
    data: prismaData,
  });

  return new Response(JSON.stringify(saved), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};