import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import MainContainer from "~/components/containers/MainContainer";
import ProposalsTable from "~/components/tables/ProposalsTable";
import TitleBanner from "~/components/basics/TitleBanner";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Proposals list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/proposals`);
  const proposals: ProposalI[] = await res.json();

  return new Response(JSON.stringify(proposals), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export default function Proposals() {
  const loaderData = useLoaderData<ProposalI[]>();
  const [proposals, setProposals] = useState(loaderData);

  const handleDelete = (id: string) => {
    setProposals((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <TitleBanner>List of proposals</TitleBanner>

      <MainContainer>
        <ProposalsTable proposals={proposals} onDelete={handleDelete} />
      </MainContainer>
    </div>
  );
}