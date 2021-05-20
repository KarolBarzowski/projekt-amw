import styled from "styled-components";

const Heading = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: ${({ big }) => (big ? "34px" : "21px")};
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  transition: color 0.15s ease-in-out;
`;

export default Heading;
