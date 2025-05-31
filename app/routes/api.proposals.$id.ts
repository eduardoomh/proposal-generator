// app/routes/api/proposals.$id.ts
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { formatPrismaToProposal } from "~/utils/Proposals";

// GET: Obtener una proposal por ID
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const proposal = await prisma.proposal.findUnique({ where: { id } });

  if (!proposal) {
    return new Response(JSON.stringify({ error: "Proposal not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const formatted = formatPrismaToProposal(proposal);

  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// DELETE: Borrar proposal por ID
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
    await prisma.proposal.delete({ where: { id } });

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