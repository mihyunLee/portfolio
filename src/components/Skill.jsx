import { simpleInfo } from "../data/profile";
import SectionLayout from "./common/SectionLayout";
import styled from "styled-components";

export default function Skill() {
  return (
    <SectionLayout $headerIcon="📚">
      <h2>보유 기술</h2>
      <div className="content">
        <h3>스킬</h3>
        <SkillList>
          {simpleInfo.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </SkillList>
      </div>
    </SectionLayout>
  );
}

const SkillList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;

  li {
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid var(--lightGray);
    font-size: 14px;
    line-height: 1.6;
  }

  li:nth-child(-n + 3) {
    background-color: var(--mainColor);
    color: var(--white);
    border: none;
    font-weight: bold;
  }
`;
