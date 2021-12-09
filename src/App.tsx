import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./App.style";
import { MainPage } from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
