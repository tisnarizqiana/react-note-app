import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. Wajib import ini untuk Routing
import App from "./App";

// 2. Import CSS yang benar.
// Pastikan folder 'styles' dan file 'style.css' sudah ada di dalam folder 'src'.
import "./styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 3. Bungkus App dengan BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
