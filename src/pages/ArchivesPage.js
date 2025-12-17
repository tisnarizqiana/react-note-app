import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import LocaleContext from "../contexts/LocaleContext";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";

function ArchivesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getArchivedNotes();
      if (data) {
        setNotes(data);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const onKeywordChange = (keyword) => {
    setSearchParams({ keyword });
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  // Handler Batal Arsip (Pindahkan kembali ke aktif)
  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="layout-halaman">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>

      <div className="kotak-pencarian">
        <input
          type="text"
          placeholder={
            locale === "id" ? "Cari di arsip..." : "Search archives..."
          }
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="pesan-kosong">Loading...</p>
      ) : filteredNotes.length > 0 ? (
        <div className="grid-container">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              konten={note}
              onDelete={onDeleteHandler}
              onArchive={onUnarchiveHandler} // Kirim ke prop onArchive tapi fungsinya unarchive
            />
          ))}
        </div>
      ) : (
        <p className="pesan-kosong">
          {locale === "id" ? "Arsip kosong" : "No archived notes"}
        </p>
      )}
    </div>
  );
}

export default ArchivesPage;
