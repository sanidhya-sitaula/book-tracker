import { useEffect, useState } from "react";
import { Note } from "../models/Note";
import app from "../firebase";
import { useIsFocused } from "@react-navigation/native";

const db = app.firestore();

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getNotes = async () => {
      const notes = await db.collection("notes").get();
      let finalArray: Note[] = [];
      notes.docs.map((note) => {
        let thisNote = note.data() as Note;
        let id = note.id;
        thisNote.id = id;
        let addedDate = note.data().added_timestamp.toDate();
        thisNote.added_timestamp = addedDate;
        finalArray.push(thisNote);
      });
      setNotes(finalArray);
    };

    isFocused && getNotes();
  }, [isFocused]);

  return notes;
};

export const useNotesByBook = (book_id: string) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const isFocused = useIsFocused();
  
    useEffect(() => {
      const getNotes = async () => {
        const notes = await db.collection("notes").get();
        let finalArray: Note[] = [];
        notes.docs.map((note) => {
          let thisNote = note.data() as Note;
          let id = note.id;
          thisNote.id = id;
          let addedDate = note.data().added_timestamp.toDate();
          thisNote.added_timestamp = addedDate;
          if (thisNote.book_id === book_id){
            finalArray.push(thisNote);
          }
        });
        setNotes(finalArray);
      };
  
      isFocused && getNotes();
    }, [isFocused]);
  
    return notes;
}
