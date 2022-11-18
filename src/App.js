import "./App.css";
// IMPORT para as rotas
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageProject from "./pages/PageProject";

import PageError from "./pages/PageError";

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

        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
