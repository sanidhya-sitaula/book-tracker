import { Session } from "../models/Session";

const line = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        data: [30, 35, 20, 0, 60, 20],
        strokeWidth: 2, // optional
      },
    ],
  };

type ChartData = {
    labels: string[],
    datasets: [{
      data: number[],
      strokeWidth: number
    }]
}

export const getAllChartData = (sessions: Session[]): ChartData => {

    const result : ChartData = {
      labels: [],                                                                                                                                                                                                                                                                                          
      datasets: [{
        data: [],
        strokeWidth: 2
      }]
    };

    sessions.forEach(session => {
      if (wasSessionWithinWeek(session)){
        result.labels.push(session.end_timestamp.toDate().toDateString());
        result.datasets[0].data.push(session.total_mins_read);
      }
    })

    return result;
}

export const getChartDataByBook = (sessions: Session[]): ChartData => {
  
  console.log(sessions);

  const result : ChartData = {
    labels: [],
    datasets: [{
      data: [],
      strokeWidth: 2
    }]
  }

  sessions.forEach(session => {
      var sessionDate = session.end_timestamp.toDate();
      result.labels.push(sessionDate.toDateString().slice(3,));
      result.datasets[0].data.push(session.total_mins_read);
  });

  return result;
}

export const getWeeklyChartData = (sessions: Session[]): ChartData => {
  var labels = ["", "", "", "", "", "", ""];
  var data = [0, 0, 0, 0, 0, 0, 0];
  var today = new Date();

  const result : ChartData = {
    labels: [],
    datasets: [{
      data: [],
      strokeWidth: 2
    }]
  }

  sessions.forEach(session => {
    var sessionDate = session.end_timestamp.toDate();
    if (getDifferenceInDays(today, sessionDate) === 7){
      labels[0] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[0] = session.total_mins_read;
    }   
    if (getDifferenceInDays(today, sessionDate) === 6){
      labels[1] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[1] = session.total_mins_read;
    }   
    if (getDifferenceInDays(today, sessionDate) === 5){
      labels[2] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[2] = session.total_mins_read;
    }   
    if (getDifferenceInDays(today, sessionDate) === 4){
      labels[3] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[3] = session.total_mins_read
    }   
    if (getDifferenceInDays(today, sessionDate) === 3){
      labels[4] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[4] = session.total_mins_read;
    }   
    if (getDifferenceInDays(today, sessionDate) === 2){
      labels[5] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[5] = session.total_mins_read;
    }   
    if (getDifferenceInDays(today, sessionDate) === 1){
      labels[6] = sessionDate.toDateString().slice(0,3).toLowerCase();
      data[6] = session.total_mins_read;
    } 
  });

  result.labels = labels;
  result.datasets[0].data = data;
  return result;
}

const wasSessionWithinWeek = (session: Session): boolean => {
    const today = new Date();
    const sessionDate: Date = session.end_timestamp.toDate();
    var diff = Math.abs(today.getTime() - sessionDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= 7;
}

const getDifferenceInDays = (date1: Date, date2: Date) => {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
}