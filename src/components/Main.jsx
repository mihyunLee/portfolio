import styled from "styled-components";

export default function Main({ children }) {
  return <StyledMain id="main">{children}</StyledMain>;
}

const StyledMain = styled.main`
  max-width: 920px;
  margin: 0 auto;
  padding: 0 40px;
  padding-top: 120px;
`;
