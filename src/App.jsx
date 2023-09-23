import Header from "./components/Header";
import Profile from "./components/Profile";
import Main from "./components/Main";
import Project from "./components/Project";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Profile />
        <Project />
      </Main>
    </>
  );
}

export default App;
