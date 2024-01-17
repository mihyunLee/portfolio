import markdownToObject from "../utils/markdownToObject";
import Markdown from "./common/Markdown";
import { FaGithub, FaLink } from "react-icons/fa6";
import { Content, Date, ItemWrapper, Link, Part } from "./common/ContentItem";

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
    content,
  } = project;

  return (
    <ItemWrapper>
      <h3>{title}</h3>
      <span>{team}</span>
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
      <Link>
        <a href={site} target="_blank" rel="noreferrer">
          <FaLink />
          {site}
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          <FaGithub />
          {github}
        </a>
      </Link>
    </ItemWrapper>
  );
}
