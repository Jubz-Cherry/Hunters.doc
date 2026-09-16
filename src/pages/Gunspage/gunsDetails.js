import styles from './Gunspage.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/API';
import Menu from '../../components/Menu';

const asList = (value) => Array.isArray(value) ? value : value ? [value] : [];

function GunsDetails(){
  const { name } = useParams();
  const navigate = useNavigate();
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/guns')
      .then((res) => setGuns(res.data))
      .catch(() => setError('Não foi possível abrir este registro.'))
      .finally(() => setLoading(false));
  }, []);

  const gun = useMemo(() => guns.find((item) => item.name.toLowerCase() === decodeURIComponent(name).toLowerCase()), [guns, name]);
  const currentIndex = guns.findIndex((item) => gun && item.name === gun.name);
  const changeGun = (offset) => {
    const next = guns[currentIndex + offset];
    if (next) navigate(`/guns/${encodeURIComponent(next.name)}`);
  };

  if (loading) return <main className={styles.status}>Abrindo arquivo do arsenal...</main>;
  if (error || !gun) return <main className={styles.status}>{error || 'Arma não encontrada.'}</main>;

  const description = asList(gun.description);
  const details = [
    ['◉', 'ORIGEM', asList(gun.origin).join(' ')],
    ['✦', 'USO', asList(gun.usage).join(' ')],
    ['◈', 'FRAQUEZAS', asList(gun.weaknesses).join(', ')],
    ['☼', 'TIPO', gun.name]
  ];

    return(
        <main className={styles.page}>
          <header className={styles.topbar}>
            <Menu inline buttonClassName={styles.menuButton} />
            <button className={styles.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
            <button className={styles.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>Meu Perfil</span></button>
          </header>
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <p className={styles.sidebarTitle}>ARSENAL</p>
              <div className={styles.gunList}>
                {guns.map((item) => (
                  <button key={item.name} className={`${styles.gunThumb} ${item.name === gun.name ? styles.active : ''}`} style={{ backgroundImage: `url(${item.image})` }} type="button" onClick={() => navigate(`/guns/${encodeURIComponent(item.name)}`)}>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </aside>
            <article className={styles.dossier}>
              <div className={styles.heroImage} style={{ backgroundImage: `url(${gun.banner || gun.image})` }} />
              <div className={styles.heroShade} />
              <div className={styles.mainContent}>
                <p className={styles.breadcrumb}>ARSENAL <span>›</span> <b>{gun.name}</b></p>
                <h1>{gun.name}</h1>
                <p className={styles.classification}>✦ EQUIPAMENTO SOBRENATURAL ✦</p>
                <div className={styles.leadText}>{description.slice(0, 2).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
                <section className={styles.attributeGrid}>
                  {details.map(([icon, label, text]) => <div className={styles.attribute} key={label}><span>{icon}</span><h2>{label}</h2><p>{text}</p></div>)}
                </section>
                <section className={styles.notes}>
                  <div className={styles.note}><h2>❝ APARÊNCIA</h2><p>{asList(gun.custom).join(' ')}</p></div>
                  {description.slice(2).length > 0 && <div className={styles.note}><h2>▣ RELATOS</h2><p>{description.slice(2).join(' ')}</p></div>}
                </section>
              </div>
              <nav className={styles.pagination} aria-label="Navegação entre armas">
                <button type="button" onClick={() => changeGun(-1)} disabled={currentIndex <= 0}>‹ Anterior</button>
                <button type="button" onClick={() => changeGun(1)} disabled={currentIndex >= guns.length - 1}>Próxima ›</button>
              </nav>
            </article>
          </div>
        </main>
    );
}

export default GunsDetails;