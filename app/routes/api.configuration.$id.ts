// routes/api/configurations/$id.ts
import type { ActionFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing configuration ID in params" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    if (request.method === "DELETE") {
      // DELETE: remove configuration by ID
      await prisma.configuration.delete({
        where: { id },
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // PUT: update configuration
    const formData = await request.formData();
    const configuration = formData.get("configuration") as string;

    if (!configuration) {
      return new Response(
        JSON.stringify({ error: "Missing configuration data in body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedConfig = await prisma.configuration.update({
      where: { id },
      data: {
        ...JSON.parse(configuration)
      },
    });

    return new Response(JSON.stringify(updatedConfig), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};