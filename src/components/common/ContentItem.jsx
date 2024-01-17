import markdownToObject from "../../utils/markdownToObject";
import styled from "styled-components";
import Markdown from "./Markdown";
import { FaLink } from "react-icons/fa6";

export default function ContentItem({ item }) {
  const contents = markdownToObject(item);
  const { title, detail, date, content = "", link = "" } = contents;

  return (
    <ItemWrapper>
      <h3>{title}</h3>
      <span>{detail}</span>
      <Date>
        <span>{date}</span>
      </Date>
      <Content>
        {content && (
          <>
            {content.map((el, idx) => (
              <Markdown key={idx}>{el}</Markdown>
            ))}
          </>
        )}
      </Content>
      <Link>
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            <FaLink />
            {link}
          </a>
        )}
      </Link>
    </ItemWrapper>
  );
}

export const ItemWrapper = styled.div`
  position: relative;
`;

export const Date = styled.time`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;

  strong {
    font-weight: bold;
    color: var(--mainColor);
  }
`;

export const Part = styled.div`
  margin: 16px 0;

  p {
    margin-top: 8px;
  }

  li {
    list-style-type: disc;
    line-height: 1.6;
    font-size: 15px;
  }
`;

export const Content = styled(Part)`
  p {
    margin-bottom: 4px;
  }

  ul {
    padding-left: 16px;
  }
`;

export const Link = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  a {
    width: max-content;
    color: var(--black);
    font-weight: normal;
    font-size: 14px;
    padding: 8px 10px;
    border-radius: 5px;
    transition: all 0.1s ease-in-out;

    &:hover {
      backdrop-filter: saturate(1.2);
      background-color: rgba(204, 209, 223, 0.3);
    }

    svg {
      margin-right: 8px;
    }
  }
`;
