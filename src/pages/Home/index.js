import { usePreferences } from '../../preferences';
import { localizeRecord } from '../../localizedRecords';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import style from './Home.module.css';
import backgroundImg from '../../img/estrada.jpg';
import Menu from '../../components/Menu';

function Home() {
  const { t, language } = usePreferences();
  const [searchTerm, setSearchTerm] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/monsters')
      .then((res) => setMonsters(res.data))
      .catch(() => setError(t('Não foi possível carregar o bestiário. Tente novamente em alguns instantes.', 'Could not load the bestiary. Please try again later.')));
  }, [t]);

  const filteredMonsters = useMemo(
    () => monsters.map((monster) => localizeRecord(monster, language, 'monster')).filter((monster) => (monster.name + ' ' + (monster.displayName || '')).toLowerCase().includes(searchTerm.toLowerCase())),
    [monsters, searchTerm, language]
  );

  const getExcerpt = (monster) => {
    const text = Array.isArray(monster.description) ? monster.description[0] : monster.description;
    return text || t('Conheça os registros desta criatura.', 'Explore this creature record.');
  };

  return (
    <main className={style.page} style={{ '--page-background': `url(${backgroundImg})` }}>
      <header className={style.topbar}>
        <Menu inline buttonClassName={style.menuButton} />
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <label className={style.searchBox}>
          <span>⌕</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t("Pesquisar criatura...", "Search creatures...")} aria-label={t("Pesquisar criatura", "Search creatures")} />
        </label>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>{t("Meu Perfil", "My Profile")}</span></button>
      </header>

      <section className={style.content}>
        <p className={style.eyebrow}>{t("CONHEÇA O SOBRENATURAL", "DISCOVER THE SUPERNATURAL")}</p>
        <h1>{t("Criaturas", "Creatures")}</h1>
        <p className={style.intro}>{t("Explore os seres que habitam as sombras.", "Explore the beings that live in the shadows.")}</p>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.cardsGrid}>
          {filteredMonsters.map((monster) => (
            <article key={monster.name} className={style.monsterCard} onClick={() => navigate(`/monsters/${encodeURIComponent(monster.name)}`)} onKeyDown={(event) => event.key === 'Enter' && navigate(`/monsters/${encodeURIComponent(monster.name)}`)} tabIndex="0" role="button">
              <img src={monster.image} alt="" />
              <div className={style.cardShade} />
              <div className={style.cardContent}>
                <h2>{monster.displayName || monster.name}</h2>
                <p>{getExcerpt(monster)}</p>
                <div className={style.cardFooter}><span>{t("Ver detalhes", "View details")}</span><i aria-hidden="true">›</i></div>
              </div>
            </article>
          ))}
        </div>
        {!error && monsters.length > 0 && filteredMonsters.length === 0 && <p className={style.empty}>{t("Nenhuma criatura encontrada.", "No creatures found.")}</p>}
      </section>
    </main>
  );
}

export default Home;
