import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleBanner from "~/components/basics/TitleBanner";
import ProposalForm from "~/components/forms/ProposalForm";
import { templates } from "~/mocks/Templates";

export const loader: LoaderFunction = async ({ params }) => {
  const template = templates.find((p) => p.id === params.id);
  if (!template) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    prepared_by: "Abraham Rios",
    choose_person: "",
    company_information:{
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