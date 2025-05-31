// app/routes/api/proposals.ts
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { formatPrismaToProposal, formatProposalForPrisma } from "~/utils/Proposals";

export const loader: LoaderFunction = async () => {
    const proposals = await prisma.proposal.findMany({
        orderBy: {
            createdAt: "desc", // ordena del más reciente al más antiguo
        },
    });

    const formattedProposals = proposals.map(formatPrismaToProposal);

    return new Response(JSON.stringify(formattedProposals), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const proposalJson = formData.get("proposal") as string;

    if (!proposalJson) {
        return new Response(JSON.stringify({ error: "No proposal data" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const proposal = JSON.parse(proposalJson);

    const prismaProposal = formatProposalForPrisma(proposal)

    const savedProposal = await prisma.proposal.create({
        data: prismaProposal,
    });

    return new Response(JSON.stringify(savedProposal), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};

