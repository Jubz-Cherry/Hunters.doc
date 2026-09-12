import style from '../Login/Login.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API';


function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();

    const token = location.state?.token;

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState(null);

    async function handleResetPassword(e) {

        e.preventDefault();

        if (!token) {
            setError("Token de recuperação não encontrado.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setError("As senhas não coincidem.");
            return;
        }

        try {

            const response = await API.patch(
                "/profile/reset-password",
                {
                    token: token,
                    novaSenha: novaSenha
                }
            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.error ||
                "Erro ao redefinir a senha."
            );
        }
    }

    return (

        <div
            className={style.background}
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >

            <div className={style.login}>

                <div className={style['login-container']}>

                    <form
                        className={style['login-form']}
                        onSubmit={handleResetPassword}
                    >

                        <h1>Crie uma nova senha</h1>

                        <input
                            type="Senha"
                            placeholder="Nova senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            required
                        />

                        <input
                            type="Senha"
                            placeholder="Confirme sua nova senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />

                        {error && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                {error}
                            </p>
                        )}

                        <button type="submit">
                            Alterar senha
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default ResetPassword;