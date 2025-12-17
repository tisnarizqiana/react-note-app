import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data"; // Import fungsi API

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  // Handler untuk menangkap input dari ContentEditable (Body)
  const onBodyChangeEventHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi sederhana
    if (!title.trim() || !body.trim()) {
      alert("Mohon isi judul dan catatanmu dulu ya!");
      return;
    }

    // 2. Kirim data ke API
    const { error } = await addNote({ title, body });

    // 3. Jika sukses, kembali ke halaman Home
    if (!error) {
      navigate("/");
    }
  };

  return (
    <section className="add-new-page">
      {/* Header Kecil: Tombol Kembali */}
      <div className="add-new-page__header">
        <button
          className="btn-kembali"
          onClick={() => navigate("/")}
          title="Batal dan kembali"
        >
          {/* Ikon Panah Kiri */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

      <form onSubmit={handleSubmit}>
        {/* Input Judul (Besar & Bold) */}
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Judul Catatan..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        {/* Input Body (Rich Text / ContentEditable) */}
        <div
          className="add-new-page__input__body"
          data-placeholder="Tulis ceritamu di sini..."
          contentEditable
          suppressContentEditableWarning={true}
          onInput={onBodyChangeEventHandler}
        />

        {/* Tombol Simpan */}
        <div className="add-new-page__action">
          <button type="submit" title="Simpan Catatan">
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
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Simpan
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddNotePage;
