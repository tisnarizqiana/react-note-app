import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function Home({ sumberData, onDelete, onArchive }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const onKeywordChange = (keyword) => {
    setSearchParams({ keyword });
  };

  const filteredNotes = sumberData.filter((note) => {
    const matchTitle = note.title.toLowerCase().includes(keyword.toLowerCase());
    return !note.archived && matchTitle;
  });

  return (
    <div className="layout-halaman">
      <h2>Catatan Aktif</h2>

      <div className="kotak-pencarian">
        <input
          type="text"
          placeholder="Cari catatan berdasarkan judul..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      {filteredNotes.length > 0 ? (
        <div className="grid-container">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              konten={note}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ))}
        </div>
      ) : (
        <p className="pesan-kosong">Tidak ada catatan aktif.</p>
      )}
    </div>
  );
}

export default Home;
