import { Book } from "../models/Book";

export const sortBooks = (books: Book[]): Book[] => {
    const sortedBooks = books.sort((a, b) => a.last_read < b.last_read ? -1 : a.last_read > b.last_read ? 1 : 0)
    return sortedBooks;
}

export const getMostRecentBook = (books: Book[]): Book => {
    return sortBooks(books)[0];
}