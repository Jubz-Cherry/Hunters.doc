import { usePreferences } from '../../preferences';
import { localizeRecord } from '../../localizedRecords';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import style from './monsterDetails.module.css';

const asList = (value) => Array.isArray(value) ? value : value ? [value] : [];

function MonsterDetails() {
  const { t, language } = usePreferences();
  const { name } = useParams();
  const navigate = useNavigate();
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/monsters')
      .then((res) => setMonsters(res.data))
      .catch(() => setError(t('Não foi possível abrir este registro.', 'Could not open this record.')))
      .finally(() => setLoading(false));
  }, [t]);

  const monster = useMemo(() => {
    const found = monsters.find((item) => item.name.toLowerCase() === decodeURIComponent(name).toLowerCase());
    return found && localizeRecord(found, language, 'monster');
  }, [monsters, name, language]);
  const currentIndex = monsters.findIndex((item) => monster && item.name === monster.name);
  const changeMonster = (offset) => {
    const next = monsters[currentIndex + offset];
    if (next) navigate(`/monsters/${encodeURIComponent(next.name)}`);
  };

  if (loading) return <main className={style.status}>{t("Abrindo arquivo do bestiário...", "Opening bestiary record...")}</main>;
  if (error || !monster) return <main className={style.status}>{error || t('Criatura não encontrada.', 'Creature not found.')}</main>;

  const description = asList(monster.description);
  const appearance = asList(monster.custom || monster.appearance);
  const reports = asList(monster.reports || description.slice(2));
  const details = [
    ['◉', t('ORIGEM', 'ORIGIN'), monster.origin],
    ['✦', t('COMPORTAMENTO', 'BEHAVIOR'), asList(monster.behavior).join(' ')],
    ['◈', t('TRANSFORMAÇÃO', 'TRANSFORMATION'), asList(monster.transformation).join(' ')],
    ['☼', t('FRAQUEZAS', 'WEAKNESSES'), asList(monster.weaknesses).join(', ')]
  ];

  return (
    <main className={style.page}>
      <header className={style.topbar}>
        <button className={style.menuButton} type="button" onClick={() => navigate('/home')} aria-label={t("Voltar para criaturas", "Back to creatures")}>☰</button>
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>{t("Meu Perfil", "My Profile")}</span></button>
      </header>
      <div className={style.layout}>
        <aside className={style.sidebar}>
          <p className={style.sidebarTitle}>{t("BESTIÁRIO", "BESTIARY")}</p>
          <div className={style.monsterList}>
            {monsters.map((item) => (
              <button key={item.name} className={`${style.monsterThumb} ${item.name === monster.name ? style.active : ''}`} style={{ backgroundImage: `url(${item.image})` }} type="button" onClick={() => navigate(`/monsters/${encodeURIComponent(item.name)}`)}>
                <span>{localizeRecord(item, language, 'monster').displayName || item.name}</span>
              </button>
            ))}
          </div>
        </aside>
        <article className={style.dossier}>
          <div className={style.heroImage} style={{ backgroundImage: `url(${monster.banner})` }} />
          <div className={style.heroShade} />
          <div className={style.mainContent}>
            <p className={style.breadcrumb}>{t("CRIATURAS", "CREATURES")} <span>›</span> <b>{monster.displayName || monster.name}</b></p>
            <h1>{monster.displayName || monster.name}</h1>
            <p className={style.classification}>{t("✦ REGISTRO SOBRENATURAL ✦", "✦ SUPERNATURAL RECORD ✦")}</p>
            <div className={style.leadText}>{description.slice(0, 2).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <section className={style.attributeGrid}>
              {details.map(([icon, label, text]) => <div className={style.attribute} key={label}><span>{icon}</span><h2>{label}</h2><p>{text}</p></div>)}
            </section>
            <section className={style.notes}>
              <div className={style.note}><h2>{t("❝ APARÊNCIA", "❝ APPEARANCE")}</h2><p>{appearance.join(' ')}</p></div>
              {reports.length > 0 && <div className={style.note}><h2>{t("▣ RELATOS", "▣ REPORTS")}</h2><p>{reports.join(' ')}</p></div>}
              {asList(monster.cure).length > 0 && <div className={style.note}><h2>{t("✧ CURA / CONTENÇÃO", "✧ CURE / CONTAINMENT")}</h2><p>{asList(monster.cure).join(' ')}</p></div>}
            </section>
          </div>
          <nav className={style.pagination} aria-label={t("Navegação entre criaturas", "Navigate creatures")}>
            <button type="button" onClick={() => changeMonster(-1)} disabled={currentIndex <= 0}>{t("‹ Anterior", "‹ Previous")}</button>
            <button type="button" onClick={() => changeMonster(1)} disabled={currentIndex >= monsters.length - 1}>{t("Próximo ›", "Next ›")}</button>
          </nav>
        </article>
      </div>
    </main>
  );
}

export default MonsterDetails;
