import React from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login, putAccessToken } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onLoginHandler = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });

    if (!error) {
      putAccessToken(data.accessToken);
      loginSuccess(data);
    }
  };

  return (
    <section className="auth-page">
      {/* Brand Header */}
      <div className="auth-header">
        <h1>✨ Note App</h1>
        <p>Selamat datang kembali! Silakan login.</p>
      </div>

      <form onSubmit={onLoginHandler} className="auth-form">
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
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn-submit">
          Masuk
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
