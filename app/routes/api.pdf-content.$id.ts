import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { formatPrismaToPDFContent } from "~/utils/PdfContent";

// GET: Obtener contenido por ID
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const content = await prisma.pDFContent.findUnique({ where: { id } });

  if (!content) {
    return new Response(JSON.stringify({ error: "PDFContent not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const formatted = formatPrismaToPDFContent(content);

  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// DELETE: Eliminar PDFContent por ID
export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "DELETE") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await prisma.pDFContent.delete({ where: { id } });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Delete failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};