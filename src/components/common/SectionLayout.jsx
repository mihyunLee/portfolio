import styled from "styled-components";

export default function SectionLayout({ children, $headerIcon }) {
  return <Layout $headerIcon={$headerIcon}>{children}</Layout>;
}

const Layout = styled.section`
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

  .content {
    width: calc(100% - 220px);
    padding-left: 220px;

    ol > li:not(:last-child) {
      border-bottom: 1px solid var(--lightGray);
      margin-bottom: 32px;
      padding-bottom: 32px;
    }

    @media (max-width: 768px) {
      width: 100%;
      padding-left: 0;
    }
  }

  .grid {
    width: calc(100% - 220px);
    padding-left: 220px;

    ol {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;

      li {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 9px;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      padding-left: 0;
    }
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
