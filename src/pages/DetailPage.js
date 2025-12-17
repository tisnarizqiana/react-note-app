import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote } from "../utils/network-data"; // Import API
import { showFormattedDate } from "../utils/date";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data detail saat halaman dibuka
  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);

      if (data) {
        setNote(data);
      }
      // Jika data null (tidak ditemukan), tetap matikan loading
      setLoading(false);
    }

    fetchNote();
  }, [id]);

  // Tampilan jika sedang loading
  if (loading) {
    return (
      <div className="detail-page">
        <p>Loading detail...</p>
      </div>
    );
  }

  // Tampilan jika catatan tidak ditemukan (404 handling)
  if (!note) {
    return (
      <div className="not-found-container">
        <h1>404</h1>
        <p>Catatan tidak ditemukan.</p>
        <button className="btn-kembali" onClick={() => navigate("/")}>
          Kembali ke Home
        </button>
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

      {/* PENTING: Karena body berisi HTML string (dari contentEditable),
         kita menggunakan dangerouslySetInnerHTML agar tag HTML dirender.
         (Alternatif yang lebih aman adalah menggunakan library 'html-react-parser')
      */}
      <div
        className="detail-body"
        dangerouslySetInnerHTML={{ __html: note.body }}
      />
    </div>
  );
}

export default DetailPage;
