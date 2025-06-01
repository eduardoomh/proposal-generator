import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { formatPDFContentForPrisma, formatPrismaToPDFContent } from "~/utils/PdfContent";

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

// DELETE o PUT: Eliminar o Editar PDFContent por ID
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
console.log("esta funcionando????")
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (request.method === "DELETE") {
    try {
      await prisma.pDFContent.delete({ where: { id } });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ error: "Delete failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (request.method === "PUT") {
    try {
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


      const updatedContent = await prisma.pDFContent.update({
        where: { id },
        data: prismaData,
      });

      return new Response(JSON.stringify(updatedContent), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch(error: any) {
      console.log(error, "vemos")
      return new Response(JSON.stringify({ error: "Update failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};