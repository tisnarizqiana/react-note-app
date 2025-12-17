import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import LocaleContext from "../contexts/LocaleContext"; // Import Context Bahasa
import { getActiveNotes, deleteNote, archiveNote } from "../utils/network-data"; // Import API

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk Loading
  const { locale } = useContext(LocaleContext); // Ambil bahasa aktif

  const keyword = searchParams.get("keyword") || "";

  // 1. Ambil data dari API saat halaman dibuka
  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      if (data) {
        setNotes(data);
      }
      setLoading(false); // Matikan loading setelah data didapat
    }
    fetchNotes();
  }, []);

  const onKeywordChange = (keyword) => {
    setSearchParams({ keyword });
  };

  // 2. Handler Hapus (Panggil API -> Update State Lokal)
  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    // Update tampilan tanpa reload: buang note yang id-nya dihapus
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  // 3. Handler Arsip (Panggil API -> Update State Lokal)
  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  // Filter berdasarkan search keyword
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="layout-halaman">
      {/* Judul berubah sesuai bahasa (Kriteria Opsional 2) */}
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>

      <div className="kotak-pencarian">
        <input
          type="text"
          placeholder={locale === "id" ? "Cari catatan..." : "Search notes..."}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      {/* Indikator Loading (Kriteria Opsional 1) */}
      {loading ? (
        <p className="pesan-kosong">Loading...</p>
      ) : filteredNotes.length > 0 ? (
        <div className="grid-container">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              konten={note}
              onDelete={onDeleteHandler}
              onArchive={onArchiveHandler}
            />
          ))}
        </div>
      ) : (
        <p className="pesan-kosong">
          {locale === "id" ? "Tidak ada catatan" : "No notes found"}
        </p>
      )}
    </div>
  );
}

export default HomePage;
