export function getTimeFromDatetime(date: string): string {
    const d = new Date(date)
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const utcDate = new Date(year, month, day, hours, minutes, seconds);
    return `${String(utcDate.getHours()).padStart(2, '0')}:${String(utcDate.getMinutes()).padStart(2, '0')}:${String(utcDate.getSeconds()).padStart(2, '0')}`;
}

// return date from datetime
export function getDateFromDatetime(date: string): string {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

// return object with date and time
export function dateFormatting(date: string) {
    return {
        date: getDateFromDatetime(date),
        time: getTimeFromDatetime(date)
    }
}