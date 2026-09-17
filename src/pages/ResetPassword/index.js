import style from '../Login/Login.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API';
import { usePreferences } from '../../preferences';


function ResetPassword() {
    const { t } = usePreferences();

    const location = useLocation();
    const navigate = useNavigate();

    const token = location.state?.token;

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState(null);

    async function handleResetPassword(e) {

        e.preventDefault();

        if (!token) {
            setError(t("Token de recuperação não encontrado.", "Recovery token not found."));
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setError(t("As senhas não coincidem.", "Passwords do not match."));
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
                t("Erro ao redefinir a senha.", "Could not reset password.")
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

                        <h1>{t("Crie uma nova senha", "Create a new password")}</h1>

                        <input
                            type="password"
                            placeholder={t("Nova senha", "New password")}
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder={t("Confirme sua nova senha", "Confirm your new password")}
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
                            {t("Alterar senha", "Change password")}
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default ResetPassword;
