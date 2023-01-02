import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import app from "../firebase";
import { Session } from "../models/Session";
import { ReadingSession } from "../models/ReadingSession";
import { Note } from "../models/Note";

const db = app.firestore();

export const addNote = async (note: Note) => {
  const addedNoteId = await db.collection("notes").add(note);
  return addedNoteId;
};
