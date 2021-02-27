import React from "react";
import styled from "styled-components";
interface InputProps {
  type?: string;
}

const InputCompoent = styled.input``;

function Input(prop: InputProps) {
  const { type = "text" } = prop;
  return <InputCompoent type={type} />;
}

export default Input;
