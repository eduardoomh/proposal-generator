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

interface FormContentProps {
    templateData?: any;
}

type TemplateKey = keyof ProposalI;

export default function TemplateForm({ templateData }: FormContentProps) {
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== "idle";
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [percentagesValid, setPercentagesValid] = useState(true);
    const [template, setTemplate] = useState({
        title: "",
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

        }
    });

    useEffect(() => {
        if (templateData) {
            setTemplate(templateData)
        }
    }, [templateData])


    useEffect(() => {
        const { engineering_percentage, architecture_percentage, sr_architecture_percentage } = template.resource_estimates;
        const total = Number(engineering_percentage) + Number(architecture_percentage) + Number(sr_architecture_percentage);

        setPercentagesValid(total === 100);
    }, [
        template.resource_estimates.engineering_percentage,
        template.resource_estimates.architecture_percentage,
        template.resource_estimates.sr_architecture_percentage
    ]);

    const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(key, name, value)
        if (key === '') {
            setTemplate((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setTemplate((prev) => ({
                ...prev,
                [key]: {
                    //@ts-ignore
                    ...prev[key as TemplateKey],
                    [name]: value
                }
            }));
        }

    };

    const onTextEditorChange = (key: string, name: string, val: string) => {
        setTemplate((prev) => ({
            ...prev,
            [key]: {
                //@ts-ignore
                ...prev[key],
                [name]: val,
            },
        }))
    }

    const onSelectChange = (
        key: TemplateKey | '',
        name: string,
        option: { label: string, value: string }
    ) => {
        console.log(key, name, option)
        if (option?.value === '') {
            console.warn(`El select "${name}" está vacío`);
            return;
        }

        if (key === '') {
            setTemplate((prev) => ({
                ...prev,
                [name]: option.value,
            }));
        } else {
            setTemplate((prev) => ({
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
        const TemplateResult = JSON.stringify(template);
        console.log(TemplateResult);
        fetcher.submit(
            { template: TemplateResult },
            {
                method: "post",
                action: "/api/templates",
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
                //@ts-ignore
                setNotification({ type: "success", message: `Template saved successfully, ID: ${fetcher.data.id}` });
            }
        }
    }, [fetcher.data]);

    return (
        <MainContainer>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <Title>Template name</Title>
            <FormContent singleColumn={true}>
                <FormField
                    label="Write the title for your template"
                    name="title"
                    type="text"
                    value={template.title}
                    placeholder="Enter your template name"
                    onChange={(e) => onChange('', e)}
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
                    value={template.invoicing_details.initial_invoice_amount}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('invoicing_details', e)}
                />
                <FormField
                    label="Minimum Retainer Amount"
                    name="minimum_retainer_amount"
                    type="number"
                    value={template.invoicing_details.minimum_retainer_amount}
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
                    value={template.estimates.estimated_cost}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('estimates', e)}
                />
                <FormField
                    label="Estimated Hours"
                    name="estimated_hours"
                    type="number"
                    value={template.estimates.estimated_hours}
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
                    value={template.resource_estimates.engineering_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Engineering %"
                    name="engineering_percentage"
                    type="number"
                    value={template.resource_estimates.engineering_percentage}
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
                    value={template.resource_estimates.architecture_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Architecture %"
                    name="architecture_percentage"
                    type="number"
                    value={template.resource_estimates.architecture_percentage}
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
                    value={template.resource_estimates.sr_architecture_rate}
                    placeholder="you@example.com"
                    onChange={(e) => onChange('resource_estimates', e)}
                />
                <FormField
                    label="Sr. Architecture %"
                    name="sr_architecture_percentage"
                    type="number"
                    value={template.resource_estimates.sr_architecture_percentage}
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
                    value={template.project_details.language}
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
                    value={template.project_details.description}
                    onChange={(val) => onTextEditorChange('project_details', 'description', val)}
                />
            </FormContent>
            <br />
            <Title>DELIVERABLES</Title>
            <Description>Write the full information about de proposal, details and more.</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={template.project_details.deliverables}
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