import { useNavigate } from "react-router-dom";
import { Book } from "../../book";
import { useBookService } from "../../services/BooksService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import { useLoaderService } from "../../../shared/services/LoaderService";
import { useQuery } from "react-query";

export interface Props {}

export const BookOverview = () => {
  const { findAll } = useBookService();
  const { error, data } = useQuery<Book[], Error>("books", findAll);

  console.log(data);
  const navigate = useNavigate();
  const { isLoading, loaderWidget } = useLoaderService();

  if (isLoading) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  return data
    ? loaderWidget || (
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
              {data?.map((book, index) => (
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
      )
    : null;
};
