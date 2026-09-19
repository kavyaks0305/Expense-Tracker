// theme.ts

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#10b981",
    },
    background: {
      default: "#F5F7FA",
    },
  },

  typography: {
    fontFamily: "Inter",
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;
