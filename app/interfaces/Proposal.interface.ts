
interface ProposalI{
    id: string;
    choose_person?: string;
    prepared_by: string;
    company_information: {
        presented_to_name: string;
        company_name: string;
        email_address: string;
    }
    invoicing_details: {
        initial_invoice_amount: number;
        minimum_retainer_amount: number;
    }
    estimates:{
        estimated_cost: number;
        estimated_hours: number;
    }
    resource_estimates:{
        engineering_rate: number;
        engineering_percentage: number;
        architecture_rate: number;
        architecture_percentage: number;
        sr_architecture_rate: number;
        sr_architecture_percentage: number;
    }
    project_details:{
        language: 'en' | 'es';
        description: string;
        deliverables: string;

    }
    created_at?: any;

}