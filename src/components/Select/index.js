import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as ExpandIcon } from "assets/expand.svg";
import { useOutsideClick } from "hooks/useOutsideClick";
import Paragraph from "components/Paragraph";

const Wrapper = styled.div`
  position: relative;
  width: 340px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 21px;
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.gray5};
  border: 2px solid transparent;
  border-right-color: ${({ theme }) => theme.gray4};
  border-radius: 5px 0 0 5px;
  padding: 0 10px;
  outline: none;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  :focus {
    border-color: ${({ theme }) => theme.gray4};
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const DropdownBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${({ theme }) => theme.gray5};
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  outline: none;

  :hover {
    background-color: ${({ theme }) => theme.gray4};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 400px;
  width: 340px;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 8px;
  overflow-y: auto;
  opacity: 0;
  transition: background-color 0.15s ease-in-out;

  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          display: block;
        `
      : css`
          visibility: hidden;
          display: none;
        `};

  ::-webkit-scrollbar {
    width: 12px;
    background-color: ${({ theme }) => theme.gray5};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.gray4};
    border-radius: 20px;
  }
`;

const StyledExpandIcon = styled(ExpandIcon)`
  fill: ${({ theme }) => theme.text};
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(-180deg)" : "rotate(0)"};
  transition: transform 0.15s ease-in-out, fill 0.15s ease-in-out;
`;

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  width: 100%;
`;

const CountryBtn = styled.button`
  height: 100%;
  padding: 8px 0;
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.15s ease-in-out;

  :hover {
    background-color: ${({ theme }) => theme.gray4};
  }
`;

function Select({ data, setCountry }) {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleSelectCountry = ({ Country, Slug, ISO2 }) => {
    setIsDropdownOpen(false);
    setQuery(Country);
    setCountry({ Country, Slug, ISO2 });
  };

  return (
    <Wrapper ref={dropdownRef}>
      <Row>
        <Input
          type="text"
          value={query}
          placeholder="World"
          onChange={handleChange}
          onClick={handleDropdownOpen}
        />
        <DropdownBtn
          type="button"
          onClick={() => setIsDropdownOpen((prevState) => !prevState)}
        >
          <StyledExpandIcon isExpanded={isDropdownOpen} />
        </DropdownBtn>
      </Row>
      <Dropdown isOpen={isDropdownOpen}>
        <List>
          {data
            .sort((a, b) => a.Country.localeCompare(b.Country))
            .filter(({ Country }) =>
              Country.toLowerCase().includes(query.toLowerCase())
            )
            .map(({ Country, Slug, ISO2 }) => (
              <ListItem key={Country}>
                <CountryBtn
                  type="button"
                  onClick={() => handleSelectCountry({ Country, Slug, ISO2 })}
                >
                  <Paragraph>{Country}</Paragraph>
                </CountryBtn>
              </ListItem>
            ))}
        </List>
      </Dropdown>
    </Wrapper>
  );
}

export default Select;
