import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <Link to="/" className="btn">
        Kembali
      </Link>
    </div>
  );
}

export default NotFound;
