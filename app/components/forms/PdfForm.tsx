import { useEffect, useState } from "react";
import Description from '../basics/Description';
import FormContent from "../containers/FormContent";
import TextEditor from "./TextEditor";
import Title from "../basics/Title";
import Button from "../basics/Button";
import MainContainer from "../containers/MainContainer";
import FormField from "./FormFields";

interface FormContentProps {
    pdfData?: any;
}

type PdfKey = keyof PDFContentI;

export default function PdfContentForm({ pdfData }: FormContentProps) {
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
        const { name, value } = e.target;
        console.log(key, name, value)
        if (key === '') {
            setPdfContent((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setPdfContent((prev) => ({
                ...prev,
                [key]: {
                    //@ts-ignore
                    ...prev[key as ProposalKey],
                    [name]: value
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
        const pdfResult = JSON.stringify(pdfContent)
        console.log(pdfResult);
    };

    return (
        <MainContainer>
            <Title>BASIC INFORMATION</Title>
            <Description>A title decription for PDF Template</Description>
            <FormContent>
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
                    value={pdfContent.how_we_keep_going.alert}
                    onChange={(val) => onTextEditorChange('how_we_keep_going', 'alert', val)}
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
            <Button onClick={onSubmit}>
                Save Changes
            </Button>
        </MainContainer >
    );
}