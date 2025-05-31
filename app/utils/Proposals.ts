
export function formatProposalForPrisma(proposal: ProposalI) {
  return {
    choosePerson: proposal.choose_person ?? null,
    preparedBy: proposal.prepared_by,
    presentedToName: proposal.company_information.presented_to_name,
    companyName: proposal.company_information.company_name,
    emailAddress: proposal.company_information.email_address,
    initialInvoiceAmount: proposal.invoicing_details.initial_invoice_amount,
    minimumRetainerAmount: proposal.invoicing_details.minimum_retainer_amount,
    estimatedCost: proposal.estimates.estimated_cost,
    estimatedHours: proposal.estimates.estimated_hours,
    engineeringRate: proposal.resource_estimates.engineering_rate,
    engineeringPercentage: proposal.resource_estimates.engineering_percentage,
    architectureRate: proposal.resource_estimates.architecture_rate,
    architecturePercentage: proposal.resource_estimates.architecture_percentage,
    srArchitectureRate: proposal.resource_estimates.sr_architecture_rate,
    srArchitecturePercentage: proposal.resource_estimates.sr_architecture_percentage,
    language: proposal.project_details.language,
    description: proposal.project_details.description,
    deliverables: proposal.project_details.deliverables,
  };
}

export function formatPrismaToProposal(prismaProposal: any): ProposalI {
  return {
    id: prismaProposal.id,
    choose_person: prismaProposal.choosePerson ?? "",
    prepared_by: prismaProposal.preparedBy,
    company_information: {
      presented_to_name: prismaProposal.presentedToName,
      company_name: prismaProposal.companyName,
      email_address: prismaProposal.emailAddress,
    },
    invoicing_details: {
      initial_invoice_amount: prismaProposal.initialInvoiceAmount,
      minimum_retainer_amount: prismaProposal.minimumRetainerAmount,
    },
    estimates: {
      estimated_cost: prismaProposal.estimatedCost,
      estimated_hours: prismaProposal.estimatedHours,
    },
    resource_estimates: {
      engineering_rate: prismaProposal.engineeringRate,
      engineering_percentage: prismaProposal.engineeringPercentage,
      architecture_rate: prismaProposal.architectureRate,
      architecture_percentage: prismaProposal.architecturePercentage,
      sr_architecture_rate: prismaProposal.srArchitectureRate,
      sr_architecture_percentage: prismaProposal.srArchitecturePercentage,
    },
    project_details: {
      language: prismaProposal.language,
      description: prismaProposal.description,
      deliverables: prismaProposal.deliverables,
    },
    created_at: prismaProposal.createdAt,
  };
}