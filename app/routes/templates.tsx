import { Suspense, useEffect, useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { defer, Await, useLoaderData } from "@remix-run/react";

import MainContainer from "~/components/containers/MainContainer";
import TemplateTable from "~/components/tables/TemplateTable";
import TitleBanner from "~/components/basics/TitleBanner";
import { delay } from "~/utils/General";
import SkeletonTemplates from "~/components/skeletons/SkeletonTemplates";


export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Templates list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const templatesPromise = fetch(`${process.env.API_BASE_URL}/api/templates`)
    .then((res) => res.json())
    .then((data) => delay(500, data)); // espera mínimo 0.5s

  return defer({
    templates: templatesPromise,
  });
};

export default function TemplateList() {
  const { templates } = useLoaderData<typeof loader>();
  const [localTemplates, setLocalTemplates] = useState<TemplateI[] | null>(null);

  const handleDelete = (id: string) => {
    setLocalTemplates((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  return (
    <div>
      <TitleBanner showButton buttonLabel="Create New" buttonUrl="/new/template">
        Templates
      </TitleBanner>

      <MainContainer>
        <Suspense fallback={<SkeletonTemplates />}>
          <Await resolve={templates}>
            {(resolvedTemplates: TemplateI[]) => {

              useEffect(() => {
                setLocalTemplates(resolvedTemplates);
              }, []);

              return (
                <TemplateTable
                  templates={localTemplates ?? resolvedTemplates}
                  onDelete={handleDelete}
                />
              )
            }}
          </Await>
        </Suspense>
      </MainContainer>
    </div>
  );
}