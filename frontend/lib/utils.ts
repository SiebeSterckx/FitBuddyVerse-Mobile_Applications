import { format, isToday, isYesterday } from "date-fns";

const formatDate = (createdAt: String) => {
    if (isToday(new Date(String(createdAt)))) {
        return "Today at " + format(new Date(String(createdAt)), "HH:mm");
    } else if (isYesterday(new Date(String(createdAt)))) {
        return "Yesterday at " + format(new Date(String(createdAt)), "HH:mm");
    } else {
        return format(new Date(String(createdAt)), "dd MMMM yyyy 'at' HH:mm");
    }
};

export default {
    formatDate
};