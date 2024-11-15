export default function getClassDate() {
    const date = new Date();

    // Get day of the week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];

    // Get month and day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Format as "Day mm/dd"
    return `${dayName} ${month}/${day}`;
}

export function getDashboardDay() {
    const date = new Date();

    // Get day of the week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];

    // Get month name
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[date.getMonth()];

    // Get day of the month with suffix
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
        day % 10 === 2 && day !== 12 ? 'nd' :
            day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    // Format as "Day Month DaySuffix" (e.g., "Tuesday November 14th")
    return `${dayName} ${day}${suffix},`;
}
export function getDashboardMonthYear() {
    const date = new Date();

    // Get month name
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[date.getMonth()];

    // Format as "Day Month DaySuffix" (e.g., "Tuesday November 14th")
    return `${monthName} ${date.getFullYear()}`;
}
