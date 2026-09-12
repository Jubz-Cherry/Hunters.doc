import style from '../Verifycode/Verifycode.module.css';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API';

function VerifyCode() {

    const location = useLocation();
    const navigate = useNavigate();

    // Pegamos o e-mail que veio da tela ForgotPassword
    const email = location.state?.email;

    const [resetToken, setResetToken] = useState('');
    const [error, setError] = useState(null);

    async function handleVerifyCode(e) {

        e.preventDefault();

        if (!email) {
            setError("E-mail não encontrado.");
            return;
        }

        if (!resetToken) {
            setError("Digite o código recebido por e-mail.");
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
                "Código inválido ou expirado."
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

                        <h1>Verifique seu e-mail</h1>

                        <p>
                            Digite o código de 6 dígitos enviado para seu e-mail.
                        </p>

                        <input
                            type="text"
                            placeholder="Código de recuperação"
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
                            Verificar código
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default VerifyCode;
