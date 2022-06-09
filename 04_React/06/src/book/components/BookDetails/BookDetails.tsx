import { useState } from "react";
import {
  Button,
  Stack,
  Card,
  CardContent,
  TextField,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { BookProperties } from "../../book";
import { useEffect } from "react";
import { useBookService } from "../../services/BookService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const initBook = { id: NaN, title: "", authors: "" };

interface ErrorMessages {
  required: string;
  maxLength: string;
  minLength: string;
}
const errorMessages: ErrorMessages = {
  required: "is required you dummy",
  maxLength: "is too long",
  minLength: "is too short",
};

export const BookDetails: React.FC = () => {
  const { find, update, create } = useBookService();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initBook,
  });

  const { ref: authorsRef, ...authorsProps } = register("authors", {
    required: true,
    minLength: 10,
    maxLength: 30,
  });
  const { ref: titleRef, ...titleProps } = register("title", {
    required: true,
    minLength: 10,
    maxLength: 30,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      find(+id).then((response) => {
        reset(response);
        setLoading(false);
      });
    } else {
      reset(initBook);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const navigateToBookList = () => navigate("/book-app/books");

  const notifyOnBookChange = (book: BookProperties) => {
    if (id) {
      update({ ...book, id: +id }).then(navigateToBookList);
    } else {
      if (book) create(book).then(navigateToBookList);
    }
  };

  if (loading) <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(notifyOnBookChange)}>
          <Stack spacing={4}>
            <TextField
              id="authors"
              label="Authors"
              inputRef={authorsRef}
              {...authorsProps}
              error={!!errors.authors}
              helperText={
                errors?.authors &&
                errorMessages[errors.authors.type as keyof ErrorMessages]
              }
            />
            <TextField
              id="title"
              label="Title"
              inputRef={titleRef}
              {...titleProps}
              error={!!errors.title}
              helperText={
                errors?.title &&
                errorMessages[errors.title.type as keyof ErrorMessages]
              }
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
