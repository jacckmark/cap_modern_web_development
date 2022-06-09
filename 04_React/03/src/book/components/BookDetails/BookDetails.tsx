import { useState, ChangeEvent } from "react";
import { Button, Stack, Card, CardContent, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Book } from "../../book";
import { SyntheticEvent } from "react";
import { useEffect } from "react";

export interface Props {
  book: Book;
  onBookChange: (bookToUpdate: Book) => void;
}

export const BookDetails = (props: Props) => {
  const [book, setBook] = useState<Book>({ ...props.book });

  useEffect(() => {
    setBook(props.book);
  }, [props.book]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    props.onBookChange(book);
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
