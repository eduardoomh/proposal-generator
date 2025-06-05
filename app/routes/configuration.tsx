import { useEffect, useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import MainContainer from "~/components/containers/MainContainer";
import TitleBanner from "~/components/basics/TitleBanner";
import ConfigurationForm from "~/components/forms/ConfigurationForm";
import { delay } from "~/utils/General";

export const meta: MetaFunction = () => {
  return [
    { title: "IpInsights - Proposals Generator" },
    { name: "description", content: "Configuration" },
  ];
};

export const loader: LoaderFunction = async () => {
  const configPromise = fetch(`${process.env.API_BASE_URL}/api/configuration`)
    .then(res => res.json())
    .then(data => delay(500, data)); // artificial delay

  return defer({
    configResult: configPromise,
  });
};

export default function Configuration() {
  const { configResult } = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState(true);
  const [configData, setConfigData] = useState<any>(null);

  useEffect(() => {
    if (typeof configResult?.then === "function") {
      configResult.then((data: any[]) => {
        setConfigData(Array.isArray(data) && data.length > 0 ? data[0] : null);
        setLoading(false);
      });
    } else {
      setConfigData(Array.isArray(configResult) && configResult.length > 0 ? configResult[0] : null);
      setLoading(false);
    }
  }, [configResult]);

  const edit = Boolean(configData);

  return (
    <div>
      <TitleBanner>Configuration</TitleBanner>
      <MainContainer>
        <ConfigurationForm
          configData={configData}
          edit={edit}
          loading={loading}
        />
      </MainContainer>
    </div>
  );
}