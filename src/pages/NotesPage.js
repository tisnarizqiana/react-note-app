import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function NotesPage({ notes, addNote, deleteNote, toggleArchive }) {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newTitle && newBody) {
      const newNote = {
        id: Date.now().toString(),
        title: newTitle,
        createdAt: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        body: newBody,
        archived: false,
      };
      addNote(newNote);
      setNewTitle("");
      setNewBody("");
    }
  };

  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <div>
      <div className="note-form">
        <h2>Tambah Catatan Baru</h2>
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            placeholder="Judul catatan..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Isi catatan..."
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          ></textarea>
          <button className="save-btn" type="submit">
            ✔ Simpan
          </button>
        </form>
      </div>

      <h2>Catatan Aktif</h2>
      <div className="notes-list">
        {activeNotes.length === 0 ? (
          <p className="empty-msg">Tidak ada catatan aktif.</p>
        ) : (
          activeNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              toggleArchive={toggleArchive}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotesPage;
