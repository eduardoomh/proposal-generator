
import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import { pdfContent } from '../../mocks/PdfContent';

const styles = {
    page: {

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
                        src="https://i.imgur.com/Mvwysfh.png"
                        style={styles.logo}
                    />
                </View>
                <View>
                    <Text>{content.general.text_1}</Text>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Summary</Text>
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

                <View>
                    <View>
                        <Text>Project Description</Text>
                        <Text>{proposal.project_details.description}</Text>
                    </View>
                    <View>
                        <Text>Deliverables</Text>
                        <Text>{proposal.project_details.deliverables}</Text>
                    </View>
                </View>

                <View>
                    <Text>Who Will Work On This Project</Text>
                    <View>
                        <Text>{content.who_will_work.text_1}</Text>
                    </View>
                    <View>
                        <Text>Senior Architech {proposal.resource_estimates.sr_architecture_percentage}</Text>
                        <Text>Architech {proposal.resource_estimates.architecture_percentage}</Text>
                        <Text>Engineer {proposal.resource_estimates.engineering_percentage}</Text>
                    </View>
                </View>

                <View>
                    <Text>How We Get Started</Text>
                    <Text>{content.how_we_get_started.text_1}</Text>
                </View>

                <View>
                    <Text>How You Are Billed</Text>
                    <Text>{content.how_you_are_billed.text_1}</Text>
                    <Text>{content.how_you_are_billed.alert}</Text>
                    <Text>{content.how_you_are_billed.text_2}</Text>
                </View>

                <View>
                    <Text>How We Keep Going</Text>
                    <Text>{content.how_we_keep_going.text_1}</Text>
                    <Text>{content.how_we_keep_going.alert}</Text>
                </View>

                <View>
                    <Text>Availability and SLA</Text>
                    <Text>{content.availability_and_sla.text_1}</Text>
                </View>

                <View>
                    <Text>Estimates</Text>
                    <Text>{content.estimates.text_1}</Text>
                </View>
            </Page>
        </Document>
    );
}