import styled from "styled-components";
import markdownToObject from "../utils/markdownToObject";
import { ItemWrapper } from "./common/ContentItem";

export default function ProjectGridItem({ item }) {
  const project = markdownToObject(item);
  const { title, intro, site, image } = project;

  return (
    <ItemWrapper>
      <ItemBox>
        <figcaption className="hover_display">
          <span>{title}</span>
          <br />
          <span>{intro}</span>
        </figcaption>
        <a href={site} target="_blank" rel="noreferrer">
          <ProjectImg src={image} alt={`${title} 프로젝트 이미지`} />
        </a>
      </ItemBox>
    </ItemWrapper>
  );
}

const ItemBox = styled.figure`
  position: relative;

  a {
    width: 100%;
    height: 100%;
    transition: filter 0.5s ease;

    &:hover {
      filter: brightness(0.5);
    }
  }

  .hover_display {
    width: calc(100% - 20px);
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: var(--white);
    text-align: center;
    transition: opacity 0.5s ease;

    span:nth-child(1) {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.6;
      text-decoration: underline 4px solid var(--mainColor);
    }

    span:nth-child(3) {
      line-height: 1.3;
    }
  }

  &:hover {
    .hover_display {
      opacity: 1;
      z-index: 50;
    }
  }
`;

const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  object-position: center;
  transform-origin: center;
  transition: transform 0.5s ease;

  &:hover {
    transform: translateZ(0) scale(1.05);
  }
`;
