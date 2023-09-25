import useData from "../hooks/useData";
import ContentItem from "./common/ContentItem";
import Layout from "./common/Layout";
import Spinner from "./common/Spinner";

export default function Education() {
  const { file: educations, isLoading } = useData("education");

  if (isLoading) {
    return <Spinner />;
  }

  if (!educations) {
    return <p>최종 학력이 존재하지 않습니다.</p>;
  }

  return (
    <Layout $headerIcon="🎓">
      <h2>학력</h2>
      <div className="content">
        <ol>
          {educations.map((education, idx) => (
            <li key={idx}>
              <ContentItem {...education} />
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}
