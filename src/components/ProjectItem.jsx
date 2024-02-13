import markdownToObject from "../utils/markdownToObject";
import Markdown from "./common/Markdown";
import { FaGithub, FaLink, FaPenClip } from "react-icons/fa6";
import { Content, Date, ItemWrapper, Link, Part } from "./common/ContentItem";
import styled from "styled-components";

export default function ProjectItem({ item }) {
  const project = markdownToObject(item);
  const {
    title,
    intro,
    team,
    role,
    startDate,
    endDate,
    skills,
    site,
    github,
    notion,
    content,
    image,
  } = project;

  return (
    <ItemWrapper>
      <ProjectImage src={image} alt={`${title} 이미지`} />
      <h3>{title}</h3>
      <span>{team}</span>
      <Link>
        <a href={site} target="_blank" rel="noreferrer">
          <FaLink />
          {site}
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          <FaGithub />
          {github}
        </a>
        <a href={notion} target="_blank" rel="noreferrer">
          <FaPenClip />
          {title} 회고록
        </a>
      </Link>
      <Part>
        <span>
          <b>💡 Introduce</b>
        </span>
        <p>{intro}</p>
      </Part>
      <Date>
        <span>
          {startDate} ~ {endDate || <strong>진행 중</strong>}
        </span>
      </Date>
      <Part>
        <span>
          <b>🚩 Role</b>
        </span>
        <p>{role}</p>
      </Part>
      <Part>
        <span>
          <b>⚙️ Skills</b>
        </span>
        <p>{skills}</p>
      </Part>
      <Part>
        <span>
          <b>✨ Contribute</b>
        </span>
        <Content>
          {content.map((el, idx) => (
            <Markdown key={idx}>{el}</Markdown>
          ))}
        </Content>
      </Part>
    </ItemWrapper>
  );
}

const ProjectImage = styled.img`
  width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
