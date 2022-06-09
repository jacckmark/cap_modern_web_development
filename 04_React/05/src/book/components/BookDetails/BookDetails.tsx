import { useState, ChangeEvent } from "react";
import { Button, Stack, Card, CardContent, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Book } from "../../book";
import { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useBookService } from "../../services/BookService";
import { useNavigate, useParams } from "react-router-dom";

const initBook = { id: NaN, title: "", authors: "" };

export const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book>(initBook as Book);
  const { find, update } = useBookService();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      find(+id).then((response) => setBook(response));
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const navigateToBookList = () => navigate("/book-app/books");

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    update(book).then(navigateToBookList);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={notifyOnBookChange}>
          <Stack spacing={4}>
            <TextField
              id="authors"
              name="authors"
              label="Authors"
              value={book.authors}
              onChange={handleChange}
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              value={book.title}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="warning"
              type="submit"
              endIcon={<SendIcon />}
            >
              Apply
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
