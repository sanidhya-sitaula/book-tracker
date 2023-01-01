import { Session } from "../models/Session";

export const getTotalMinsRead = (sessions: Session[]) => {
    var mins = 0;
    sessions.forEach(session => {
        mins += session.total_mins_read;
    })
    return mins;
}


export const getTotalDaysRead = (sessions: Session[]) => {
    return sessions.length;
}

export const getAveragePagesPerDay = (sessions: Session[], current_page: number) => {
    return current_page / sessions.length;
}

