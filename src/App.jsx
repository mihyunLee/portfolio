import Header from "./components/common/Header";
import Profile from "./components/Profile";
import Main from "./components/Main";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Content from "./components/common/Content";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Profile />
        <Project />
        <Skill />
        <Content folderName="education" header="학력" headerIcon="🎓" />
      </Main>
    </>
  );
}

export default App;
