
export function formatTemplateForPrisma(template: TemplateI) {
  return {
    title: template.title,
    initialInvoiceAmount: template.invoicing_details.initial_invoice_amount,
    minimumRetainerAmount: template.invoicing_details.minimum_retainer_amount,
    estimatedCost: template.estimates.estimated_cost,
    estimatedHours: template.estimates.estimated_hours,
    engineeringRate: template.resource_estimates.engineering_rate,
    engineeringPercentage: template.resource_estimates.engineering_percentage,
    architectureRate: template.resource_estimates.architecture_rate,
    architecturePercentage: template.resource_estimates.architecture_percentage,
    srArchitectureRate: template.resource_estimates.sr_architecture_rate,
    srArchitecturePercentage: template.resource_estimates.sr_architecture_percentage,
    language: template.project_details.language,
    description: template.project_details.description,
    deliverables: template.project_details.deliverables,
  };
}

export function formatPrismaToTemplate(prismaTemplate: any): TemplateI {
  return {
    id: prismaTemplate.id,
    title: prismaTemplate.title,
    invoicing_details: {
      initial_invoice_amount: prismaTemplate.initialInvoiceAmount,
      minimum_retainer_amount: prismaTemplate.minimumRetainerAmount,
    },
    estimates: {
      estimated_cost: prismaTemplate.estimatedCost,
      estimated_hours: prismaTemplate.estimatedHours,
    },
    resource_estimates: {
      engineering_rate: prismaTemplate.engineeringRate,
      engineering_percentage: prismaTemplate.engineeringPercentage,
      architecture_rate: prismaTemplate.architectureRate,
      architecture_percentage: prismaTemplate.architecturePercentage,
      sr_architecture_rate: prismaTemplate.srArchitectureRate,
      sr_architecture_percentage: prismaTemplate.srArchitecturePercentage,
    },
    project_details: {
      language: prismaTemplate.language,
      description: prismaTemplate.description,
      deliverables: prismaTemplate.deliverables,
    },
    created_at: prismaTemplate.createdAt,
  };
}