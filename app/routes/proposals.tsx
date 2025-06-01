import { Suspense, useState, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { defer, Await, useLoaderData } from "@remix-run/react";

import MainContainer from "~/components/containers/MainContainer";
import ProposalsTable from "~/components/tables/ProposalsTable";
import TitleBanner from "~/components/basics/TitleBanner";
import SkeletonProposals from "~/components/skeletons/SkeletonProposals";
import { delay } from "~/utils/General";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Proposals list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const proposalsPromise = fetch(`${process.env.API_BASE_URL}/api/proposals`)
    .then((res) => res.json())
    .then((data) => delay(700, data)); // espera mínimo 700ms

  return defer({
    proposals: proposalsPromise,
  });
};

export default function Proposals() {
  const { proposals } = useLoaderData<typeof loader>();
  const [localProposals, setLocalProposals] = useState<ProposalI[] | null>(null);

  const handleDelete = (id: string) => {
    setLocalProposals((prev) => prev?.filter((p) => p.id !== id) ?? []);
  };

  return (
    <div>
      <TitleBanner>List of proposals</TitleBanner>

      <MainContainer>
        <Suspense fallback={<SkeletonProposals />}>
          <Await resolve={proposals}>
            {(resolvedProposals: ProposalI[]) => {
              // Inicializa el estado solo una vez cuando se resuelven los datos
              useEffect(() => {
                setLocalProposals(resolvedProposals);
              }, []);

              return (
                <ProposalsTable
                  proposals={localProposals ?? resolvedProposals}
                  onDelete={handleDelete}
                />
              );
            }}
          </Await>
        </Suspense>
      </MainContainer>
    </div>
  );
}