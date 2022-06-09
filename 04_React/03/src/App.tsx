import { Container } from "@mui/material";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookProvider } from "./book/services/BookService";
import { Header } from "./shared/components/Header/Header";

const App = () => (
  <>
    <BookProvider>
      <Header />
      <Container>
        <BookOverview />
      </Container>
    </BookProvider>
  </>
);

export default App;
