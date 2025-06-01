
import { Document, Page, Text, Image, View } from '@react-pdf/renderer'

const styles = {
    page: {

    },
    headerContainer:{

    },
    headerText: {

    },
    logo: {

    }
}

interface Props {
    proposal: ProposalI;
}

export default function PDF(props: Props) {
    const { proposal } = props;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>HI</Text>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>REFERENCIA DE PAGO</Text>
                    <Image
                        src="https://i.imgur.com/Mvwysfh.png"
                        style={styles.logo}
                    />
                </View>
            </Page>
        </Document>
    );
}