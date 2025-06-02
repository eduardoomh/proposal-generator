
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer'
import { extractParagraphsFromHTML } from '~/utils/PdfContent';

const styles = {
    page: {
        padding: '16px 24px'
    },
    viewContainer: {
        margin: '12px 0'
    },
    short_text: {
        fontSize: '12px',
        color: 'gray',
    },
    general_text: {
        fontSize: '12px',
        color: 'black',
        marginBottom: '4px'
    },
    section_title: {
        color: '#00abff',
        fontSize: '16px',
        marginBottom: '4px'
    },
    headerContainer: {

    },
    headerText: {

    },
    logo: {

    }
}

interface Props {
    proposal: ProposalI;
    content: PDFContentI;
}

export default function PDFView(props: Props) {
    const { proposal, content } = props;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image
                        src="/IP-insight-Support-Banner.png"
                        style={styles.logo}
                    />
                </View>
                <View style={styles.viewContainer}>
                    {extractParagraphsFromHTML(content.general.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.short_text}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Summary</Text>
                    <View>
                        <Text style={styles.headerText}>Presented To: </Text>
                        <Text style={styles.headerText}>Presented On: </Text>
                        <Text style={styles.headerText}>Prepared By: </Text>
                        <Text style={styles.headerText}>Valid Through: </Text>
                    </View>
                    <View>
                        <Text style={styles.headerText}>{proposal.company_information.presented_to_name}</Text>
                        <Text style={styles.headerText}>{proposal.created_at}</Text>
                        <Text style={styles.headerText}>{proposal.prepared_by}</Text>
                        <Text style={styles.headerText}>12/12/2025</Text>
                    </View>
                </View>

                <View style={styles.viewContainer}>
                    <View>
                        <Text style={styles.section_title}>Project Description</Text>
                        {extractParagraphsFromHTML(proposal.project_details.description).map((para: any, idx: any) => (
                            <Text key={idx} style={styles.general_text}>
                                {para}
                            </Text>
                        ))}
                    </View>
                    <View>
                        <Text style={styles.section_title}>Deliverables</Text>
                        {extractParagraphsFromHTML(proposal.project_details.deliverables).map((para: any, idx: any) => (
                            <Text key={idx} style={styles.general_text}>
                                {para}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Who Will Work On This Project</Text>
                    <View>
                        {extractParagraphsFromHTML(content.who_will_work.text_1).map((para: any, idx: any) => (
                            <Text key={idx} style={styles.general_text}>
                                {para}
                            </Text>
                        ))}
                    </View>
                    <View>
                        <Text>Senior Architech {proposal.resource_estimates.sr_architecture_percentage}</Text>
                        <Text>Architech {proposal.resource_estimates.architecture_percentage}</Text>
                        <Text>Engineer {proposal.resource_estimates.engineering_percentage}</Text>
                    </View>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How We Get Started</Text>
                    {extractParagraphsFromHTML(content.how_we_get_started.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How You Are Billed</Text>
                    {extractParagraphsFromHTML(content.how_you_are_billed.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                    {extractParagraphsFromHTML(content.how_you_are_billed.alert).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                    {extractParagraphsFromHTML(content.how_you_are_billed.text_2).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>How We Keep Going</Text>
                    {extractParagraphsFromHTML(content.how_we_keep_going.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                    {extractParagraphsFromHTML(content.how_we_keep_going.alert).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Availability and SLA</Text>
                    {extractParagraphsFromHTML(content.availability_and_sla.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>Estimates</Text>
                    {extractParagraphsFromHTML(content.estimates.text_1).map((para: any, idx: any) => (
                        <Text key={idx} style={styles.general_text}>
                            {para}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}