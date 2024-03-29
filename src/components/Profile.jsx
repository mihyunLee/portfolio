import styled from "styled-components";
import { simpleInfo } from "../data/profile";
import { FaEnvelope, FaGithub, FaBloggerB } from "react-icons/fa6";
import Intro from "./Intro";

export default function Profile() {
  const { name, job, email, github, blog, image } = simpleInfo;

  return (
    <StyledSection id="intro">
      <Info>
        <Photo>
          <img src={image} alt="프로필 이미지" />
        </Photo>
        <Name>{name}</Name>
        <Job>{job}</Job>
        <Contact>
          <a href={`mailto:${email}`}>
            <FaEnvelope />
            {email}
          </a>
          <a href={github} target="_blank" rel="noreferrer noopener">
            <FaGithub />
            {github}
          </a>
          <a href={blog} target="_blank" rel="noreferrer noopener">
            <FaBloggerB />
            {blog}
          </a>
        </Contact>
        <Message>
          *이력서의 파란 글씨에는 하이퍼링크가 적용되어 있습니다.
        </Message>
      </Info>
      <IntroBox>
        <Intro />
      </IntroBox>
      <GithubGraph>
        <img
          src="https://ghchart.rshah.org/mihyunLee"
          alt="github 커밋 그래프"
        />
      </GithubGraph>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const Photo = styled.div`
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Message = styled.p`
  margin-top: 16px;
  color: gray;
  font-size: 14px;
`;

const Name = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 4px;
  }
`;

const Job = styled.span`
  position: relative;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
  padding-bottom: 24px;

  &::after {
    background: var(--black);
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 60px;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
    transition: color 0.2s;

    &:hover {
      color: var(--mainColor);
    }

    svg {
      margin-right: 8px;
    }
  }
`;

const IntroBox = styled.div`
  margin: 48px 0;
`;

const GithubGraph = styled.div`
  width: calc(100% - 120px);
  margin: 0 auto;
  padding-bottom: 60px;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
