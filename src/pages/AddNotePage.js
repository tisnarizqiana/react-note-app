import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNotePage({ onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const onBodyChangeEventHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim() || body === "<br>") {
      alert("Mohon isi judul dan catatan terlebih dahulu.");
      return;
    }

    const newNote = {
      id: +new Date(),
      title: title,
      body: body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    if (onAdd) {
      onAdd(newNote);
    }

    navigate("/");
  };

  return (
    <div className="add-new-page">
      <div className="add-new-page__header">
        <button
          className="btn-kembali"
          onClick={() => navigate("/")}
          title="Batal dan kembali"
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

      <form onSubmit={handleSubmit} className="add-new-page__form">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Judul Catatan..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <div
          className="add-new-page__input__body"
          data-placeholder="Tulis ceritamu di sini..."
          contentEditable
          suppressContentEditableWarning={true}
          onInput={onBodyChangeEventHandler}
        />

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
    </div>
  );
}

export default AddNotePage;
