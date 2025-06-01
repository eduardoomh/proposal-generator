import type { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { formatPrismaToPDFContent } from "~/utils/PdfContent";

export const loader: LoaderFunction = async ({ params }) => {
  const language = params.language;

  if (!language || (language !== "es" && language !== "en")) {
    return new Response(JSON.stringify({ error: "Invalid or missing language" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const content = await prisma.pDFContent.findFirst({
    where: { language },
    orderBy: { createdAt: "desc" },
  });

  if (!content) {
    return new Response(JSON.stringify({ error: "No content found for that language" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(formatPrismaToPDFContent(content)), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};