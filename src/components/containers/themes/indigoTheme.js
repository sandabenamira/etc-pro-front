/* eslint-disable import/no-anonymous-default-export */
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import "../../../styles/fonts/museo/style.css";
export default {
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
      contrastText: "#fff",
    },
    secondary: {
      light: pink[300],
      main: pink["A200"],
      dark: pink[700],
      contrastText: "#fff",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: ['"Museo 300"','"Museo 700"'],
    button: {
      fontWeight: 400,
      textAlign: "capitalize",
    },
  },
};
