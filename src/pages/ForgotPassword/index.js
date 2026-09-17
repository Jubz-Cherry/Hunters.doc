import style from './Forgotpass.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backgroundImg from '../../img/sobrenatural.jpg';
import API from '../../services/API';
import { usePreferences } from '../../preferences';

function Forgotpass() {
    const { t } = usePreferences();

    const [form, setForm] = useState({
        email: ''
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError(null);
    }

    async function handleForgotPassword(e) {
        e.preventDefault();

        try {

            const response = await API.post(
                "/profile/forgot-password",
                form
            );

            alert(response.data.message);

            navigate("/VerifyCode", {
                state: {
                    email: form.email
                }
            });

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.error ||
                t("Erro ao confirmar o e-mail.", "Could not confirm the email.")
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
                        onSubmit={handleForgotPassword}
                    >

                        <h1>{t("Coloque seu e-mail!", "Enter your email!")}</h1>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email@"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        {error && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                {error}
                            </p>
                        )}

                        <button type="submit">
                            {t("Confirmar e-mail", "Confirm email")}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Forgotpass;
