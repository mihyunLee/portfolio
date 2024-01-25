import Header from "./components/common/Header";
import Profile from "./components/Profile";
import MainLayout from "./components/common/MainLayout";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Content from "./components/common/Content";

function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <Profile />
        <Project />
        <Skill />
        <Content folderName="education" header="학력" headerIcon="🎓" />
        <Content
          folderName="experience"
          header="수상 및 활동"
          headerIcon="🏆"
        />
        <Content
          folderName="certificate"
          header="수료 및 자격증"
          headerIcon="📜"
        />
      </MainLayout>
    </>
  );
}

export default App;
