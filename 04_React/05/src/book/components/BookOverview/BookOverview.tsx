import React, { useEffect, useState } from "react";
import { Book } from "../../book";
import { BookDetails } from "../BookDetails/BookDetails";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useBookService } from "../../services/BookService";

export interface Props {}

export const BookOverview = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { findAll } = useBookService();

  useEffect(() => {
    findAll().then((response) => setBooks(response));
    // eslint-disable-next-line
  }, []);

  const selectBook = (book: Book): void => {
    setSelectedBook(book);
  };

  const isBookSelected = (book: Book): boolean => book === selectedBook;

  const updateBook = (bookToUpdate: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookToUpdate.id ? bookToUpdate : book,
      ),
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow
                  hover
                  key={book.id}
                  onClick={() => selectBook(book)}
                  selected={isBookSelected(book)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={4}>
        {selectedBook && (
          <BookDetails book={selectedBook} onBookChange={updateBook} />
        )}
      </Grid>
    </Grid>
  );
};
