// IMPORT para as rotas
import { Routes, Route, Outlet } from "react-router-dom";

import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageProject from "./pages/PageProject";
import PageError from "./pages/PageError";
import Tasks from "./pages/Tasks";

import PageUser from "./pages/PageUser";
import PageUserDetails from "./pages/PageUserDetails";
import TaskDetails from "./pages/TaskDetails";

import TaskUser from "./pages/TaskUser";

import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

/* Implementacao do front */
/* import Front from "./pages/Front"; */

function App() {
  return (
    <div className="App">
      <Toaster />

      <Routes>
        <Route
          element={
            <div style={{ display: "flex" }}>
              <NavBar />
              <div style={{ "flex-grow": "1" }}>
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path="/" element={<PageHome />} />
          <Route path="/about" element={<PageAbout />} />

          {/*   <Route path="/front" element={<Front />} /> */}

          <Route path="/project" element={<PageProject />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:taskID" element={<TaskDetails />} />

          <Route path="/user" element={<PageUser />} />
          <Route path="/user/:userID" element={<PageUserDetails />} />
          <Route path="/taskuser/:matricula" element={<TaskUser />} />
          <Route path="*" element={<PageError />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
