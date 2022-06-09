import { BookDetails } from "./BookDetails";
import { render, screen, waitFor } from "@testing-library/react";
import { BookContext } from "../../services/BookService";
import { Book } from "../../book";
import { MemoryRouter, Route, Routes } from "react-router-dom";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBooksMock()}>
    <MemoryRouter>
      <Routes>
        <Route path="/book-app/books" element={children} />
        <Route path="/book-app/books/1" element={children} />
      </Routes>
      {children}
    </MemoryRouter>
  </BookContext.Provider>
);

describe("BookDetails", () => {
  it("renders authors with a label", async () => {
    // given
    expect.hasAssertions();
    const currentBook = mockedResponseBooks[1];
    render(<BookDetails />, {
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
    render(<BookDetails />, {
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
