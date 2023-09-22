import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./font.css";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  :root {
    --white: #fff;
  }

  body {
    font-family: "SUIT";
  }
`;

export default GlobalStyle;
