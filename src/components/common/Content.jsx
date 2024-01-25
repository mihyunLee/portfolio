import useData from "../../hooks/useData";
import ContentItem from "./ContentItem";
import SectionLayout from "./SectionLayout";
import Spinner from "./Spinner";

export default function Content({ folderName, header, headerIcon }) {
  const { file, isLoading } = useData(folderName);

  if (isLoading) {
    return <Spinner />;
  }

  if (!file) {
    return <p>{header}이(가) 존재하지 않습니다.</p>;
  }

  return (
    <SectionLayout $headerIcon={headerIcon}>
      <h2>{header}</h2>
      <div className="content">
        <ol>
          {file.map((item, idx) => (
            <li key={idx}>
              <ContentItem item={item} />
            </li>
          ))}
        </ol>
      </div>
    </SectionLayout>
  );
}
