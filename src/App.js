import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HalamanUtama from "./pages/Home";
import HalamanTambah from "./pages/AddNotePage";
import HalamanArsip from "./pages/ArchivesPage";
import HalamanDetail from "./pages/DetailPage";
import HalamanNotFound from "./pages/NotFound";
import { getAllNotes } from "./utils/local-data"; // IMPOR DATA DARI SINI
import "./styles.css";

function App() {
  // Gunakan getAllNotes() untuk inisialisasi state
  // Ini memenuhi syarat: "menampilkan seluruh daftar catatan yang telah kami sediakan"
  const [dbCatatan, setDbCatatan] = useState(getAllNotes());

  const onTambahHandler = ({ title, body }) => {
    setDbCatatan((dataLama) => [
      ...dataLama,
      {
        id: `notes-${+new Date()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      },
    ]);
  };

  const onHapusHandler = (id) => {
    const sisaData = dbCatatan.filter((item) => item.id !== id);
    setDbCatatan(sisaData);
  };

  const onArsipHandler = (id) => {
    const dataUpdate = dbCatatan.map((item) =>
      item.id === id ? { ...item, archived: !item.archived } : item
    );
    setDbCatatan(dataUpdate);
  };

  return (
    // Pastikan basename sesuai dengan repository kamu jika deploy ke GitHub Pages
    // Contoh: <BrowserRouter basename="/submission-react">
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>✨ Note App</h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/arsip" className="nav-link">
                Arsip
              </Link>
              <Link to="/catatan/baru" className="nav-link-cta">
                Buat +
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <HalamanUtama
                  sumberData={dbCatatan}
                  onDelete={onHapusHandler}
                  onArchive={onArsipHandler}
                />
              }
            />
            <Route
              path="/catatan/baru"
              element={<HalamanTambah onAdd={onTambahHandler} />}
            />
            <Route
              path="/arsip"
              element={
                <HalamanArsip
                  sumberData={dbCatatan}
                  onDelete={onHapusHandler}
                  onArchive={onArsipHandler}
                />
              }
            />
            <Route
              path="/notes/:id"
              element={<HalamanDetail semuaData={dbCatatan} />}
            />
            <Route path="*" element={<HalamanNotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
