import { Container } from "@mui/material";
import { Title } from "./Title";
import { CustomButton } from "./Button";
import { ThemeProvider } from "./ThemeProvider";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Container>
          <Title title={"test test"} />
          <CustomButton />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
