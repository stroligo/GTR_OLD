import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// IMPORT para as rotas
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageProject from "./pages/PageProject";
import PageError from "./pages/PageError";

import BaseModelo from "./pages/BaseModelo";
import BaseModeloDetailsPage from "./pages/BaseModeloDetailsPage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/project" element={<PageProject />} />

        {/* MODELO */}
        <Route path="/modelo" element={<BaseModelo />} />
        <Route
          path="/modelo/user/:userID"
          element={<BaseModeloDetailsPage />}
        />

        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
