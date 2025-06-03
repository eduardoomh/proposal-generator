
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer'
import { useState } from 'react';
import { registerMontserratFonts } from '~/utils/Fonts';
import { extractParagraphsFromHTML } from '~/utils/PdfContent';
import { extractFormattedContentFromHTMLv2 } from '~/utils/PdfUtils';

//styles
export const styles = StyleSheet.create({
    page: {
        padding: '16px 24px',
        fontFamily: "Montserrat",
    },
    viewContainer: {
        margin: '6px 0'
    },
    containerGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    short_text: {
        fontSize: '8px',
        color: 'gray',
        fontFamily: "Montserrat",
        fontWeight: '600',
    },
    general_text: {
        fontSize: '8px',
        color: 'black',
        marginBottom: '4px',
        fontFamily: "Montserrat",
        fontWeight: '500'
    },
    section_title: {
        color: '#1790c1',
        fontSize: '14px',
        marginBottom: '4px',
        fontFamily: "Montserrat",
        fontWeight: '600'
    },
    section_title_2: {
        color: '#1790c1',
        fontSize: '14px',
        fontFamily: "Montserrat",
        fontWeight: '600'
    },
    alert_msg_1: {
        backgroundColor: '#D6EBF0',
        color: '#255365',
        padding: '8px',
        fontSize: '8px',
        marginBottom: '4px',
        fontFamily: "Montserrat",
        fontWeight: '500',
        borderRadius: '2px'
    },
    alert_msg_2: {
        backgroundColor: '#FAF1DB',
        color: '#83622D',
        padding: '8px',
        fontSize: '8px',
        marginBottom: '4px',
        marginTop: '4px',
        fontFamily: "Montserrat",
        fontWeight: '500',
        borderRadius: '2px'
    },
    alert_msg_3: {
        backgroundColor: '#EDECEC',
        color: '#544D5F',
        padding: '8px',
        fontSize: '8px',
        marginBottom: '4px',
        fontFamily: "Montserrat",
        fontWeight: '500',
        borderRadius: '2px'
    },
    container: {
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
        gap: 32,
    },
    container_2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 8,
        gap: 32,
    },
    column: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1 solid #ccc",
        paddingVertical: 4,
    },
    label: {
        fontSize: 9,
        fontWeight: "bold"

    },
    value: {
        fontSize: 9,
        fontWeight: '500'
    },
    table: {
        display: "table",
        width: "auto",
        marginVertical: 10,
        borderTop: "1 solid #ccc",       // <- Asegura borde superior
        borderLeft: "1 solid #ccc",      // <- Asegura borde izquierdo
    },
    tableRow: {
        flexDirection: "row",
    },
    headerRow: {
        backgroundColor: "#f0f0f0",
    },
    tableCol: {
        flex: 1,
        padding: 6,
        borderBottom: "1 solid #ccc",
        borderRight: "1 solid #ccc",
    },
    tableCell: {
        fontSize: 9,
        fontWeight: '500'
    },
    tableCellHeader: {
        fontSize: 9,
        fontWeight: 'bold'
    },
    fullWidthNote: {
        marginTop: 8,
        paddingLeft: 4,
        fontSize: 10,
    },
    bold: {
        fontWeight: 700,
        fontFamily: "Montserrat",
    },
    list_item_text: {
        fontSize: 8,
        color: 'black',
        fontFamily: "Montserrat",
        fontWeight: '500',
        marginBottom: 2, // más compacto que general_text
    },

    list_bullet: {
        fontSize: 12, // un poco más grande el punto
        marginRight: 6,
        lineHeight: 1.2,
    },
})

interface Props {
    proposal: ProposalI;
    content: PDFContentI;
}

export default function PDFView(props: Props) {
    const { proposal, content } = props;
    const [percentageWork] = useState([
        { label: "Senior Architect", percentage: proposal.resource_estimates.sr_architecture_percentage },
        { label: "Architect", percentage: proposal.resource_estimates.architecture_percentage },
        { label: "Engineer", percentage: proposal.resource_estimates.engineering_percentage },
    ])

    registerMontserratFonts();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image
                        src="/IP-insight-support-banner.webp"
                        style={styles.logo}
                    />
                </View>
                <View style={styles.viewContainer}>
                    {extractFormattedContentFromHTMLv2(content.general.text_1, { company_name: proposal.company_information.company_name }).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.alert_msg_3}>
                            {para}
                        </Text>
                    ))}
                </View>
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title_2}>Summary</Text>
                    <View style={styles.container_2}>
                        <View style={styles.column}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Presented To:</Text>
                                <Text style={styles.value}>{proposal.company_information.presented_to_name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Presented On:</Text>
                                <Text style={styles.value}>{new Date(proposal.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Prepared By:</Text>
                                <Text style={styles.value}>{proposal.prepared_by}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Valid Through:</Text>
                                <Text style={styles.value}>
                                    {new Date(new Date(proposal.created_at).setMonth(new Date(proposal.created_at).getMonth() + 1)).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.column}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Initial Invoice</Text>
                                <Text style={styles.value}>${proposal.invoicing_details.initial_invoice_amount}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Minimum Retainer Amount</Text>
                                <Text style={styles.value}>${proposal.invoicing_details.minimum_retainer_amount}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Project Estimate</Text>
                                <Text style={styles.value}>${proposal.estimates.estimated_cost}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Estimated Hours</Text>
                                <Text style={styles.value}>{proposal.estimates.estimated_hours} Hours</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.viewContainer}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>Project Description</Text>
                            {extractFormattedContentFromHTMLv2(proposal.project_details.description)}
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>Deliverables</Text>
                            {extractFormattedContentFromHTMLv2(proposal.project_details.deliverables)}
                        </View>
                    </View>

                </View>

                <View style={styles.viewContainer}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>Who Will Work On This Project</Text>
                            {extractFormattedContentFromHTMLv2(content.who_will_work.text_1)}
                        </View>
                        <View style={styles.column}>
                            {percentageWork.map(({ label, percentage }, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                        paddingBottom: 8,
                                        borderBottom: idx < percentageWork.length - 1 ? "0.5 solid #ccc" : "none",
                                        gap: 8,
                                    }}
                                >
                                    {/* Label a la izquierda */}
                                    <Text
                                        style={{
                                            fontSize: 8,
                                            fontFamily: "Montserrat",
                                            fontWeight: 600,
                                            width: 80,
                                        }}
                                    >
                                        {label}
                                    </Text>

                                    {/* Barra de porcentaje a la derecha */}
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 12,
                                            backgroundColor: "#e0e0e0",
                                            borderRadius: 4,
                                            overflow: "hidden",
                                            position: "relative",
                                        }}
                                    >
                                        <View
                                            style={{
                                                height: "100%",
                                                width: `${percentage}%`,
                                                backgroundColor: "#1790c1",
                                                justifyContent: "center",
                                                alignItems: percentage > 10 ? "center" : "flex-start",
                                                paddingLeft: 4,
                                            }}
                                        >
                                            {percentage > 0 && (
                                                <Text
                                                    style={{
                                                        fontSize: 6,
                                                        color: "white",
                                                        fontFamily: "Montserrat",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {percentage}%
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How We Get Started</Text>
                    {extractFormattedContentFromHTMLv2(content.how_we_get_started.text_1)}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How You Are Billed</Text>
                    {extractFormattedContentFromHTMLv2(content.how_you_are_billed.text_1)}
                    <View style={styles.table}>
                        {/* Encabezado */}
                        <View style={[styles.tableRow, styles.headerRow]}>
                            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Resource</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Standard Rate</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Your Rate</Text></View>
                        </View>

                        {/* Filas */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Engineer</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>$275/hr</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>${proposal.resource_estimates.engineering_rate}/hr</Text></View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Architect</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>$375/hr</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>${proposal.resource_estimates.architecture_rate}/hr</Text></View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Senior Architect</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>$475/hr</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>${proposal.resource_estimates.sr_architecture_rate}/hr</Text></View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>After Hours</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>1.5x Resource Rate (4 Hour Minimum)</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>1.5x Resource Rate (4 Hour Minimum)</Text></View>
                        </View>
                    </View>
                    {extractParagraphsFromHTML(content.how_you_are_billed.alert).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.alert_msg_1}>
                            {para}
                        </Text>
                    ))}
                    {extractFormattedContentFromHTMLv2(content.how_you_are_billed.text_2)}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How We Keep Going</Text>
                    {extractFormattedContentFromHTMLv2(content.how_we_keep_going.text_1)}
                    {extractParagraphsFromHTML(content.how_we_keep_going.alert).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.alert_msg_2}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Availability and SLA</Text>
                    {extractFormattedContentFromHTMLv2(content.availability_and_sla.text_1)}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Estimates</Text>
                    {extractFormattedContentFromHTMLv2(content.estimates.text_1)}
                </View>
            </Page>
        </Document>
    );
}