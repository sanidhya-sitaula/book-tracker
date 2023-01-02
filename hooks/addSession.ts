import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import app from "../firebase";
import { Session } from "../models/Session";
import { ReadingSession } from "../models/ReadingSession";

const db = app.firestore();

export const addSession = async (readingSession: ReadingSession) => {

    const session: Session = {
        start_timestamp: readingSession.startTime,
        end_timestamp: readingSession.endTime,
        num_pages_read: readingSession.pages!,
        total_mins_read: readingSession.minutes,
        book_id: readingSession.book.id
    }

  const addedSessionId = await db.collection("sessions").add(session);

  const bookRef = await db.collection("books").doc(session.book_id);
  const editedBookId = await bookRef.update({current_page: readingSession.book.current_page + session.num_pages_read, last_read: session.end_timestamp })

  return addedSessionId;
};
