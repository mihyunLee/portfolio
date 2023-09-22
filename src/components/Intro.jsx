import useData from "../hooks/useData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Spinner from "./common/Spinner";
import styled from "styled-components";

export default function Intro() {
  const { file: intro, isLoading } = useData("intro");

  if (isLoading) return <Spinner />;

  if (!intro) {
    return <p>소개 글이 없습니다.</p>;
  }

  return (
    <IntroContainer>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {intro}
      </ReactMarkdown>
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  blockquote p {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.55;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin-top: 12px;

    strong {
      font-weight: bold;
    }
  }
`;
