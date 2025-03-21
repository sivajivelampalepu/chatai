import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";

const ThemeProviderWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode); 

  const theme = createTheme({
    palette: {
      mode, 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
