import markdownToObject from "../utils/markdownToObject";
import { Date, ItemWrapper } from "./ProjectItem";

export default function EducationItem(props) {
  const education = markdownToObject(props.data);
  const { university, detail, date } = education;

  return (
    <ItemWrapper>
      <h3>{university}</h3>
      <span>{detail}</span>
      <Date>
        <span>{date}</span>
      </Date>
    </ItemWrapper>
  );
}
