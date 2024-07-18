import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 2600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.6rem;
      font-weight: 500;
    `} /* background-color: yellow; */
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `} /* background-color: yellow; */
`;
export default Heading;
