import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/mainTheme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "views/App";

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
