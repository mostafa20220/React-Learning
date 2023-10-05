import styled, { css } from "styled-components";

interface HeadingProps {
  as?: string;
  size?: 'small' | 'medium' | 'large'; // Add the size property here
}

const Heading = styled.h1<HeadingProps>`
  ${props=>props.as === 'h1' && css`
    font-size: 30px;
    `}
    
    ${props => props.as === 'h2' && css`
    font-size: 20px;
  `}

  ${as => as.as === 'h3' && css`
    font-size: 10px;
  `}


  ${(props) => props.size  === 'small' && css`
    font-size: 10px;
  `}


  ${(props) => props.size  === 'medium' && css`
    font-size: 30px;
  `}

  ${(props) => props.size  === 'large' && css`
    font-size: 50px;
  `}



  font-weight: 600;
`;

export default Heading;