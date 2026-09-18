import { usePreferences } from '../../preferences';
import React, { useState } from "react";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../img/sobrenatural.jpg";
import API from "../../services/API";

function Register() {
  const { t, language } = usePreferences();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    senha: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await API.post("/register", form);
      alert(language === 'en' ? 'Account created successfully.' : response.data.message);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.error
        ? (language === 'en' && error.response.status === 400
          ? 'Check the fields: the password must have at least 6 characters and the email must be unused.'
          : error.response.data.error)
        : t('Não foi possível conectar à API. Tente novamente.', 'Could not connect to the API. Please try again.'));
      console.error(error);
    }
  }

  return (
    <div
      className={style.background}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className={style.Register}>
        <div className={style["register-container"]}>
          <form className={style["register-form"]} onSubmit={handleRegister}>
            <h1>{t("Faça sua conta!", "Create your account!")}</h1>

            <input
              type="email"
              name="email"
              placeholder="Email@"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder={t("Nome", "Name")}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder={t("Senha", "Password")}
              value={form.senha}
              onChange={handleChange}
              minLength={6}
              required
            />

            {errorMessage && <p role="alert" style={{ color: '#f29b8f' }}>{errorMessage}</p>}
            <button type="submit">{t("Registrar", "Sign up")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
