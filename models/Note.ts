export interface Note {
    id?: string;
    note_text: string;
    added_timestamp: Date;
    book_id: string;
    session_id?: string;
    page_number: number;
    book_name: string
}