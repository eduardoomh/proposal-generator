import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import MainContainer from "~/components/containers/MainContainer";
import TemplateTable from "~/components/tables/TemplateTable";
import TitleBanner from "~/components/basics/TitleBanner";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Templates list" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/templates`);
  const templates: TemplateI[] = await res.json();

  return new Response(JSON.stringify(templates), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export default function TemplateList() {
  const loaderData = useLoaderData<TemplateI[]>();
  const [templates, setTemplates] = useState(loaderData);

  const handleDelete = (id: string) => {
    // Opcionalmente elimina localmente
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <TitleBanner showButton buttonLabel="Create New" buttonUrl="/new/template">Templates</TitleBanner>

      <MainContainer>
        <TemplateTable templates={templates} onDelete={handleDelete} />
      </MainContainer>
    </div>
  );
}
