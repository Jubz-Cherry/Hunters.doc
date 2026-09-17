import { usePreferences } from '../../preferences';
import style from './Login.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API'; 


function Login() {
  const { t, language } = usePreferences();
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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(language === 'en' ? 'Logged in successfully.' : response.data.message);
      navigate("/Home");
    } catch (error) {
      setError(t("Erro ao entrar.", "Could not log in."));
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
          <h1>{t("Faça seu Login!", "Log in!")}</h1>

        <input type="email" name="email" placeholder="Email@" value={form.email} onChange={handleChange} required/>
        <input type={showPassword ? 'text' : 'password'} name="senha" placeholder={t("Senha", "Password")} value={form.senha} onChange={handleChange} required />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? t('Ocultar senha', 'Hide password') : t('Mostrar senha', 'Show password')}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <button type="submit">{t("Entrar", "Log in")}</button>
            <p>
              {t("Não tem conta?", "No account?")} <Link onClick={goToRegister} className={style.Link}>{t("Registre-se!", "Sign up!")}</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
