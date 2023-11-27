import { FormEventHandler } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;


type SelectProps = {options: {label: string, value: string}[],
type?: "white" | "grey",
onChange?: (event: React.ChangeEvent<HTMLOptionElement> ) => void,
}

export default function Select({options ,...restProps}: SelectProps ) {
  return <StyledSelect {...restProps}>
    {options.map((option) => <option key={option.label} value={option.value}>{option.label}</option> )}
  </StyledSelect>;
}
