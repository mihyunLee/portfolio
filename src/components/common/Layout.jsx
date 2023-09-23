import styled from "styled-components";

export default function Layout({ children, $headerIcon }) {
  return <LayoutSection $headerIcon={$headerIcon}>{children}</LayoutSection>;
}

const LayoutSection = styled.section`
  padding-top: 40px;
  padding-bottom: 60px;
  border-top: 3px solid var(--black);

  h2 {
    float: left;
    font-size: 20px;
    font-weight: bold;

    &::before {
      content: "${(props) => props.$headerIcon || ""}";
      margin-right: 5px;
    }

    @media (max-width: 768px) {
      float: none;
      margin-bottom: 24px;
    }
  }

  ol {
    width: calc(100% - 220px);
    padding-left: 220px;

    @media (max-width: 768px) {
      padding-left: 0;
    }
  }

  ol > li:not(:last-child) {
    border-bottom: 1px solid var(--lightGray);
    margin-bottom: 32px;
    padding-bottom: 32px;
  }

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  h3 + span {
    line-height: 1.4;
  }
`;
