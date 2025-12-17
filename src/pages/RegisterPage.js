import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const navigate = useNavigate();

  const onRegisterHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }

    const { error } = await register({ name, email, password });

    if (!error) {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/");
    }
  };

  return (
    <section className="auth-page">
      {/* Brand Header */}
      <div className="auth-header">
        <h1>✨ Note App</h1>
        <p>Buat akun baru dan mulai mencatat.</p>
      </div>

      <form onSubmit={onRegisterHandler} className="auth-form">
        <div className="input-group">
          <label htmlFor="name">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onNameChange}
            placeholder="Contoh: Budi Santoso"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            placeholder="nama@email.com"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Minimal 6 karakter"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Ulangi password"
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn-submit">
          Daftar Sekarang
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Sudah punya akun? <Link to="/">Login di sini</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
