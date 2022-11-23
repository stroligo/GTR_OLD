import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// IMPORT para as rotas
import { Routes, Route } from "react-router-dom";

import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageProject from "./pages/PageProject";
import PageError from "./pages/PageError";
import Tasks from "./pages/Tasks";

import BaseModelo from "./pages/BaseModelo";
import BaseModeloDetailsPage from "./pages/BaseModeloDetailsPage";

import TaskUser from "./pages/TaskUser";

import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/project" element={<PageProject />} />
        <Route path="/tasks" element={<Tasks />} />

        <Route path="/modelo" element={<BaseModelo />} />
        <Route
          path="/modelo/user/:userID"
          element={<BaseModeloDetailsPage />}
        />
        <Route path="/taskuser/:matricula" element={<TaskUser />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
