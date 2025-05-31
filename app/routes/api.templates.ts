// app/routes/api/templates.ts
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import {
  formatPrismaToTemplate,
  formatTemplateForPrisma,
} from "~/utils/Templates"; // Ajusta la ruta si es diferente

export const loader: LoaderFunction = async () => {
  const templates = await prisma.template.findMany({
    orderBy: {
      createdAt: "desc", // del más reciente al más antiguo
    },
  });

  const formattedTemplates = templates.map(formatPrismaToTemplate);

  return new Response(JSON.stringify(formattedTemplates), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const templateJson = formData.get("template") as string;

  if (!templateJson) {
    return new Response(JSON.stringify({ error: "No template data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const template = JSON.parse(templateJson);
  const prismaTemplate = formatTemplateForPrisma(template);

  const savedTemplate = await prisma.template.create({
    data: prismaTemplate,
  });

  return new Response(JSON.stringify(savedTemplate), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};