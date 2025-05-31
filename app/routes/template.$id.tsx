import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleBanner from "~/components/basics/TitleBanner";
import ProposalForm from "~/components/forms/ProposalForm";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${process.env.API_BASE_URL}/api/templates/${id}`);

  if (!res.ok) {
    throw new Response("Proposal not found", { status: 404 });
  }

  const template: TemplateI = await res.json();
  return {
    prepared_by: "Abraham Rios",
    choose_person: "",
    company_information: {
      presented_to_name: "",
      company_name: "",
      email_address: ""
    },
    ...template
  };
};

export default function UseProposal() {
  const template = useLoaderData<typeof loader>();

  return (
    <>
      <TitleBanner>New Proposal</TitleBanner>
      <ProposalForm proposalData={template} />
    </>
  );
}