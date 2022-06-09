import { useState, ChangeEvent } from "react";
import { Button, Stack, Card, CardContent, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Book } from "../../book";
import { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useBookService } from "../../services/BookService";

export interface Props {
  book: Book;
  onBookChange: (bookToUpdate: Book) => void;
}

export const BookDetails: React.FC<Props> = ({
  book: currentBook,
  onBookChange,
}) => {
  const [book, setBook] = useState<Book>({
    title: "",
    authors: "",
  } as Book);
  const { find, update } = useBookService();

  useEffect(() => {
    find(currentBook.id).then((response) => setBook(response));
    // eslint-disable-next-line
  }, [currentBook]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    update(book).then((response) => onBookChange(response));
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
