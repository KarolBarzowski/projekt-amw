import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme as mainTheme } from "theme/mainTheme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "views/App";
import Nav from "components/Nav";
import { useDarkMode } from "hooks/useDarkMode";

function Root() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeProvider theme={mainTheme[theme]}>
      <GlobalStyle />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
