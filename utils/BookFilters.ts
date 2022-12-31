import { Book } from "../models/Book";

export const getMostRecentBook = (books: Book[]): Book => {
    const sortedBooks = books.sort((a, b) => a.last_read < b.last_read ? -1 : a.last_read > b.last_read ? 1 : 0)
    console.log(sortedBooks);
    return sortedBooks[0];
}