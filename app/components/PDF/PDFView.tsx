import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { registerMontserratFonts } from "~/utils/Fonts"
import { styles } from "./styles"
import { extractFormattedContentFromHTMLv2 } from "~/utils/PdfUtils";
import { formatDate } from "./utils";
import PercentageBar from "./PercentageBar";
import TableRow from "./TableRow";
import { extractParagraphsFromHTML } from "~/utils/PdfContent";
import { texts } from "./Language";
import RowItemV2 from "./RowItemV2";

interface Props {
    proposal: ProposalI
    content: PDFContentI
}


export default function PDFView({ proposal, content }: Props) {
    registerMontserratFonts()
    const lang = content.language === 'es' ? 'es' : 'en';
    const t = texts[lang];

    const percentageWork = [
        { label: 'Senior Architect', percentage: proposal.resource_estimates.sr_architecture_percentage },
        { label: 'Architect', percentage: proposal.resource_estimates.architecture_percentage },
        { label: 'Engineer', percentage: proposal.resource_estimates.engineering_percentage },
    ]

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image src="/IP-insight-support-banner_oficial.png" />
                </View>

                {/* Intro text */}
                <View style={styles.viewContainer}>
                    {extractFormattedContentFromHTMLv2(content.general.text_1, {
                        company_name: proposal.company_information.company_name,
                    }).map((para, idx) => (
                        <Text key={idx} style={styles.alert_msg_3}>
                            {para}
                        </Text>
                    ))}
                </View>

                {/* Summary */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title_2}>{t.summary}</Text>
                    <View style={styles.container_2}>
                        <View style={styles.column}>
                            <RowItemV2 label={t.presentedTo} value={proposal.company_information.presented_to_name} />
                            <RowItemV2 label={t.presentedOn} value={formatDate(proposal.created_at)} />
                            <RowItemV2 label={t.preparedBy} value={proposal.prepared_by} />
                            <RowItemV2 label={t.validThrough} value={formatDate(proposal.created_at, 1)} />
                        </View>
                        <View style={styles.column}>
                            <RowItemV2 label={t.initialInvoice} value={`$${proposal.invoicing_details.initial_invoice_amount}`} />
                            <RowItemV2 label={t.minimumRetainer} value={`$${proposal.invoicing_details.minimum_retainer_amount}`} />
                            <RowItemV2 label={t.projectEstimate} value={`$${proposal.estimates.estimated_cost}`} />
                            <RowItemV2 label={t.estimatedHours} value={`${proposal.estimates.estimated_hours} Hours`} />
                        </View>
                    </View>
                </View>

                {/* Project Description & Deliverables */}
                <View style={styles.viewContainer}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>{t.projectDescription}</Text>
                            {extractFormattedContentFromHTMLv2(proposal.project_details.description)}
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>{t.deliverables}</Text>
                            {extractFormattedContentFromHTMLv2(proposal.project_details.deliverables)}
                        </View>
                    </View>
                </View>

                {/* Who Will Work On This Project */}
                <View style={styles.viewContainer}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.section_title}>{t.whoWillWork}</Text>
                            {extractFormattedContentFromHTMLv2(content.who_will_work.text_1)}
                        </View>
                        <View style={styles.column}>
                            {percentageWork.map(({ label, percentage }, idx) => (
                                <PercentageBar key={idx} label={label} percentage={percentage} />
                            ))}
                        </View>
                    </View>
                </View>

                {/* How We Get Started */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>{t.howWeGetStarted}</Text>
                    {extractFormattedContentFromHTMLv2(content.how_we_get_started.text_1)}
                </View>

                {/* How You Are Billed */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>{t.howYouAreBilled}</Text>
                    {extractFormattedContentFromHTMLv2(content.how_you_are_billed.text_1)}
                    <View style={styles.table}>
                        <TableRow isHeader cells={[t.resource, t.standardRate, t.yourRate]} />
                        <TableRow
                            cells={['Engineer', '$275/hr', `$${proposal.resource_estimates.engineering_rate}/hr`]}
                        />
                        <TableRow
                            cells={['Architect', '$375/hr', `$${proposal.resource_estimates.architecture_rate}/hr`]}
                        />
                        <TableRow
                            cells={['Senior Architect', '$475/hr', `$${proposal.resource_estimates.sr_architecture_rate}/hr`]}
                        />
                        <TableRow
                            cells={[
                                t.afterHours,
                                t.resourceRate,
                                t.resourceRate,
                            ]}
                        />
                    </View>
                    {extractParagraphsFromHTML(content.how_you_are_billed.alert).map((para, idx) => (
                        <Text key={idx} style={styles.alert_msg_1}>
                            {para}
                        </Text>
                    ))}
                    {extractFormattedContentFromHTMLv2(content.how_you_are_billed.text_2)}
                </View>

                {/* How We Keep Going */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>{t.howWeKeepGoing}</Text>
                    {extractFormattedContentFromHTMLv2(content.how_we_keep_going.text_1)}
                    {extractParagraphsFromHTML(content.how_we_keep_going.alert).map((para, idx) => (
                        <Text key={idx} style={styles.alert_msg_2}>
                            {para}
                        </Text>
                    ))}
                </View>

                {/* Availability and SLA */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>{t.availabilityAndSLA}</Text>
                    {extractFormattedContentFromHTMLv2(content.availability_and_sla.text_1)}
                </View>

                {/* Estimates */}
                <View style={styles.viewContainer}>
                    <Text style={styles.section_title}>{t.estimates}</Text>
                    {extractFormattedContentFromHTMLv2(content.estimates.text_1)}
                </View>
            </Page>
        </Document>
    )
}