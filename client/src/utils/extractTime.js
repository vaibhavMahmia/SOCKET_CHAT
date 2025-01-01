const padZero = (number) => {
    return number.toString().padStart(2, "0");
}

const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

export const extractTime = (dateString) => {
    const date = new Date(dateString);
    
    // Get hours and determine AM/PM
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? padZero(hours) : '12'; // the hour '0' should be '12'

    // Format date to dd-mm-yyyy
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    // Get day of the week
    const dayOfWeek = getDayOfWeek(date);

    return `${hours}:${minutes} ${ampm} ${day}-${month}-${year} ${dayOfWeek}`;
}
