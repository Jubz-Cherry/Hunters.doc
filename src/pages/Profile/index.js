import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/API';
import road from '../../img/sw.dw.jpg';
import styles from './Profile.module.css';
import { usePreferences } from '../../preferences';

const defaultBio = 'Saving people, hunting things, the family business.';

export default function Profile() {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage, t } = usePreferences();
  const [user, setUser] = useState({ name: '', email: '', bio: '' });
  const [draft, setDraft] = useState('');
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', content: '' });
  const [password, setPassword] = useState({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
  const [panel, setPanel] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [font, setFont] = useState(localStorage.getItem('profileFont') || 'serif');

  useEffect(() => {
    API.get('/profile').then(({ data }) => setUser({ name: data.user.name || '', email: data.user.email || '', bio: data.user.bio ?? defaultBio })).catch(() => setError(t('Não foi possível carregar o perfil.', 'Could not load the profile.')));
    API.get('/notes').then(({ data }) => setNotes(data)).catch(() => setError(t('Não foi possível carregar as notas.', 'Could not load notes.')));
  }, [t]);

  const open = (name) => {
    setError('');
    setNotice('');
    if (name === 'username') setDraft(user.name);
    if (name === 'email') setDraft(user.email);
    if (name === 'bio') setDraft(user.bio);
    if (name === 'password') setPassword({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
    setPanel(name);
  };
  const close = () => { if (isDeleting) return; setError(''); setDraft(''); setPanel(''); };
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };
  const changePreference = (key, value, setter) => { localStorage.setItem(key, value); setter(value); };

  async function saveUser(event) {
    event.preventDefault();
    const field = panel === 'username' ? 'name' : panel;
    if (!['name', 'email', 'bio'].includes(field)) return;
    try {
      const { data } = await API.patch('/profile/change', { ...user, [field]: draft.trim() });
      setUser({ name: data.user.name, email: data.user.email, bio: data.user.bio || '' });
      close(); setNotice(t('Alteração salva com sucesso.', 'Change saved successfully.'));
    } catch (err) { setError(language === 'en' ? 'Could not update profile.' : (err.response?.data?.error || 'Erro ao atualizar perfil.')); }
  }
  async function savePassword(event) {
    event.preventDefault();
    if (password.novaSenha !== password.confirmarNovaSenha) { setError(t('As senhas não coincidem.', 'Passwords do not match.')); return; }
    try {
      await API.patch('/profile/password', { senhaAtual: password.senhaAtual, novaSenha: password.novaSenha });
      setPassword({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
      close(); setNotice(t('Senha atualizada com sucesso.', 'Password updated successfully.'));
    } catch (err) { setError(language === 'en' ? 'Could not update password.' : (err.response?.data?.error || 'Erro ao atualizar senha.')); }
  }
  async function saveNote(event) {
    event.preventDefault();
    try {
      const { data } = await API.post('/notes/makenote', note);
      setNotes((current) => [data, ...current]); setNote({ title: '', content: '' }); close();
    } catch (err) { setError(language === 'en' ? 'Could not create note.' : (err.response?.data?.message || 'Erro ao criar nota.')); }
  }
  async function deleteNote(id) {
    if (!window.confirm(t('Excluir esta anotação?', 'Delete this note?'))) return;
    try { await API.delete('/notes/' + id); setNotes((current) => current.filter((item) => item._id !== id)); }
    catch (err) { setError(t('Erro ao excluir nota.', 'Could not delete note.')); }
  }
  async function deleteAccount() {
    setIsDeleting(true);
    try { await API.delete('/profile/delete-profile'); logout(); }
    catch (err) {
      setError(language === 'en' ? 'Could not delete account.' : (err.response?.data?.error || 'Erro ao excluir a conta.'));
      setIsDeleting(false);
    }
  }

  return <main className={[styles.page, theme === 'light' && styles.light, font === 'sans' && styles.sans].filter(Boolean).join(' ')}>
    <header className={styles.topbar}>
      <div className={styles.quick}><Link to="/profile" aria-label="Meu perfil">♙</Link><button onClick={() => open('note')} aria-label="Adicionar nota">＋</button></div>
      <nav className={styles.nav}><Link to="/home">{t('Início', 'Home')}</Link><Link to="/home">{t('Buscar', 'Search')}</Link></nav>
      <div className={styles.accountNav}><button className={styles.logout} onClick={logout}>{t('Sair', 'Log out')}</button><span className={styles.profilePill}>{t('Meu Perfil', 'My Profile')}</span></div>
    </header>

    <section className={styles.hero} style={{ backgroundImage: 'linear-gradient(90deg, rgba(9,8,7,.96), rgba(9,8,7,.82) 40%, rgba(9,8,7,.3)), url(' + road + ')' }}>
      <div className={styles.sigil} aria-hidden="true">✵<span>☆</span></div>
      <div className={styles.heroText}><h1>{user.name || 'Hunter'}</h1><p>{user.bio || t('Escreva sua biografia de caçador...', 'Write your hunter biography...')}</p><button onClick={() => open('bio')}>▤ &nbsp; {t('Editar biografia', 'Edit biography')}</button></div>
    </section>
    {error && !panel && <p className={styles.notice} role="alert">{error}</p>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}

    <div className={styles.columns}>
      <section className={styles.notesColumn}><h2><span>▤</span> {t('Minhas notas', 'My Notes')}</h2><div className={styles.notesBox}>
        <div className={styles.notesList}>{notes.length === 0 && <p className={styles.empty}>{t('Seu diário está vazio. Adicione a primeira nota.', 'Your journal is empty. Add your first note.')}</p>}
          {notes.map((item) => <article className={styles.noteCard} key={item._id}><div className={styles.holes} aria-hidden="true"><i /><i /><i /><i /></div><div><h3>{item.titulo}</h3><p>{item.conteudo}</p></div><button onClick={() => deleteNote(item._id)} aria-label={'Excluir nota ' + item.titulo}>♜</button></article>)}
        </div><button className={styles.addNote} onClick={() => open('note')}>＋ &nbsp; {t('Adicionar nota', 'Add new note')}</button>
      </div></section>
      <section className={styles.settingsColumn}><h2><span>⚙</span> {t('Configurações da conta', 'Account Settings')}</h2><div className={styles.settingsList}>
        <button className={styles.setting} onClick={() => open('username')}><i>♙</i><span><strong>{t('Nome de usuário', 'Username')}</strong><small>{user.name || 'Hunter'}</small></span><b>›</b></button>
        <button className={styles.setting} onClick={() => open('password')}><i>♙</i><span><strong>{t('Senha', 'Password')}</strong><small>••••••••••</small></span><b>›</b></button>
        <button className={styles.setting} onClick={() => open('email')}><i>✉</i><span><strong>Email</strong><small>{user.email || '—'}</small></span><b>›</b></button>
        <button className={styles.setting} onClick={() => open('bio')}><i>✎</i><span><strong>{t('Biografia', 'Biography')}</strong><small>{user.bio || t('Conte sua história', 'Tell your story')}</small></span><b>›</b></button>
      </div></section>
      <div className={styles.rightColumn}><section><h2><span>☆</span> {t('Preferências', 'Preferences')}</h2><div className={styles.preferences}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><i>☼</i><span><strong>{t('Tema', 'Theme')}</strong><small>{theme === 'dark' ? 'Hunter Dark' : 'Hunter Light'}</small></span><b>›</b></button>
        <button onClick={() => changePreference('profileFont', font === 'serif' ? 'sans' : 'serif', setFont)}><i>A</i><span><strong>{t('Fonte', 'Font')}</strong><small>{font === 'serif' ? 'Cinzel' : 'Sans Serif'}</small></span><b>›</b></button>
        <button onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}><i>◎</i><span><strong>{t('Idioma', 'Language')}</strong><small>{language === 'pt' ? 'Português' : 'English'}</small></span><b>›</b></button>
      </div></section><section className={styles.actions}><h2><span>⬡</span> {t('Ações da conta', 'Account Actions')}</h2>
        <button className={styles.action} onClick={() => open('delete')}><i>♜</i><span><strong>{t('Excluir conta', 'Delete Account')}</strong><small>{t('Exclua sua conta permanentemente', 'Permanently delete your account')}</small></span><b>›</b></button>
      </section></div>
    </div>

    {panel && <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className={styles.close} onClick={close} disabled={isDeleting} aria-label="Fechar">×</button>
      {panel === 'username' && <form onSubmit={saveUser}><h2 id="modal-title">{t('Alterar nome de usuário', 'Change username')}</h2><label>{t('Novo nome de usuário', 'New username')}<input value={draft} onChange={(event) => setDraft(event.target.value)} required autoFocus /></label>{error && <p className={styles.formError} role="alert">{error}</p>}<button className={styles.submit}>{t('Salvar nome', 'Save username')}</button></form>}
      {panel === 'email' && <form onSubmit={saveUser}><h2 id="modal-title">{t('Alterar e-mail', 'Change email')}</h2><label>{t('Novo e-mail', 'New email')}<input type="email" value={draft} onChange={(event) => setDraft(event.target.value)} required autoFocus /></label>{error && <p className={styles.formError} role="alert">{error}</p>}<button className={styles.submit}>{t('Salvar e-mail', 'Save email')}</button></form>}
      {panel === 'bio' && <form onSubmit={saveUser}><h2 id="modal-title">{t('Editar biografia', 'Edit biography')}</h2><label>{t('Biografia', 'Biography')}<textarea value={draft} maxLength={280} rows="4" onChange={(event) => setDraft(event.target.value)} placeholder={t('Conte sua história...', 'Tell your story...')} autoFocus /></label>{error && <p className={styles.formError} role="alert">{error}</p>}<button className={styles.submit}>{t('Salvar biografia', 'Save biography')}</button></form>}
      {panel === 'password' && <form onSubmit={savePassword}><h2 id="modal-title">{t('Alterar senha', 'Change password')}</h2><label>{t('Senha atual', 'Current password')}<input type="password" value={password.senhaAtual} onChange={(event) => setPassword({ ...password, senhaAtual: event.target.value })} required /></label><label>{t('Nova senha', 'New password')}<input type="password" value={password.novaSenha} onChange={(event) => setPassword({ ...password, novaSenha: event.target.value })} required /></label><label>{t('Confirme a nova senha', 'Confirm new password')}<input type="password" value={password.confirmarNovaSenha} onChange={(event) => setPassword({ ...password, confirmarNovaSenha: event.target.value })} required /></label>{error && <p className={styles.formError}>{error}</p>}<button className={styles.submit}>{t('Alterar senha', 'Change password')}</button></form>}
      {panel === 'note' && <form onSubmit={saveNote}><h2 id="modal-title">{t('Nova nota', 'New note')}</h2><label>{t('Título', 'Title')}<input value={note.title} onChange={(event) => setNote({ ...note, title: event.target.value })} required /></label><label>{t('Nota', 'Note')}<textarea value={note.content} onChange={(event) => setNote({ ...note, content: event.target.value })} required rows="5" /></label>{error && <p className={styles.formError}>{error}</p>}<button className={styles.submit}>{t('Salvar nota', 'Save note')}</button></form>}
      {panel === 'delete' && <div><h2 id="modal-title">{t('Excluir conta', 'Delete Account')}</h2><p>{t('Tem certeza de que deseja excluir sua conta? Esta ação é permanente e não pode ser desfeita.', 'Are you sure you want to delete your account? This action is permanent and cannot be undone.')}</p>{error && <p className={styles.formError} role="alert">{error}</p>}<div className={styles.modalActions}><button type="button" onClick={close} disabled={isDeleting}>{t('Cancelar', 'Cancel')}</button><button type="button" className={styles.confirmDelete} onClick={deleteAccount} disabled={isDeleting}>{isDeleting ? t('Excluindo...', 'Deleting...') : t('Sim, excluir conta', 'Yes, delete account')}</button></div></div>}
    </div></div>}
  </main>;
}
