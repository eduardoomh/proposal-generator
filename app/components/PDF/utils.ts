export const formatDate = (dateString: string, monthsToAdd = 0) => {
    const date = new Date(dateString)
    if (monthsToAdd) {
        date.setMonth(date.getMonth() + monthsToAdd)
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
