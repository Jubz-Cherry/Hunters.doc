import style from './Login.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/Ceu-estrela.jpg';




function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    // lógica de login aqui
    navigate('/Home');
  };

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

          <input type="email" placeholder="Email@" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Senha" />

          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Ocultar' : 'Mostrar'} Senha
          </button>

          <button type="submit">Entrar</button>

          <p>
            Não tem conta? <Link onClick={goToRegister}>Registre!</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
