import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./font.css";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  :root {
    --white: #fff;
    --black: #000;
    --gray: #acb1b7;
    --mainColor: #34bfe9;
  }

  body {
    font-family: "SUIT";
    color: var(--black);
  }
`;

export default GlobalStyle;
