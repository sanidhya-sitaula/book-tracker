export interface Session {
    id?: string;
    book_id: string;
    start_timestamp: any;
    end_timestamp: any;
    num_pages_read: number;
    total_mins_read: number;
}