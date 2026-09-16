import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import style from './monsterDetails.module.css';

const asList = (value) => Array.isArray(value) ? value : value ? [value] : [];

function MonsterDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/monsters')
      .then((res) => setMonsters(res.data))
      .catch(() => setError('Não foi possível abrir este registro.'))
      .finally(() => setLoading(false));
  }, []);

  const monster = useMemo(() => monsters.find((item) => item.name.toLowerCase() === decodeURIComponent(name).toLowerCase()), [monsters, name]);
  const currentIndex = monsters.findIndex((item) => monster && item.name === monster.name);
  const changeMonster = (offset) => {
    const next = monsters[currentIndex + offset];
    if (next) navigate(`/monsters/${encodeURIComponent(next.name)}`);
  };

  if (loading) return <main className={style.status}>Abrindo arquivo do bestiário...</main>;
  if (error || !monster) return <main className={style.status}>{error || 'Criatura não encontrada.'}</main>;

  const description = asList(monster.description);
  const appearance = asList(monster.custom || monster.appearance);
  const reports = asList(monster.reports || description.slice(2));
  const details = [
    ['◉', 'ORIGEM', monster.origin],
    ['✦', 'COMPORTAMENTO', asList(monster.behavior).join(' ')],
    ['◈', 'TRANSFORMAÇÃO', asList(monster.transformation).join(' ')],
    ['☼', 'FRAQUEZAS', asList(monster.weaknesses).join(', ')]
  ];

  return (
    <main className={style.page}>
      <header className={style.topbar}>
        <button className={style.menuButton} type="button" onClick={() => navigate('/home')} aria-label="Voltar para criaturas">☰</button>
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>Meu Perfil</span></button>
      </header>
      <div className={style.layout}>
        <aside className={style.sidebar}>
          <p className={style.sidebarTitle}>BESTIÁRIO</p>
          <div className={style.monsterList}>
            {monsters.map((item) => (
              <button key={item.name} className={`${style.monsterThumb} ${item.name === monster.name ? style.active : ''}`} style={{ backgroundImage: `url(${item.image})` }} type="button" onClick={() => navigate(`/monsters/${encodeURIComponent(item.name)}`)}>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </aside>
        <article className={style.dossier}>
          <div className={style.heroImage} style={{ backgroundImage: `url(${monster.banner})` }} />
          <div className={style.heroShade} />
          <div className={style.mainContent}>
            <p className={style.breadcrumb}>CRIATURAS <span>›</span> <b>{monster.name}</b></p>
            <h1>{monster.name}</h1>
            <p className={style.classification}>✦ REGISTRO SOBRENATURAL ✦</p>
            <div className={style.leadText}>{description.slice(0, 2).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <section className={style.attributeGrid}>
              {details.map(([icon, label, text]) => <div className={style.attribute} key={label}><span>{icon}</span><h2>{label}</h2><p>{text}</p></div>)}
            </section>
            <section className={style.notes}>
              <div className={style.note}><h2>❝ APARÊNCIA</h2><p>{appearance.join(' ')}</p></div>
              {reports.length > 0 && <div className={style.note}><h2>▣ RELATOS</h2><p>{reports.join(' ')}</p></div>}
              {asList(monster.cure).length > 0 && <div className={style.note}><h2>✧ CURA / CONTENÇÃO</h2><p>{asList(monster.cure).join(' ')}</p></div>}
            </section>
          </div>
          <nav className={style.pagination} aria-label="Navegação entre criaturas">
            <button type="button" onClick={() => changeMonster(-1)} disabled={currentIndex <= 0}>‹ Anterior</button>
            <button type="button" onClick={() => changeMonster(1)} disabled={currentIndex >= monsters.length - 1}>Próximo ›</button>
          </nav>
        </article>
      </div>
    </main>
  );
}

export default MonsterDetails;
