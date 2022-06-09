import { Book } from "../book";
import { setupServer } from "msw/node";
import { getURI, useBook } from "./BookService";
import { rest } from "msw";

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

const bookToSave = {
  id: 2,
  authors: "Frank Herbert II",
  title: "Dune vol. 11",
};

const newBookToSave = {
  id: 2,
  authors: "Frank Herbert II",
  title: "Dune vol. 11",
};

const server = setupServer(
  rest.get(getURI("books"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponseBooks));
  }),
  rest.get(getURI(`books/${mockedResponseBooks[1].id}`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponseBooks[1]));
  }),
  rest.put(getURI(`books/${bookToSave.id}`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bookToSave));
  }),
  rest.post(getURI(`books/`), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...newBookToSave, id: 3 }));
  }),
);

describe("BookService", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("finds all books", async () => {
    const { findAll } = useBook();
    const result = await findAll();
    expect(result).toEqual(mockedResponseBooks);
  });
});
