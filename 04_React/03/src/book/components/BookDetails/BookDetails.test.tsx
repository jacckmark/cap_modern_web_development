import { createRoot } from "react-dom/client";
import { BookDetails } from "./BookDetails";
import { act, render, screen } from "@testing-library/react";

describe("BookDetails", () => {
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div!);
    act(() => {
      root.render(<BookDetails book={currentBook} onBookChange={jest.fn()} />);
      root.unmount();
    });
  });

  it("renders authors with label", () => {
    render(<BookDetails book={currentBook} onBookChange={jest.fn()} />);
    const authorInput = screen.getByLabelText(/Authors/i) as HTMLInputElement;
    expect(authorInput.value).toBe(currentBook.authors);
  });

  it("renders a title with a label", () => {
    render(<BookDetails book={currentBook} onBookChange={jest.fn()} />);
    const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement;
    expect(titleInput.value).toBe(currentBook.title);
  });
});
