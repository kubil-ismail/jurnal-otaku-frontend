import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif",
    h1: {
      fontSize: "48px",
      fontWeight: "600",
    },
    h2: {
      fontSize: "36px",
      fontWeight: "600",
    },
    h3: {
      fontSize: "30px",
      fontWeight: "600",
    },
    h4: {
      fontSize: "24px",
      fontWeight: "600",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "600",
    },
    h6: {
      fontSize: "16px",
      fontWeight: "600",
    },
    body1: {
      fontWeight: "300",
      fontSize: "14px",
    },
    body2: {
      fontWeight: "300",
      fontSize: "14px",
    },
    button: {
      fontWeight: "400",
      textTransform: "inherit",
    },
  },
  palette: {
    primary: {
      main: "#0076d6",
      contrastText: "#fff",
    },
    info: {
      main: "#B4B4B4",
      contrastText: "#0076d6",
    },
    secondary: {
      main: "#676cc8",
      contrastText: "#fff",
    },
    error: {
      main: "#EC1C23",
      contrastText: "#fff",
    },
    warning: {
      main: "#ffbe2e",
      contrastText: "#171717",
    },
    success: {
      main: "#04c585",
      contrastText: "#fff",
    },
    text: {
      primary: "#3F2418",
      secondary: "#adadad",
      disabled: "#ffffff",
    },
  },
  // Overrides style component
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "small",
      },
      styleOverrides: {
        textInherit: {
          color: "#000000",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
  },
});

export default mainTheme;
