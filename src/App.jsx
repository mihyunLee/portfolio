import Header from "./components/common/Header";
import Profile from "./components/Profile";
import Main from "./components/Main";
import Project from "./components/Project";
import Skill from "./components/Skill";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Profile />
        <Project />
        <Skill />
      </Main>
    </>
  );
}

export default App;
