export interface Book {
  id: number;
  title: string;
  authors: string;
}

// gets only needed elements in new type from other one
export type BookProperties = Pick<Book, "title" | "authors">;
