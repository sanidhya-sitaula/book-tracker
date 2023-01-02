import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import app from "../firebase";
import { Session } from "../models/Session";
import { useIsFocused } from "@react-navigation/native";

const db = app.firestore();

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getSessions = async () => {
      const sessions = await db.collection("sessions").get();
      let finalArray: Session[] = [];
      sessions.docs.map((session) => {
        let thisSession = session.data() as Session;
        let id = session.id;
        thisSession.id = id;
        thisSession.total_mins_read = Number(thisSession.total_mins_read) as number;
        thisSession.num_pages_read = Number(thisSession.num_pages_read) as number;
        finalArray.push(thisSession);
      });

      finalArray.sort((a, b) => (a.end_timestamp < b.end_timestamp ? -1 : a.end_timestamp > b.end_timestamp ? 1 : 0));

      setSessions(finalArray);
    };
    isFocused && getSessions();
  }, [isFocused]);

  return sessions;
};

export const useSessionsByBookId = (id: string) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const getSessions = async () => {
      const sessions = await db.collection("sessions").get();
      let finalArray: Session[] = [];
      sessions.docs.map((session) => {
        let thisSession = session.data() as Session;
        if (thisSession.book_id === id) {
          let id = session.id;
          thisSession.id = id;
          thisSession.total_mins_read = Number(thisSession.total_mins_read) as number;
          thisSession.num_pages_read = Number(thisSession.num_pages_read) as number;
          finalArray.push(thisSession);
        }
      });

      finalArray.sort((a, b) => (a.end_timestamp < b.end_timestamp ? -1 : a.end_timestamp > b.end_timestamp ? 1 : 0));

      setSessions(finalArray);
    };

    getSessions();
  }, []);

  return sessions;
};
