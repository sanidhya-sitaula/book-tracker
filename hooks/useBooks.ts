import { useEffect, useState } from "react"
import { Book } from "../models/Book";
import app from "../firebase";

const db = app.firestore();

export const useBooks = () => {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const getBooks = async () => {
            const books = await db.collection("books").get();
            let finalArray : Book[] = [];
            books.docs.map((book) => {
                let thisBook = book.data() as Book;
                let id = book.id; 
                thisBook.id = id;
                finalArray.push(thisBook);
            })
            setBooks(finalArray);
        }

        getBooks();

    }, []);

    return books;
}