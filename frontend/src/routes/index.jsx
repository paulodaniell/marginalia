import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import SnippetDetails from "../pages/SnippetDetails";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/snippets/:id" element={<SnippetDetails />} />
      </Routes>
    </BrowserRouter>
  );
}