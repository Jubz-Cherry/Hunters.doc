import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/API';
import Menu from '../../components/Menu';
import { usePreferences } from '../../preferences';
import { localizeRecord } from '../../localizedRecords';
import backgroundImg from '../../img/estrada.jpg';
import style from './Marks.module.css';

function Marks() {
  const { t, language } = usePreferences();
  const navigate = useNavigate();
  const [marks, setMarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/marks')
      .then(({ data }) => setMarks(data))
      .catch(() => setError(t('Não foi possível carregar as marcas.', 'Could not load the marks.')))
      .finally(() => setLoading(false));
  }, [t]);

  const filteredMarks = useMemo(() => marks
    .map((mark) => localizeRecord(mark, language, 'mark'))
    .filter((mark) => (mark.name + ' ' + (mark.displayName || '')).toLowerCase().includes(searchTerm.toLowerCase())), [marks, language, searchTerm]);

  return (
    <main className={style.page} style={{ '--page-background': 'url(' + backgroundImg + ')' }}>
      <header className={style.topbar}>
        <Menu inline buttonClassName={style.menuButton} />
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <label className={style.searchBox}>
          <span>⌕</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t('Pesquisar marca ou símbolo...', 'Search marks or symbols...')} aria-label={t('Pesquisar marcas', 'Search marks')} />
        </label>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>{t('Meu Perfil', 'My Profile')}</span></button>
      </header>

      <section className={style.content}>
        <p className={style.eyebrow}>{t('SÍMBOLOS DO SOBRENATURAL', 'SUPERNATURAL SYMBOLS')}</p>
        <h1>{t('Marcas e Símbolos', 'Marks and Symbols')}</h1>
        <p className={style.intro}>{t('Explore os sinais, selos e marcas do diário dos caçadores.', 'Explore the signs, sigils, and marks in the hunters’ journal.')}</p>
        {loading && <p className={style.empty}>{t('Carregando marcas...', 'Loading marks...')}</p>}
        {error && <p className={style.error} role="alert">{error}</p>}
        <div className={style.cardsGrid}>
          {filteredMarks.map((mark) => (
            <article key={mark.name} className={style.markCard} onClick={() => navigate('/marks/' + encodeURIComponent(mark.name))} onKeyDown={(event) => event.key === 'Enter' && navigate('/marks/' + encodeURIComponent(mark.name))} tabIndex="0" role="button">
              <div className={style.cardPlaceholder} aria-hidden="true">✵</div>
              {mark.image && <img src={mark.image} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />}
              <div className={style.cardShade} />
              <div className={style.cardContent}>
                <h2>{mark.displayName || mark.name}</h2>
                <p>{mark.description || t('Abra o registro para conhecer este símbolo.', 'Open the record to learn about this symbol.')}</p>
                <div className={style.cardFooter}><span>{t('Ver detalhes', 'View details')}</span><i aria-hidden="true">›</i></div>
              </div>
            </article>
          ))}
        </div>
        {!loading && !error && filteredMarks.length === 0 && <p className={style.empty}>{t('Nenhuma marca encontrada.', 'No marks found.')}</p>}
      </section>
    </main>
  );
}

export default Marks;
