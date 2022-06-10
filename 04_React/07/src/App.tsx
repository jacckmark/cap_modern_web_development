import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { UserForm } from "./user/components/UserForm/UserForm";
import { UserList } from "./user/components/UserList/UserList";
import LoaderProvider from "./shared/services/LoaderService";

import { BookProvider } from "./book/services/BooksService";
import { UserProvider } from "./user/services/UserService";
import { Header } from "./shared/components/Header/Header";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./shared/styles/theme";
import { useState } from "react";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/book-app/books" replace />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
    <Route path="/users/new" element={<UserForm />} />
    <Route path="/users/list" element={<UserList />} />
  </Routes>
);

type ThemeType = "dark" | "light";

const App = () => {
  const [type, setType] = useState<ThemeType>("light");

  const toggleThemeType = () =>
    setType((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <BookProvider>
          <UserProvider>
            <LoaderProvider>
              <ThemeProvider theme={type === "dark" ? darkTheme : lightTheme}>
                <CssBaseline />
                <Header onToggleTheme={toggleThemeType} />
                <Container>
                  <AppRoutes />
                </Container>
              </ThemeProvider>
            </LoaderProvider>
          </UserProvider>
        </BookProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
