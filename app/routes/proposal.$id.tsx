import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleBanner from "~/components/basics/TitleBanner";
import ProposalForm from "~/components/forms/ProposalForm";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${process.env.API_BASE_URL}/api/proposals/${id}`);

  if (!res.ok) {
    throw new Response("Proposal not found", { status: 404 });
  }

  const proposal: ProposalI = await res.json();
  return {
    ...proposal,
    choose_person: ""
  };
};

export default function UseProposal() {
  const proposal = useLoaderData<ProposalI>();

  return (
    <>
      <TitleBanner>Edit Proposal</TitleBanner>
      <ProposalForm proposalData={proposal} />
    </>
  );
}