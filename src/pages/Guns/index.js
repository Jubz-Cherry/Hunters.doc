import { usePreferences } from '../../preferences';
import { localizeRecord } from '../../localizedRecords';
import style from './Guns.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import backgroundImg from '../../img/estrada.jpg';

function Guns() {
  const { t, language } = usePreferences();
  const [searchTerm, setSearchTerm] = useState('');
  const [guns, setGuns] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/guns')
      .then((res) => setGuns(res.data))
      .catch(() => setError(t('Não foi possível carregar o arsenal. Tente novamente em alguns instantes.', 'Could not load the arsenal. Please try again later.')));
  }, [t]);

  const filteredGuns = useMemo(
    () => guns.map((gun) => localizeRecord(gun, language, 'gun')).filter((gun) => (gun.name + ' ' + (gun.displayName || '')).toLowerCase().includes(searchTerm.toLowerCase())),
    [guns, searchTerm, language]
  );

  const getExcerpt = (gun) => {
    const text = Array.isArray(gun.description) ? gun.description[0] : gun.description;
    return text || t('Conheça os registros desta arma.', 'Explore this weapon record.');
  };

  return (
    <main className={style.page} style={{ '--page-background': `url(${backgroundImg})` }}>
      <header className={style.topbar}>
        <button className={style.menuButton} type="button" onClick={() => navigate('/home')} aria-label={t("Voltar para criaturas", "Back to creatures")}>☰</button>
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <label className={style.searchBox}>
          <span>⌕</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t("Pesquisar arma...", "Search weapons...")} aria-label={t("Pesquisar arma", "Search weapons")} />
        </label>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>{t("Meu Perfil", "My Profile")}</span></button>
      </header>

      <section className={style.content}>
        <p className={style.eyebrow}>{t("EQUIPAMENTO DE CAÇADOR", "HUNTER EQUIPMENT")}</p>
        <h1>{t("Arsenal", "Arsenal")}</h1>
        <p className={style.intro}>{t("Ferramentas para enfrentar o que espreita nas sombras.", "Tools to face what lurks in the shadows.")}</p>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.cardsGrid}>
          {filteredGuns.map((gun) => (
            <article key={gun.name} className={style.gunCard} onClick={() => navigate(`/guns/${encodeURIComponent(gun.name)}`)} onKeyDown={(event) => event.key === 'Enter' && navigate(`/guns/${encodeURIComponent(gun.name)}`)} tabIndex="0" role="button">
              <img src={gun.image} alt="" />
              <div className={style.cardShade} />
              <div className={style.cardContent}>
                <h2>{gun.displayName || gun.name}</h2>
                <p>{getExcerpt(gun)}</p>
                <div className={style.cardFooter}><span>{t("Ver detalhes", "View details")}</span><i aria-hidden="true">›</i></div>
              </div>
            </article>
          ))}
        </div>
        {!error && guns.length > 0 && filteredGuns.length === 0 && <p className={style.empty}>{t("Nenhuma arma encontrada.", "No weapons found.")}</p>}
      </section>
    </main>
  );
}

export default Guns;
