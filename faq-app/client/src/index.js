import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<App />} /> {/* Main App */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
