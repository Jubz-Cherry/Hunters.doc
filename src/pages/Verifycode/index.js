import style from '../Verifycode/Verifycode.module.css';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API';
import { usePreferences } from '../../preferences';

function VerifyCode() {
    const { t } = usePreferences();

    const location = useLocation();
    const navigate = useNavigate();

    // Pegamos o e-mail que veio da tela ForgotPassword
    const email = location.state?.email;

    const [resetToken, setResetToken] = useState('');
    const [error, setError] = useState(null);

    async function handleVerifyCode(e) {

        e.preventDefault();

        if (!email) {
            setError(t("E-mail não encontrado.", "Email not found."));
            return;
        }

        if (!resetToken) {
            setError(t("Digite o código recebido por e-mail.", "Enter the code sent by email."));
            return;
        }

        try {

            await API.post(
                "/profile/verify-code",
                {
                    email: email,
                    resetToken: resetToken
                }
            );

            // Código válido.
            // Mandamos o código e o e-mail para a próxima tela.
            navigate("/ResetPassword", {
                state: {
                    email: email,
                    token: resetToken
                }
            });

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.error ||
                t("Código inválido ou expirado.", "Invalid or expired code.")
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
                        onSubmit={handleVerifyCode}
                    >

                        <h1>{t("Verifique seu e-mail", "Check your email")}</h1>

                        <p>
                            {t("Digite o código de 6 dígitos enviado para seu e-mail.", "Enter the six-digit code sent to your email.")}
                        </p>

                        <input
                            type="text"
                            placeholder={t("Código de recuperação", "Recovery code")}
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            maxLength={6}
                            inputMode="numeric"
                            pattern="[0-9]{6}"
                            required
                        />

                        {error && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                {error}
                            </p>
                        )}

                        <button type="submit">
                            {t("Verificar código", "Verify code")}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default VerifyCode;
