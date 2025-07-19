import style from './Login.module.css';
import React, { useState } from 'react';

function Login() {

  const [showPassword, setPassword] = useState('false');
  return (
    <div className={style.login}>
      <div className={style['login-container']}>

        <form className={style['login-form']}>

          <h1>Faça seu Login!</h1>
          <input type="email" placeholder="Email@" />

          <input type={setPassword ? 'text' : 'password'} placeholder="Senha" />
          <button type="button" onClick={() => setPassword(!showPassword)}>
        {showPassword ? 'Ocultar' : 'Mostrar'} Senha
      </button>

          <button href="/home">Entrar</button>

           <p>
          Não tem conta? Se <a href="/register">Registre!</a>
        </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
