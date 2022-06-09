import React, { useEffect, useState } from "react";
import { Book } from "../../book";
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
import { useNavigate } from "react-router-dom";

export interface Props {}

export const BookOverview = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { findAll } = useBookService();

  const navigate = useNavigate();

  useEffect(() => {
    findAll().then((response) => setBooks(response));
    // eslint-disable-next-line
  }, []);

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
                  onClick={() => navigate(`/book-app/book/${book.id}`)}
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
    </Grid>
  );
};
