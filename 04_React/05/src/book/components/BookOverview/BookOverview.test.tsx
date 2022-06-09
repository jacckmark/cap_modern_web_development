import { createRoot } from "react-dom/client";
import { render, screen, act } from "@testing-library/react";
import { BookOverview } from "./BookOverview";
import { BookContext, getURI, useBook } from "../../services/BookService";
import { Book } from "../../book";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

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

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockUseNavigate,
}));

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
  <BookContext.Provider value={useBook()}>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/book-app/book/1" element={children} />
      </Routes>
    </MemoryRouter>
  </BookContext.Provider>
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
    const juliusExampleRow = await screen.findByText(/Julius Verne/i);
    const frankSmithRow = await screen.findByText(/Frank Herbert/i);
    // then
    expect(juliusExampleRow).toBeInTheDocument();
    expect(frankSmithRow).toBeInTheDocument();
  });

  it("renders books table with data received from server", async () => {
    // given
    expect.hasAssertions();

    render(<BookOverview />, { wrapper: WrapperComponent });
    expect(await screen.findByText(/Julius Verne/i)).toBeInTheDocument();
    expect(await screen.findByText(/Frank Herbert/i)).toBeInTheDocument();
  });

  it("change path after row click", async () => {
    // given
    render(<BookOverview />, { wrapper: WrapperComponent });
    // when
    const authorCell = await screen.findByText(/Julius Verne/i);
    const row = authorCell.closest("tr");
    row && userEvent.click(row);
    //then
    expect(mockUseNavigate).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/book-app/book/1");
  });
});
