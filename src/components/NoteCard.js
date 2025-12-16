import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/date";

function NoteCard({ konten, onDelete, onArchive }) {
  return (
    <article className="kartu-item">
      <div className="kartu-konten">
        <h3 className="kartu-judul">{konten.title}</h3>
        <span className="kartu-tanggal">
          {showFormattedDate(konten.createdAt)}
        </span>
        <div className="kartu-body">{konten.body}</div>
      </div>

      <div className="kartu-aksi">
        <button
          className="btn-arsip"
          onClick={() => onArchive(konten.id)}
          title={
            konten.archived ? "Kembalikan dari arsip" : "Arsipkan catatan ini"
          }
        >
          {konten.archived ? "Buka Arsip" : "Arsip"}
        </button>

        <Link
          to={`/notes/${konten.id}`}
          className="link-baca"
          title="Baca selengkapnya"
        >
          Baca
        </Link>

        <button
          className="btn-hapus"
          onClick={() => onDelete(konten.id)}
          title="Hapus Catatan"
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
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
