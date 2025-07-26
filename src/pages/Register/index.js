import React, { useState } from "react";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../img/sobrenatural.jpg";
import API from "../../services/API";

function Register() {
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
      alert(response.data.message);
      navigate("/Home");
    } catch (error) {
      alert("Erro ao registrar usuário");
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
            <h1>Faça sua conta!</h1>

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
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
