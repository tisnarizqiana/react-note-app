import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";
import { getUserLogged, putAccessToken } from "./utils/network-data";

// Import Halaman
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import AddNotePage from "./pages/AddNotePage";
import ArchivesPage from "./pages/ArchivesPage";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";

// Import CSS
import "./styles/style.css";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");

  // Inisialisasi Data User
  useEffect(() => {
    async function init() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    init();
  }, []);

  // Update Tema di HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      },
    };
  }, [theme]);

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale: () => {
        const newLocale = locale === "id" ? "en" : "id";
        setLocale(newLocale);
        localStorage.setItem("locale", newLocale);
      },
    };
  }, [locale]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return (
      <div
        className="app-container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        Loading...
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          {authedUser === null ? (
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          ) : (
            <>
              {/* HEADER PROFESIONAL */}
              <header className="app-header">
                <div className="header-content">
                  {/* BRAND / LOGO */}
                  <h1>✨ Note App</h1>

                  <nav className="app-nav">
                    {/* MENU UTAMA */}
                    <div className="nav-group-main">
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                      <Link to="/arsip" className="nav-link">
                        Arsip
                      </Link>
                      <Link to="/catatan/baru" className="nav-link-cta">
                        Buat +
                      </Link>
                    </div>

                    {/* PEMBATAS VERTIKAL */}
                    <div className="nav-divider"></div>

                    {/* SETTINGS (BAHASA & TEMA) */}
                    <div className="nav-group-settings">
                      <button
                        className="toggle-locale"
                        onClick={localeContextValue.toggleLocale}
                        title="Ganti Bahasa"
                      >
                        {locale === "id" ? "EN" : "ID"}
                      </button>
                      <button
                        className="toggle-theme"
                        onClick={themeContextValue.toggleTheme}
                        title="Ganti Tema"
                      >
                        {theme === "light" ? "🌙" : "☀️"}
                      </button>
                    </div>

                    {/* USER PROFILE CHIP (PROFESIONAL) */}
                    <div className="profile-chip">
                      <div className="profile-icon">
                        {/* Avatar Huruf Depan */}
                        {authedUser.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="profile-name">{authedUser.name}</span>
                      <button
                        className="btn-logout-icon"
                        onClick={onLogout}
                        title="Keluar"
                      >
                        {/* Ikon Logout Pintu */}
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
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </nav>
                </div>
              </header>

              <main className="app-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/arsip" element={<ArchivesPage />} />
                  <Route path="/catatan/baru" element={<AddNotePage />} />
                  <Route path="/notes/:id" element={<DetailPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </>
          )}
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
