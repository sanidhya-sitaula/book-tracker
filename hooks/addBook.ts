import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import app from "../firebase";
import { Session } from "../models/Session";
import { ReadingSession } from "../models/ReadingSession";
import { Note } from "../models/Note";
import { doc, getDoc } from "firebase/firestore";

const db = app.firestore();

export const addBook = async (book: Book) => {
  const addedBook = await db.collection("books").add(book);
  const docRef = doc(db, "books", addedBook.id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Book;
};
