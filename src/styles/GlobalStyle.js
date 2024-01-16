import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./font.css";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  :root {
    --white: #fff;
    --black: #000;
    --lightGray: #e0e0e0;
    --gray: #acb1b7;
    --mainColor: #34bfe9;
  }

  body {
    font-family: "SUIT";
    color: var(--black);
  }

  a {
    color: var(--mainColor);
    font-weight: bold;

    &:hover {
      filter: brightness(1.03);
    }
  }

  svg {
    vertical-align: middle;
  }

  b,
  strong {
    font-weight: bold;
  }
`;

export default GlobalStyle;
