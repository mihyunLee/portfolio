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
        <span>💡 Introduce</span>
        <p>{intro}</p>
      </Part>
      <Date>
        <span>
          {startDate} ~ {endDate || <strong>진행 중</strong>}
        </span>
      </Date>
      <Part>
        <span>🚩 Role</span>
        <p>{role}</p>
      </Part>
      <Part>
        <span>⚙️ Skills</span>
        <p>{skills}</p>
      </Part>
      <Content>
        <ul>
          {content.map((el, idx) => (
            <li key={idx}>
              <Markdown>{el}</Markdown>
            </li>
          ))}
        </ul>
      </Content>
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
