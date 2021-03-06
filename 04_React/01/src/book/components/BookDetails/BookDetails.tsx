import React, { Component } from "react";
import { Book } from "../../book";
import { Card, CardContent, Typography, FormLabel } from "@mui/material";

interface State {
  currentBook: Book;
  currentlySelectedBook: any;
}

export interface Props {}

export class BookDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentBook: {
        id: 1,
        title: "Example Book",
        authors: "John Example",
      },
      currentlySelectedBook: null,
    };
  }

  componentDidMount() {
    this.setState((prev) => ({
      currentlySelectedBook: prev.currentBook.id,
    }));
  }

  render(): React.ReactNode {
    return (
      <Card>
        <CardContent>
          <FormLabel>Authors:</FormLabel>
          <Typography>{this.state.currentBook.authors}</Typography>
        </CardContent>
        <CardContent>
          <FormLabel>Title:</FormLabel>
          <Typography>{this.state.currentBook.title}</Typography>
        </CardContent>
      </Card>
    );
  }
}
