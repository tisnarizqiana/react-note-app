import React from "react";
import { Link } from "react-router-dom";

export default function Archive({ notes, setNotes }) {
  const handleUnarchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: false } : note
      )
    );
  };

  return (
    <div className="page-container">
      <h2>Catatan Arsip</h2>
      <div className="notes-grid">
        {notes.filter((note) => note.archived).length === 0 && (
          <p>Tidak ada catatan dalam arsip.</p>
        )}
        {notes
          .filter((note) => note.archived)
          .map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.body}</p>
              <small>{new Date(note.createdAt).toLocaleString()}</small>
              <br />
              <Link className="btn" to={`/detail/${note.id}`}>
                Detail
              </Link>
              <button
                className="btn"
                style={{ background: "#27ae60", marginLeft: "5px" }}
                onClick={() => handleUnarchive(note.id)}
              >
                Kembalikan
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
