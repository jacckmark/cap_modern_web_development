import { BookDetails } from "./BookDetails";
import { render, screen, waitFor } from "@testing-library/react";
import { BookContext } from "../../services/BookService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";

const mockedResponseBooks: Book[] = [
  {
    id: 1,
    authors: "Julius Verne",
    title: "80 days around the world",
  },
  {
    id: 2,
    authors: "Frank Herbert",
    title: "Dune",
  },
];

const useBooksMock = () => {
  return {
    findAll: async () => {
      return await mockedResponseBooks;
    },
    find: async () => {
      return await mockedResponseBooks[1];
    },
    update: async () => {
      return await mockedResponseBooks[1];
    },
    create: async () => {
      return await mockedResponseBooks[1];
    },
  };
};

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooksMock()}>{children}</BookContext.Provider>
);

describe("BookDetails", () => {
  it("renders authors with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    const callbackMock = jest.fn();
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />, {
      wrapper: WrapperComponent,
    });
    // when
    const authorsInput = (await screen.findByLabelText(
      /Authors/i,
    )) as HTMLInputElement;
    // then
    await waitFor(() => expect(authorsInput.value).toBe(currentBook.authors));
  });

  it("renders a title with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    const callbackMock = jest.fn();
    render(<BookDetails book={currentBook} onBookChange={callbackMock} />, {
      wrapper: WrapperComponent,
    });
    // when
    const titleInput = (await screen.findByLabelText(
      /Title/i,
    )) as HTMLInputElement;
    // then
    await waitFor(() => expect(titleInput.value).toBe(currentBook.title));
  });
});
