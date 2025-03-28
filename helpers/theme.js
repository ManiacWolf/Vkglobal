import { Inter, Red_Hat_Display } from "next/font/google";
import { createTheme, alpha } from "@mui/material/styles";

const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--inter-font",
});
const redHatDisplay = Red_Hat_Display({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
  variable: "--red-hat-display-font",
});
const brand = {
  50: "hsl(210, 100%, 95%)",
  100: "hsl(210, 100%, 92%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)",
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};

const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

const green = {
  50: "hsl(120, 80%, 98%)",
  100: "hsl(120, 75%, 94%)",
  200: "hsl(120, 75%, 87%)",
  300: "hsl(120, 61%, 77%)",
  400: "hsl(120, 44%, 53%)",
  500: "hsl(120, 59%, 30%)",
  600: "hsl(120, 70%, 25%)",
  700: "hsl(120, 75%, 16%)",
  800: "hsl(120, 84%, 10%)",
  900: "hsl(120, 87%, 6%)",
};

const orange = {
  50: "hsl(45, 100%, 97%)",
  100: "hsl(45, 92%, 90%)",
  200: "hsl(45, 94%, 80%)",
  300: "hsl(45, 90%, 65%)",
  400: "hsl(45, 90%, 40%)",
  500: "hsl(45, 90%, 35%)",
  600: "hsl(45, 91%, 25%)",
  700: "hsl(45, 94%, 20%)",
  800: "hsl(45, 95%, 16%)",
  900: "hsl(45, 93%, 12%)",
};

const red = {
  50: "hsl(0, 100%, 97%)",
  100: "hsl(0, 92%, 90%)",
  200: "hsl(0, 94%, 80%)",
  300: "hsl(0, 90%, 65%)",
  400: "hsl(0, 90%, 40%)",
  500: "hsl(0, 90%, 30%)",
  600: "hsl(0, 91%, 25%)",
  700: "hsl(0, 94%, 18%)",
  800: "hsl(0, 95%, 12%)",
  900: "hsl(0, 93%, 6%)",
};
// Create a theme instance.
const theme = createTheme({
  cssVariables: { cssVarPrefix: "isq" },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgba(255,255,255,1)",
          backgroundImage: "url('/bg-main.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
          normal: "p",
          display1: "div",
          display2: "div",
          display3: "div",
          display4: "div",
          display5: "div",
        },
      },
    },
  },
  palette: {
    primary: {
      light: brand[200],
      main: brand[400],
      dark: brand[700],
      contrastText: brand[50],
    },

    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      contrastText: brand[50],
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      contrastText: brand[50],
    },
    info: {
      light: brand[100],
      main: brand[300],
      dark: brand[600],
      contrastText: gray[50],
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      contrastText: brand[50],
    },
    grey: {
      ...gray,
    },
    smartminds: {
      light: "#ebe2d6",
      main: "#f8f4ec",
      dark: "#cbbaa3",
      contrastText: "hsla(0, 0%, 0%, .95)",
    },

    divider: alpha(gray[300], 0.4),
    background: {
      default: "hsl(0 0% 100%)",
      paper: "hsl(220 35% 100%)",
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      warning: orange[400],
      error: red[400],
      success: green[400],
      gray: gray[400],
      info: brand[300],
      smartminds: "#93c47d",
    },
    action: {
      hover: alpha(gray[200], 0.2),
      selected: `${alpha(gray[200], 0.3)}`,
    },
    baseShadow: "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    fontWeightBold: 600,
    fontWeightRegular: 400,
    fontWeightLight: 200,
    fontWeightMedium: 500,

    h1: {
      fontSize: "4rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: "3.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.125rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    normal: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },

    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },
  shape: { borderRadius: 6 },
});
theme.typography.display1 = {
  fontFamily: redHatDisplay.style.fontFamily,
  fontWeight: 300,
  fontSize: "2.5rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "4.5rem",
  },
};
theme.typography.display2 = {
  fontFamily: redHatDisplay.style.fontFamily,
  fontWeight: 300,
  fontSize: "2rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "4rem",
  },
};
theme.typography.display3 = {
  fontFamily: redHatDisplay.style.fontFamily,
  fontWeight: 300,
  fontSize: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "3.5rem",
  },
};
theme.typography.display4 = {
  fontFamily: redHatDisplay.style.fontFamily,
  fontWeight: 300,
  fontSize: "1.25rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.65rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.05rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.45rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.85rem",
  },
};
theme.typography.display5 = {
  fontFamily: redHatDisplay.style.fontFamily,
  fontWeight: 300,
  fontSize: "1.15rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.85rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.55rem",
  },
};
export default theme;
