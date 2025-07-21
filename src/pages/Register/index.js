import './Register.module.css';
import style from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/sobrenatural.jpg'


function Register() {

    const navigate = useNavigate(); 
    
      const handleRegister = (e) => {
        e.preventDefault(); 
        // lógica de registro aqui
        navigate('/Home');
      };

    return (
      <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
    <div className={style.Register}>
      <div className={style['register-container']}>
        <form className={style['register-form']} onSubmit={handleRegister}>
          <h1>Faça sua conta!</h1>

          <input type="email" placeholder="Email@" />
          <input type="text" placeholder="Nome" />
          <input type="senha" placeholder="Senha" />

          <button type="submit">Registrar</button>

        </form>
      </div>
    </div>
   </div>
    )
}

export default Register;
