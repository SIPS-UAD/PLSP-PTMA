export const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
    }

    return '';
};
