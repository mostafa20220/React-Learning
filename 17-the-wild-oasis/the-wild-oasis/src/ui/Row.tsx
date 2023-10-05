import styled, { css } from "styled-components";


type RowProps = {
  type?: "vertical" | "horizontal";
};

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
    `}
`;


Row.defaultProps = {
  type: "vertical",
}

export default Row;