import { useEffect, useState } from "react";
import Description from '../basics/Description';
import FormContent from "../containers/FormContent";
import TextEditor from "./TextEditor";
import Title from "../basics/Title";
import Button from "../basics/Button";
import MainContainer from "../containers/MainContainer";
import FormField from "./FormFields";
import Notification from "../basics/Notification";
import { useFetcher } from "@remix-run/react";

interface FormContentProps {
    pdfData?: any;
    edit?: boolean;
}

type PdfKey = keyof PDFContentI;

export default function PdfContentForm({ pdfData, edit }: FormContentProps) {
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== "idle";
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [pdfContent, setPdfContent] = useState({
        id: "",
        title: "",
        language: "",
        general: {
            text_1: ""
        },
        who_will_work: {
            text_1: ""
        },
        how_we_get_started: {
            text_1: ""
        },
        how_you_are_billed: {
            text_1: "",
            text_2: "",
            alert: ""
        },
        how_we_keep_going: {
            text_1: "",
            alert: "",
        },
        availability_and_sla: {
            text_1: "",
        },
        estimates: {
            text_1: ""
        }
    });

    useEffect(() => {
        if (pdfData) {
            setPdfContent(pdfData)
        }
    }, [pdfData])

    const onTextEditorChange = (key: string, name: string, val: string) => {
        setPdfContent((prev) => ({
            ...prev,
            [key]: {
                //@ts-ignore
                ...prev[key],
                [name]: val,
            },
        }))
    }

    const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let formattedValue = type === 'number' ? Number(value) : value
        if (key === '') {
            setPdfContent((prev) => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setPdfContent((prev) => ({
                ...prev,
                [key]: {
                    //@ts-ignore
                    ...prev[key as ProposalKey],
                    [name]: formattedValue
                }
            }));
        }

    };

    const onSelectChange = (
        key: PdfKey | '',
        name: string,
        option: { label: string, value: string }
    ) => {
        if (option?.value === '') {
            console.warn(`El select "${name}" está vacío`);
            return;
        }

        if (key === '') {
            setPdfContent((prev) => ({
                ...prev,
                [name]: option.value,
            }));
        } else {
            setPdfContent((prev) => ({
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
        const contentResult = JSON.stringify(pdfContent);
        console.log(contentResult);

        const id = pdfContent.id;

        if (edit && id) {
            fetcher.submit(
                { pdfContent: contentResult },
                {
                    method: "put",
                    action: `/api/pdf-content/${id}`,
                    encType: "application/x-www-form-urlencoded",
                }
            );
        } else {
            fetcher.submit(
                { pdfContent: contentResult },
                {
                    method: "post",
                    action: "/api/pdf-content",
                    encType: "application/x-www-form-urlencoded",
                }
            );
        }
    };

    useEffect(() => {
        if (fetcher.data) {
            //@ts-ignore
            if (fetcher.data.error) {
                //@ts-ignore
                setNotification({ type: "error", message: fetcher.data.error });
            } else {
                //@ts-ignore
                setNotification({ type: "success", message: `PDF Content ${edit ? 'edited' : 'saved'} successfully, ID: ${fetcher.data.id}` });
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
            <Title>BASIC INFORMATION</Title>
            <Description>A title decription for PDF Template</Description>
            <FormContent singleColumn={true}>
                <FormField
                    label="Template title"
                    name="title"
                    type="text"
                    value={pdfContent.title}
                    placeholder="John doe"
                    onChange={(e) => onChange('', e)}
                />
            </FormContent>
            <br />
            <Title>GENERAL DESCRIPTION</Title>
            <Description>General Description</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.general.text_1}
                    onChange={(val) => onTextEditorChange('general', 'text_1', val)}
                />
            </FormContent>
            <br />
            <Title>WHO WILL WORK</Title>
            <Description>who will work on this proposal</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.who_will_work.text_1}
                    onChange={(val) => onTextEditorChange('who_will_work', 'text_1', val)}
                />
            </FormContent>
            <br />
            <Title>HOW WE GET STARTED</Title>
            <Description>How we get started on this project</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_we_get_started.text_1}
                    onChange={(val) => onTextEditorChange('how_we_get_started', 'text_1', val)}
                />
            </FormContent>
            <br />
            <Title>HOW YOU ARE BILLED</Title>
            <Description>How you are billed on this project</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_you_are_billed.text_1}
                    onChange={(val) => onTextEditorChange('how_you_are_billed', 'text_1', val)}
                />
            </FormContent>
            <Description>Second Paragraph</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_you_are_billed.text_2}
                    onChange={(val) => onTextEditorChange('how_you_are_billed', 'text_2', val)}
                />
            </FormContent>
            <Description>Alert Paragraph</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_you_are_billed.alert}
                    onChange={(val) => onTextEditorChange('how_you_are_billed', 'alert', val)}
                />
            </FormContent>
            <br />
            <Title>HOW WE KEEP GOING</Title>
            <Description>How we keep going on this project</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_we_keep_going.text_1}
                    onChange={(val) => onTextEditorChange('how_we_keep_going', 'text_1', val)}
                />
            </FormContent>
            <Description>Alert Paragraph</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.how_we_keep_going.alert}
                    onChange={(val) => onTextEditorChange('how_we_keep_going', 'alert', val)}
                />
            </FormContent>
            <br />
            <Title>AVAILABILITY AND SLA</Title>
            <Description>Availability and SLA on this project</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.availability_and_sla.text_1}
                    onChange={(val) => onTextEditorChange('availability_and_sla', 'text_1', val)}
                />
            </FormContent>
            <br />
            <Title>ESTIMATES</Title>
            <Description>Estimates on this project</Description>
            <FormContent singleColumn={true}>
                <TextEditor
                    value={pdfContent.estimates.text_1}
                    onChange={(val) => onTextEditorChange('estimates', 'text_1', val)}
                />
            </FormContent>
            <br />
            <Title>LANGUAGE</Title>
            <Description>Select Spanish if you would like the pdf to be in Spanish and the same with the templates. Default is English</Description>
            <FormContent>
                <FormField
                    label="Language"
                    name="language"
                    type="select"
                    value={pdfContent.language}
                    options={[
                        { value: "es", label: "Spanish" },
                        { value: "en", label: "English" },
                    ]}
                    onChange={(e: any) => onSelectChange('', 'language', e)}
                />
            </FormContent>

            <br />
            <Button onClick={onSubmit} loading={isLoading}>
                {edit ? 'Update' : 'Save'} Changes
            </Button>
        </MainContainer >
    );
}