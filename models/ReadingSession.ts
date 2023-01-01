import { Book } from "./Book"

export interface ReadingSession{
    book: Book,
    minutes: number,
    startTime: Date,
    endTime: Date,
    pages?: number
}