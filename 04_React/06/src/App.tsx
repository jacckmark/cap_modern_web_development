import { Container } from "@mui/material";
import { BookProvider } from "./book/services/BookService";
import { Header } from "./shared/components/Header/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/book-app/books" />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <Header />
    <Container>
      <BookProvider>
        <AppRoutes />
      </BookProvider>
    </Container>
  </BrowserRouter>
);

export default App;
