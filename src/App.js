import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
// IMPORT para as rotas
import { Routes, Route } from "react-router-dom";

import PageHome from "./site/PageHome";
import PageAbout from "./site/PageAbout";
import PageProject from "./site/PageProject";
import PageError from "./site/PageError";

import Dashboard from "./dashboard/DashboardContent";

import BaseModelo from "./site/BaseModelo";
import BaseModeloDetailsPage from "./site/BaseModeloDetailsPage";

import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/project" element={<PageProject />} />

        <Route path="/modelo" element={<BaseModelo />} />
        <Route
          path="/modelo/user/:userID"
          element={<BaseModeloDetailsPage />}
        />
        <Route path="*" element={<PageError />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
