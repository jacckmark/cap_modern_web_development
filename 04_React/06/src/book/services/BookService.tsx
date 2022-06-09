import React, { createContext, ReactNode } from "react";
import { useContext } from "react";
import { Book, BookProperties } from "../book";

export const API_URL = "http://localhost:8000/";

export interface BookServiceI {
  findAll: () => Promise<Book[]>;
  find: (id: number) => Promise<Book>;
  update: (book: Book) => Promise<Book>;
  remove?: (id: number) => Promise<Book[]>;
  create: (book: BookProperties) => Promise<Book>;
}

export const getURI = (endpoint: string) => `${API_URL}${endpoint}`;
export const BookContext = createContext({} as BookServiceI);

export const useBook = (): BookServiceI => {
  const findAll: BookServiceI["findAll"] = async () => {
    return fetch(getURI("books"))
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const find: BookServiceI["find"] = async (id: number) => {
    return fetch(getURI(`books/${id}`))
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const remove: BookServiceI["remove"] = async (id: number) => {
    return fetch(getURI(`books/${id}`), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const update: BookServiceI["update"] = async (book: Book) => {
    return fetch(getURI(`books/${book.id}`), {
      method: "PUT",
      body: JSON.stringify(book),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const create: BookServiceI["create"] = async (book: BookProperties) => {
    const allElements = findAll().then((res) => res);
    return fetch(getURI(`books`), {
      method: "POST",
      body: JSON.stringify({ ...book, id: (await allElements).length + 1 }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  return { findAll, find, remove, update, create };
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <BookContext.Provider value={useBook()}>{children}</BookContext.Provider>
  );
};

export const useBookService = () => useContext(BookContext);
