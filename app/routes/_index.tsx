import type { MetaFunction } from "@remix-run/node";
import ProposalForm from "~/components/forms/ProposalForm";
import TitleBanner from "~/components/basics/TitleBanner";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "New Proposals" },
  ];
};

export default function Index() {
  return (
    <>
      <TitleBanner>New Proposal</TitleBanner>
      <ProposalForm />
    </>
  );
}
