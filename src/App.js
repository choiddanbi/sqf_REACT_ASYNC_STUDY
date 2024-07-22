import { Global } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { reset } from "./styles/global";
import GetPage from "./pages/basic/GetPage";
import PostPage from "./pages/basic/PostPage";
import PutPage from "./pages/basic/PutPage";
import DeletePage from "./pages/basic/DeletePage";
import MainLayout from "./components/MainLayout/MainLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  return (
    <>
    <Global styles={reset}/>
    <MainLayout>
      <Sidebar />
      <MainContainer>
        <Routes>
          <Route path="/async/basic/post" element={<PostPage/>} />
          <Route path="/async/basic/get" element={<GetPage/>} />
          <Route path="/async/basic/put" element={<PutPage/>} />
          <Route path="/async/basic/delete" element={<DeletePage/>} />
        </Routes>
      </MainContainer>
    </MainLayout>
    </>
  );
}

export default App;
