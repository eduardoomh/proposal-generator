import { useEffect, useState } from "react";
import Description from "../basics/Description";
import FormContent from "../containers/FormContent";
import FormField from "./FormFields";
import TextEditor from "./TextEditor";
import Title from "../basics/Title";
import Button from "../basics/Button";
import MainContainer from "../containers/MainContainer";
import Notification from "../basics/Notification";
import { useFetcher } from "@remix-run/react";
import { handleDownloadPDF } from "~/utils/PdfGenerator";
import { getLanguageLabel } from "~/utils/General";

interface FormContentProps {
    proposalData?: any;
}

type ProposalKey = keyof ProposalI;

export default function ProposalForm({ proposalData }: FormContentProps) {
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== "idle";
    const [sellers, setSellers] = useState<{ label: string; value: string }[]>([
        { value: "Abraham Ríos", label: "Abraham Ríos" },
        { value: "Robert Riera", label: "Robert Riera" },
        { value: "Jorge Fernandez", label: "Jorge Fernandez" },
    ]);
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [percentagesValid, setPercentagesValid] = useState(true);
    const [proposal, setProposal] = useState({
        prepared_by: "Abraham Rios",
        company_information: {
            presented_to_name: "",
            company_name: "",
            email_address: "",
        },
        choose_person: "",
        invoicing_details: {
            initial_invoice_amount: 2750,
            minimum_retainer_amount: 2750,
        },
        estimates: {
            estimated_cost: 2750,
            estimated_hours: 10,
        },
        resource_estimates: {
            engineering_rate: 275,
            engineering_percentage: 90,
            architecture_rate: 375,
            architecture_percentage: 10,
            sr_architecture_rate: 475,
            sr_architecture_percentage: 0,
        },
        project_details: {
            language: 'en',
            description: "",
            deliverables: "",

        },
        created_at: new Date()
    });

    useEffect(() => {
        if (proposalData) {
            setProposal(proposalData)
        }
    }, [proposalData])


    useEffect(() => {
        if (proposal.choose_person) {
            setProposal((prev) => ({
                ...prev,
                prepared_by: prev.choose_person,
            }));
        }
    }, [proposal.choose_person]);

    useEffect(() => {
        console.log("propuesta", proposal.prepared_by)
    }, [proposal.prepared_by])

    useEffect(() => {
        const { engineering_percentage, architecture_percentage, sr_architecture_percentage } = proposal.resource_estimates;
        const total = Number(engineering_percentage) + Number(architecture_percentage) + Number(sr_architecture_percentage);

        setPercentagesValid(total === 100);
    }, [
        proposal.resource_estimates.engineering_percentage,
        proposal.resource_estimates.architecture_percentage,
        proposal.resource_estimates.sr_architecture_percentage
    ]);

    const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let formattedValue = type === 'number' ? Number(value) : value

        if (key === '') {
            setProposal((prev) => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setProposal((prev) => ({
                ...prev,
                [key]: {
                    //@ts-ignore
                    ...prev[key as ProposalKey],
                    [name]: formattedValue
                }
            }));
        }

    };

    const onTextEditorChange = (key: string, name: string, val: string) => {
        setProposal((prev) => ({
            ...prev,
            [key]: {
                //@ts-ignore
                ...prev[key],
                [name]: val,
            },
        }))
    }

    const onSelectChange = (
        key: ProposalKey | '',
        name: string,
        option: { label: string, value: string }
    ) => {
        console.log(key, name, option)
        if (option?.value === '') {
            console.warn(`El select "${name}" está vacío`);
            return;
        }

        if (key === '') {
            setProposal((prev) => ({
                ...prev,
                [name]: option.value,
            }));
        } else {
            setProposal((prev) => ({
                ...prev,
                [key]: {
                    //@ts-ignore
                    ...prev[key],
                    [name]: option.value,
                },
            }));
        }
    };

    const onSubmit = () => {
        const {
            prepared_by,
            company_information,
            invoicing_details,
            estimates,
            resource_estimates,
            project_details
        } = proposal;

        const requiredFields = [
            prepared_by,
            company_information.presented_to_name,
            company_information.company_name,
            company_information.email_address,
            invoicing_details.initial_invoice_amount,
            invoicing_details.minimum_retainer_amount,
            estimates.estimated_cost,
            estimates.estimated_hours,
            resource_estimates.engineering_rate,
            resource_estimates.engineering_percentage,
            resource_estimates.architecture_rate,
            resource_estimates.architecture_percentage,
            resource_estimates.sr_architecture_rate,
            resource_estimates.sr_architecture_percentage,
            project_details.language,
            project_details.description,
            project_details.deliverables
        ];

        const hasEmptyField = requiredFields.some((field) => {
            if (typeof field === "string") return field.trim() === "";
            if (typeof field === "number") return isNaN(field);
            return !field;
        });

        if (hasEmptyField || !percentagesValid) {
            setNotification({
                type: "error",
                message:
                    "Please complete all fields and ensure percentages add up to 100%.",
            });
            return;
        }

        const proposalResult = JSON.stringify(proposal);
        fetcher.submit(
            { proposal: proposalResult },
            {
                method: "post",
                action: "/api/proposals",
                encType: "application/x-www-form-urlencoded",
            }
        );
    };

    useEffect(() => {
        if (fetcher.data) {
            //@ts-ignore
            if (fetcher.data.error) {
                //@ts-ignore
                setNotification({ type: "error", message: fetcher.data.error });
            } else {
                const language = proposal.project_details.language;

                fetch(`/api/pdf-content/language/${language}`)
                    .then(res => {
                        console.log("res", res)
                        if (!res.ok) throw new Error("Failed to fetch PDF content");
                        return res.json();
                    })
                    .then(data => {
                        console.log("PDF Content:", data);
                        handleDownloadPDF(proposal as ProposalI, data)
                        //@ts-ignore
                        setNotification({ type: "success", message: `Proposal saved successfully, ID: ${fetcher.data.id}` });
                    })
                    .catch(err => {
                        console.error("Error fetching PDF content:", err);
                        setNotification({ type: "error", message: `Proposal saved, but PDF content in ${getLanguageLabel(language as 'es' | 'en')} it may not exist.` });
                    });
            }
        }
    }, [fetcher.data]);

    useEffect(() => {
        fetch("/api/configuration")
            .then(res => res.json())
            .then(data => {
                console.log(data, "oh la data")
                if (Array.isArray(data[0].sellers)) {
                    const formatted = data[0].sellers.map((s: string) => ({ label: s, value: s }));
                    setSellers(formatted);
                }
            })
            .catch(err => {
                console.error("Failed to load sellers:", err);
            });
    }, []);

    return (
        <MainContainer>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <Title>Prepared by</Title>
            <Description>Select the name of the creator of the proposal</Description>
            <FormContent>
                <FormField
                    label="Choose person"
                    name="choose_person"
                    type="select"
                    value={proposal.choose_person}
                    options={sellers}
                    onChange={(e: any) => onSelectChange('', 'choose_person', e)}
                />
                <FormField
                    key={`prepared-by-${proposal.choose_person}`}
                    label="Or"
                    name="prepared_by"
                    type="text"
                    value={proposal.prepared_by}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('', e)}
                />
            </FormContent>
            <br />
            <Title>Company Information</Title>
            <Description>Basic information about who the proposal is for.</Description>
            <FormContent>
                <FormField
                    label="Presented To Name"
                    name="presented_to_name"
                    type="text"
                    value={proposal.company_information.presented_to_name}
                    placeholder="John doe"
                    onChange={(e) => onChange('company_information', e)}
                />
                <FormField
                    label="Company Name"
                    name="company_name"
                    type="text"
                    value={proposal.company_information.company_name}
                    placeholder="company name"
                    onChange={(e) => onChange('company_information', e)}
                />
                <FormField
                    label="Email address"
                    name="email_address"
                    type="email"
                    value={proposal.company_information.email_address}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('company_information', e)}
                />
            </FormContent>
            <br />
            <Title>Invoicing Details</Title>
            <Description>Billing information.</Description>
            <FormContent>
                <FormField
                    label="Initial Invoice Amount"
                    name="initial_invoice_amount"
                    type="number"
                    value={proposal.invoicing_details.initial_invoice_amount}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('invoicing_details', e)}
                />
                <FormField
                    label="Minimum Retainer Amount"
                    name="minimum_retainer_amount"
                    type="number"
                    value={proposal.invoicing_details.minimum_retainer_amount}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('invoicing_details', e)}
                />
            </FormContent>
            <br />
            <Title>Estimates</Title>
            <Description>Project Estimates</Description>
            <FormContent>
                <FormField
                    label="Estimated Cost"
                    name="estimated_cost"
                    type="number"
                    value={proposal.estimates.estimated_cost}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('estimates', e)}
                />
                <FormField
                    label="Estimated Hours"
                    name="estimated_hours"
                    type="number"
                    value={proposal.estimates.estimated_hours}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('estimates', e)}
                />
            </FormContent>
            <br />
            <Title>Resource Estimates</Title>
            <Description>Make sure this adds up to 100%.</Description>
            <FormContent>
                <FormField
                    label="Engineering Rate"
                    name="engineering_rate"
                    type="number"
                    value={proposal.resource_estimates.engineering_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Engineering %"
                    name="engineering_percentage"
                    type="number"
                    value={proposal.resource_estimates.engineering_percentage}
                    min={0}
                    max={100}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                    error={!percentagesValid}
                />
                <FormField
                    label="Architecture Rate"
                    name="architecture_rate"
                    type="number"
                    value={proposal.resource_estimates.architecture_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Architecture %"
                    name="architecture_percentage"
                    type="number"
                    value={proposal.resource_estimates.architecture_percentage}
                    min={0}
                    max={100}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                    error={!percentagesValid}
                />

                <FormField
                    label="Sr. Architecture Rate"
                    name="sr_architecture_rate"
                    type="number"
                    value={proposal.resource_estimates.sr_architecture_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Sr. Architecture %"
                    name="sr_architecture_percentage"
                    type="number"
                    value={proposal.resource_estimates.sr_architecture_percentage}
                    min={0}
                    max={100}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                    error={!percentagesValid}
                />
            </FormContent>
            <br />
            <Title>Project Details</Title>
            <Description>Select Spanish if you would like the pdf to be in Spanish and the same with the templates. Default is English</Description>
            <FormContent>
                <FormField
                    label="Language"
                    name="language"
                    type="select"
                    value={proposal.project_details.language}
                    options={[
                        { value: "es", label: "Spanish" },
                        { value: "en", label: "English" },
                    ]}
                    onChange={(e: any) => onSelectChange('project_details', 'language', e)}
                />
            </FormContent>
            <br />
            <Title>DESCRIPTION</Title>
            <Description>Write the full information about de proposal, details and more.</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={proposal.project_details.description}
                    onChange={(val) => onTextEditorChange('project_details', 'description', val)}
                />
            </FormContent>
            <br />
            <Title>DELIVERABLES</Title>
            <Description>Write the full information about de proposal, details and more.</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={proposal.project_details.deliverables}
                    onChange={(val) => onTextEditorChange('project_details', 'deliverables', val)}
                />
            </FormContent>
            <br />
            <Button onClick={onSubmit} loading={isLoading}>
                Generate
            </Button>
        </MainContainer>
    );
}