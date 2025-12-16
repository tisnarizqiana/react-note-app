import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showFormattedDate } from "../utils/date";

function DetailPage({ semuaData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = semuaData.find((item) => item.id.toString() === id);

  if (!note) {
    return (
      <div className="not-found-container">
        <p>Catatan tidak ditemukan.</p>
        <Link to="/">Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div style={{ marginBottom: "30px" }}>
        <button
          className="btn-kembali"
          onClick={() => navigate("/")}
          title="Kembali ke daftar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali
        </button>
      </div>

      <h2 className="detail-title">{note.title}</h2>
      <span className="detail-date">{showFormattedDate(note.createdAt)}</span>

      <div className="detail-body">{note.body}</div>
    </div>
  );
}

export default DetailPage;
