import { View, Text } from '@react-pdf/renderer'
import { styles } from "./styles"

const TableRow = ({
    cells,
    isHeader = false,
}: {
    cells: string[]
    isHeader?: boolean
}) => (
    <View style={[styles.tableRow, isHeader ? styles.headerRow : {}]}>
        {cells.map((cell, idx) => (
            <View key={idx} style={styles.tableCol}>
                <Text style={isHeader ? styles.tableCellHeader : styles.tableCell}>{cell}</Text>
            </View>
        ))}
    </View>
)


export default TableRow