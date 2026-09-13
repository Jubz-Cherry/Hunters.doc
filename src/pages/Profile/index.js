import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import backgroundImg from '../../img/sw.dw.jpg';
import API from '../../services/API';

function Profile() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [profileForm, setProfileForm] = useState({ name: '', email: '' });
    const [profileError, setProfileError] = useState(null);

    const [passwordForm, setPasswordForm] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarNovaSenha: ''
    });
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile');
                setProfileForm({
                    name: res.data.user.name,
                    email: res.data.user.email
                });
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
            }
        };

        const fetchNotes = async () => {
            try {
                const res = await API.get('/notes');
                setNotes(res.data);
            } catch (error) {
                console.error('Erro ao carregar notas:', error);
            }
        };

        fetchProfile();
        fetchNotes();
    }, []);

    const handleProfileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
        setProfileError(null);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.patch('/profile/change', profileForm);

            setProfileForm({
                name: res.data.user.name,
                email: res.data.user.email
            });

            alert(res.data.message);
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);

            setProfileError(
                error.response?.data?.error || 'Erro ao atualizar perfil.'
            );
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        setPasswordError(null);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordForm.novaSenha !== passwordForm.confirmarNovaSenha) {
            setPasswordError('As senhas não coincidem.');
            return;
        }

        try {
            const res = await API.patch('/profile/password', {
                senhaAtual: passwordForm.senhaAtual,
                novaSenha: passwordForm.novaSenha
            });

            alert(res.data.message);

            setPasswordForm({
                senhaAtual: '',
                novaSenha: '',
                confirmarNovaSenha: ''
            });
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);

            setPasswordError(
                error.response?.data?.error || 'Erro ao atualizar senha.'
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/notes/makenote', { title, content });

            setNotes([res.data, ...notes]);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Erro ao criar nota:', error);
            alert(error.response?.data?.message || 'Erro ao criar nota.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Erro ao excluir nota:', error);
            alert('Erro ao excluir nota.');
        }
    };

    return (
        <>
            <Menu />
            <Header title="Meu perfil" />
            <div className={styles.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
                <div className={styles.notesContainer}>

                    <h2 className={styles.sectionTitle}>Meus dados</h2>
                    <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            required
                        />
                        {profileError && <p className={styles.errorText}>{profileError}</p>}
                        <button type="submit" className={styles.saveButton}>
                            Salvar dados
                        </button>
                    </form>

                    <h2 className={styles.sectionTitle}>Alterar senha</h2>
                    <form onSubmit={handlePasswordSubmit} className={styles.profileForm}>
                        <input
                            type="password"
                            name="senhaAtual"
                            placeholder="Senha atual"
                            value={passwordForm.senhaAtual}
                            onChange={handlePasswordChange}
                            required
                        />
                        <input
                            type="password"
                            name="novaSenha"
                            placeholder="Nova senha"
                            value={passwordForm.novaSenha}
                            onChange={handlePasswordChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmarNovaSenha"
                            placeholder="Confirme a nova senha"
                            value={passwordForm.confirmarNovaSenha}
                            onChange={handlePasswordChange}
                            required
                        />
                        {passwordError && <p className={styles.errorText}>{passwordError}</p>}
                        <button type="submit" className={styles.saveButton}>
                            Alterar senha
                        </button>
                    </form>

                    <h2 className={styles.sectionTitle}>Minhas anotações</h2>
                    <form onSubmit={handleSubmit} className={styles.noteForm}>
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className={styles.noteTitle}
                        />
                        <textarea
                            placeholder="Escrever nota..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            className={styles.noteContent}
                        />
                        <button type="submit" className={styles.saveButton}>
                            Salvar
                        </button>
                    </form>

                    <div className={styles.cardsWrapper}>
                        {notes.map(note => (
                            <div key={note._id} className={styles.noteCard}>
                                <div className={styles.cardInfo}>
                                    <h3>{note.titulo}</h3>
                                    <p>{note.conteudo}</p>
                                </div>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(note._id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
