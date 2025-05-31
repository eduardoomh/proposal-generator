import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { proposals } from "~/mocks/Proposals";
import TitleBanner from "~/components/basics/TitleBanner";
import ProposalForm from "~/components/forms/ProposalForm";

export const loader: LoaderFunction = async ({ params }) => {
  const proposal = proposals.find((p) => p.id === params.id);
  if (!proposal) {
    throw new Response("Not Found", { status: 404 });
  }

  return proposal;
};

export default function UseProposal() {
  const proposal = useLoaderData<typeof loader>();

  return (
    <>
      <TitleBanner>New Proposal</TitleBanner>
      <ProposalForm proposalData={proposal} />
    </>
  );
}