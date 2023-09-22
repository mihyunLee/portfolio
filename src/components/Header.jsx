import styled from "styled-components";
import { simpleInfo } from "../data/profile";

export default function Header() {
  return (
    <StyledHeader>
      <div>
        <h1>
          {simpleInfo.name} {simpleInfo.job}
        </h1>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: var(--white);

  div {
    padding: 16px 20px;
  }

  h1::before {
    content: "🏕️";
    margin-right: 5px;
  }
`;
