import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/API';
import Menu from '../../components/Menu';
import { usePreferences } from '../../preferences';
import { localizeRecord } from '../../localizedRecords';
import styles from './Markspage.module.css';

function MarksDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { t, language } = usePreferences();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/marks')
      .then(({ data }) => setMarks(data))
      .catch(() => setError(t('Não foi possível abrir este registro.', 'Could not open this record.')))
      .finally(() => setLoading(false));
  }, [t]);

  const currentIndex = marks.findIndex((item) => item.name.toLowerCase() === (name || '').toLowerCase());
  const mark = useMemo(() => currentIndex >= 0 ? localizeRecord(marks[currentIndex], language, 'mark') : null, [marks, currentIndex, language]);
  const changeMark = (offset) => {
    const next = marks[currentIndex + offset];
    if (next) navigate('/marks/' + encodeURIComponent(next.name));
  };

  if (loading) return <main className={styles.status}>{t('Abrindo arquivo de marcas...', 'Opening mark record...')}</main>;
  if (error || !mark) return <main className={styles.status}>{error || t('Marca não encontrada.', 'Mark not found.')}</main>;

  const details = [
    ['◉', t('ORIGEM', 'ORIGIN'), mark.origin],
    ['✦', t('PODERES', 'POWERS'), mark.powers_offered],
    ['◈', t('EFEITOS NO PORTADOR', 'EFFECTS ON THE BEARER'), mark.effects_on_person],
    ['☼', t('FRAQUEZA', 'WEAKNESS'), mark.weakness]
  ];
  const artwork = mark.banner || mark.image;

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Menu inline buttonClassName={styles.menuButton} />
        <button className={styles.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <button className={styles.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>{t('Meu Perfil', 'My Profile')}</span></button>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>{t('MARCAS E SÍMBOLOS', 'MARKS AND SYMBOLS')}</p>
          <div className={styles.markList}>
            {marks.map((item) => {
              const display = localizeRecord(item, language, 'mark');
              return <button key={item.name} className={styles.markThumb + ' ' + (item.name === mark.name ? styles.active : '')} type="button" aria-current={item.name === mark.name ? 'page' : undefined} onClick={() => navigate('/marks/' + encodeURIComponent(item.name))}>
                <span className={styles.thumbPlaceholder} aria-hidden="true">✵</span>
                {item.image && <img src={item.image} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />}
                <span className={styles.thumbName}>{display.displayName || item.name}</span>
              </button>;
            })}
          </div>
        </aside>
        <article className={styles.dossier}>
          <div className={styles.heroImage}>
            <span className={styles.heroPlaceholder} aria-hidden="true">✵</span>
            {artwork && <img key={artwork} src={artwork} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />}
          </div>
          <div className={styles.heroShade} />
          <div className={styles.mainContent}>
            <p className={styles.breadcrumb}>{t('MARCAS', 'MARKS')} <span>›</span> <b>{mark.displayName || mark.name}</b></p>
            <h1>{mark.displayName || mark.name}</h1>
            <p className={styles.classification}>{t('✦ REGISTRO DE MARCAS ✦', '✦ MARK RECORD ✦')}</p>
            <div className={styles.leadText}><p>{mark.description}</p></div>
            <section className={styles.attributeGrid}>
              {details.map(([icon, label, value]) => <div className={styles.attribute} key={label}><span>{icon}</span><h2>{label}</h2><p>{value || '—'}</p></div>)}
            </section>
            <section className={styles.notes}>
              <div className={styles.note}><h2>{t('❝ APARÊNCIA', '❝ APPEARANCE')}</h2><p>{mark.appearance || '—'}</p></div>
            </section>
          </div>
          <nav className={styles.pagination} aria-label={t('Navegação entre marcas', 'Navigate marks')}>
            <button type="button" onClick={() => changeMark(-1)} disabled={currentIndex <= 0}>{t('‹ Anterior', '‹ Previous')}</button>
            <button type="button" onClick={() => changeMark(1)} disabled={currentIndex >= marks.length - 1}>{t('Próxima ›', 'Next ›')}</button>
          </nav>
        </article>
      </div>
    </main>
  );
}

export default MarksDetails;
