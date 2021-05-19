import React from "react";
import styled from "styled-components";
import Heading from "components/Heading";
import Switch from "components/Switch";
import { ReactComponent as LightModeIcon } from "assets/light_mode.svg";
import { ReactComponent as DarkModeIcon } from "assets/dark_mode.svg";

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 89px;
  width: 100%;
  padding: 13px;
  background-color: ${({ theme }) => theme.gray5};
  transition: background-color 0.15s ease-in-out;
`;

const ThemeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledLightModeIcon = styled(LightModeIcon)`
  fill: ${({ theme }) => theme.text};
  transition: fill 0.15s ease-in-out;
`;

const StyledDarkModeIcon = styled(DarkModeIcon)`
  fill: ${({ theme }) => theme.text};
  transition: fill 0.15s ease-in-out;
`;

function Nav({ theme, toggleTheme }) {
  const handleChangeTheme = () => {
    toggleTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Wrapper>
      <Heading big>COVID-19 Statistics</Heading>
      <ThemeWrapper>
        <StyledLightModeIcon />
        <Switch isChecked={theme === "dark"} setIsChecked={handleChangeTheme} />
        <StyledDarkModeIcon />
      </ThemeWrapper>
    </Wrapper>
  );
}

export default Nav;
