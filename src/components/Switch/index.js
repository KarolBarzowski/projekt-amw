import React from "react";
import styled from "styled-components";

const Label = styled.label`
  position: relative;
  height: 28px;
  width: 55px;
  border-radius: 100px;
  cursor: pointer;
  margin: 0 5px;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.green : theme.gray3};
  transition: background-color 0.15s ease-in-out;
`;

const Input = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 2px;
  left: 3px;
  height: 24px;
  width: 24px;
  background-color: rgb(255, 255, 255, 0.87);
  border-radius: 50%;
  transform: translateX(${({ isChecked }) => (isChecked ? "25px" : "0px")});
  transition: transform 0.3s ease-in-out;
`;

const Switch = ({ isChecked, setIsChecked }) => (
  <Label isChecked={isChecked}>
    <Input type="checkbox" checked={isChecked} onChange={setIsChecked} />
    <Checkmark isChecked={isChecked} />
  </Label>
);

export default Switch;
