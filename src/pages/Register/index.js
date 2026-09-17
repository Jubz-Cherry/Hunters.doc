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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await API.post("/register", form);
      alert(language === 'en' ? 'Account created successfully.' : response.data.message);
      navigate("/Home");
    } catch (error) {
      alert(t("Erro ao registrar usuário", "Could not register user"));
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
            />
            <input
              type="text"
              name="name"
              placeholder={t("Nome", "Name")}
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder={t("Senha", "Password")}
              value={form.senha}
              onChange={handleChange}
            />

            <button type="submit">{t("Registrar", "Sign up")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
