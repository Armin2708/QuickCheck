export default function getFormattedDate() {
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