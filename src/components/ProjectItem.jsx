import markdownToObject from "../utils/markdownToObject";
import styled from "styled-components";
import Markdown from "./common/Markdown";
import { FaGithub, FaLink } from "react-icons/fa6";

export default function ProjectItem(props) {
  const project = markdownToObject(props.data);
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
    <ProjectItemWrapper>
      <h3>{title}</h3>
      <span>{team}</span>
      <Part>
        <span>💡 Introduce</span>
        <p>{intro}</p>
      </Part>
      <ProjectDate>
        <span>
          {startDate} ~ {endDate || <strong>진행 중</strong>}
        </span>
      </ProjectDate>
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
    </ProjectItemWrapper>
  );
}

const ProjectItemWrapper = styled.div`
  position: relative;
`;

const Part = styled.div`
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

const Content = styled(Part)`
  padding-left: 16px;
`;

const ProjectDate = styled.time`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;

  strong {
    font-weight: bold;
    color: var(--mainColor);
  }
`;

const Link = styled.div`
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
