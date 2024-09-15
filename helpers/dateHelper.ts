export function getMonthAndYearByDateAndLocale(date: Date, locale: string): string {
    let month = date.toLocaleDateString(locale, {
        month: 'long'
    });
    let year = date.toLocaleDateString(locale, {
        year: 'numeric'
    });
    return `${month} ${year}`;
}

export function getFutureDateFromTomorrow(daysToAdd: number): Date {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setDate(today.getDate() + daysToAdd);
    return today;
}