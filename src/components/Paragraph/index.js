import styled from "styled-components";

const Paragraph = styled.nav`
  color: ${({ theme, secondary }) =>
    secondary ? theme.textSecondary : theme.text};
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  transition: color 0.15s ease-in-out;
`;

export default Paragraph;
