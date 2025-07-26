import style from './Login.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API'; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', senha: '' });
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); 
  }

  async function handleLogin(e) {
    e.preventDefault();

      try {
      const response = await API.post("/login", form);
      alert(response.data.message);
      navigate("/Home");
    } catch (error) {
      alert("Erro ao registrar usuário");
      console.error(error);
    }

  }

  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/Register');
  };

  return (
    <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className={style.login}>
        <div className={style['login-container']}>
          <form className={style['login-form']} onSubmit={handleLogin}>
          <h1>Faça seu Login!</h1>

        <input type="email" name="email" placeholder="Email@" value={form.email} onChange={handleChange} required/>
        <input type={showPassword ? 'text' : 'password'} name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Ocultar' : 'Mostrar'} Senha
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <button type="submit">Entrar</button>
            <p>
              Não tem conta? <Link onClick={goToRegister} className={style.Link}>Registre-se!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
