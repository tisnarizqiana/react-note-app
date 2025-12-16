import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Detail({ notes }) {
  const { id } = useParams();
  const note = notes.find((n) => n.id.toString() === id);

  if (!note) {
    return (
      <div className="page-container">
        <h2>Catatan tidak ditemukan</h2>
        <Link className="btn" to="/">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <small>Dibuat: {new Date(note.createdAt).toLocaleString()}</small>
      <br />
      <br />
      <Link className="btn" to="/">
        Kembali
      </Link>
    </div>
  );
}
