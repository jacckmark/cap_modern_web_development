import { createRoot } from "react-dom/client";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBook } from "../../services/BookService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

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

interface HttpRequestConfig {
  method: "GET" | "PUT" | "DELETE" | "POST";
  headers: {
    "Content-Type": string;
  };
  body: any;
}

const useBooksMock = () => {
  return {
    findAll: async () => {
      return await mockedResponseBooks;
    },
    find: async () => {
      return await mockedResponseBooks[1];
    },
    update: async (book: Book) => {
      return await book;
    },
    create: async () => {
      return await mockedResponseBooks[1];
    },
  };
};

const mockFetch = async function mockFetch(
  url: string,
  payload: HttpRequestConfig,
) {
  switch (url) {
    case getURI("books"): {
      return {
        ok: true,
        json: async () => mockedResponseBooks,
      };
    }
    case getURI("books/1"): {
      if (payload && payload.method === "PUT") {
        return {
          ok: true,
          json: async () => JSON.parse(payload.body),
        };
      }
      return {
        ok: true,
        json: async () => mockedResponseBooks[0],
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
};

const WrapperComponent = ({ children }: any) => (
  <BookContext.Provider value={useBook()}>{children}</BookContext.Provider>
);

describe("Book Overview Component", () => {
  beforeAll(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(
    async () => await (window.fetch as any).mockImplementation(mockFetch),
  );

  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    const root = createRoot(div!);
    // when
    act(() => {
      root.render(<BookOverview />);
      // then no errors thrown
      root.unmount();
    });
  });

  it("renders the master table having three columns", () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const noColumn = screen.getByText(/#/i);
    const authorsColumn = screen.getByText(/Authors/i);
    const titleColumn = screen.getByText(/Title/i);
    // then
    expect(noColumn).toBeInTheDocument();
    expect(authorsColumn).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
  });
  it("renders the master table rows", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const johnExamleRow = await screen.findByText(/Julius Verne/i);
    const joeSmithRow = await screen.findByText(/Frank Herbert/i);
    // then
    expect(johnExamleRow).toBeInTheDocument();
    expect(joeSmithRow).toBeInTheDocument();
  });
  it("renders details upon click on the row", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const row = await screen.findByText(/Julius Verne/i);
    const htmlRow = row.closest("tr");
    htmlRow && fireEvent.click(htmlRow);
    // then
    const authorsInput = await screen.findByLabelText(/Authors/i);
    expect(authorsInput).toBeInTheDocument();
  });

  it("updates a book row upon changes done in the details", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when

    const row = (await screen.findByText(/Julius Verne/i)).closest("tr");
    row && userEvent.click(row);
    const newAuthor = "New Author";

    const authors = await screen.findByDisplayValue(/Julius Verne/i);
    userEvent.clear(authors);
    userEvent.type(authors, newAuthor);
    const formSubmitBtn = screen.getByRole("button", { name: "Apply" });
    formSubmitBtn && formSubmitBtn.click();
    const updatedAuthorCell = row?.querySelector("td");
    await waitFor(() => expect(updatedAuthorCell).toHaveTextContent(newAuthor));
  });
});
