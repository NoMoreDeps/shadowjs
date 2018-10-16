import * as React    from "react"                            ;   
import * as ReactDom from "react-dom"                        ;   
import Dashboard     from "./Dashboard"                      ;   
import blue          from '@material-ui/core/colors/blue'    ;   
import purple          from '@material-ui/core/colors/purple'    ;   
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core" ;

const palette = {
  palette: {
    primary: blue,
    secondary: purple
  },
};

const theme = createMuiTheme(palette);


ReactDom.render(
  <MuiThemeProvider theme={theme}>
    <Dashboard />
  </MuiThemeProvider>
, document.querySelector("#app"));