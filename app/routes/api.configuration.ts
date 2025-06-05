import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";

export const loader: LoaderFunction = async () => {
  const configurations = await prisma.configuration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify(configurations), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const configuration = formData.get("configuration") as string;

    if (!configuration) {
      return new Response(
        JSON.stringify({ error: "Missing data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newConfig = await prisma.configuration.create({
      data: {
        ...JSON.parse(configuration)
      },
    });

    return new Response(JSON.stringify(newConfig), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create configuration" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};