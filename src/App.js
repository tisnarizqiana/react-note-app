import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HalamanUtama from "./pages/Home";
import HalamanTambah from "./pages/AddNotePage";
import HalamanArsip from "./pages/ArchivesPage";
import HalamanDetail from "./pages/DetailPage";
import HalamanNotFound from "./pages/NotFound";
import "./styles.css";

function App() {
  const [dbCatatan, setDbCatatan] = useState([
    {
      id: "catatan-1",
      title: "Ide Konten TikTok",
      body: "1. Review makanan pedas, 2. Tutorial React JS pemula, 3. A day in my life edisi coding...",
      createdAt: "2023-11-20T04:27:34.572Z",
      archived: false,
    },
    {
      id: "catatan-2",
      title: "List Belanja Bulanan",
      body: "Beras 5kg, Telur 1 tray, Minyak Goreng, Sabun cuci muka, Snack buat begadang coding.",
      createdAt: "2023-11-25T04:27:34.572Z",
      archived: false,
    },
    {
      id: "catatan-3",
      title: "Target Skripsi 2024",
      body: "Bab 1 selesai bulan depan. Revisi proposal harus kelar minggu ini. Semangat!",
      createdAt: "2023-11-28T04:27:34.572Z",
      archived: true,
    },
  ]);

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
