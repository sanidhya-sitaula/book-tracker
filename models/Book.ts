export interface Book {
    id: string;
    name: string;
    author: string;
    genre: string;
    image: string;
    last_read: Date;
    date_added: Date;
    pages: number;
    current_page: number;
}
