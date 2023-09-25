import useData from "../hooks/useData";
import Layout from "./common/Layout";
import Spinner from "./common/Spinner";
import ProjectGridItem from "./ProjectGridItem";
import ProjectItem from "./ProjectItem";

export default function Project() {
  const { file: projects, isLoading } = useData("projects");

  if (isLoading) {
    return <Spinner />;
  }

  if (!projects) {
    return <p>프로젝트가 존재하지 않습니다.</p>;
  }

  return (
    <>
      <Layout $headerIcon="🧑🏻‍💻">
        <h2>프로젝트</h2>
        <div className="content">
          <ol>
            {projects.map((project, idx) => (
              <li key={idx}>
                <ProjectItem {...project} />
              </li>
            ))}
          </ol>
        </div>
      </Layout>
      <Layout $headerIcon="🚀">
        <h2>포트폴리오</h2>
        <div className="grid">
          <ol>
            {projects.map((project, idx) => (
              <li key={idx}>
                <ProjectGridItem {...project} />
              </li>
            ))}
          </ol>
        </div>
      </Layout>
    </>
  );
}
