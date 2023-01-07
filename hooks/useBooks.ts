import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import app from "../firebase";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const db = app.firestore();

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getBooks = async () => {
      const books = await db.collection("books").get();
      let finalArray: Book[] = [];
      books.docs.map((book) => {
        let thisBook = book.data() as Book;
        let id = book.id;
        thisBook.id = id;
        finalArray.push(thisBook);
      });
      setBooks(finalArray);
    };

    isFocused && getBooks();
  }, [isFocused]);

  return books;
};

export const useBooksById = (id: string) => {

  const [book, setBook] = useState<Book>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getBook = async () => {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);
      const thisBook = docSnap.data() as Book;
      thisBook.id = docSnap.id;
      setBook(thisBook);
    }

    isFocused && getBook();

  }, [isFocused])

  return book;
}
