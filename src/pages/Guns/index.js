import style from './Guns.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import backgroundImg from '../../img/estrada.jpg';

function Guns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [guns, setGuns] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/guns')
      .then((res) => setGuns(res.data))
      .catch(() => setError('Não foi possível carregar o arsenal. Tente novamente em alguns instantes.'));
  }, []);

  const filteredGuns = useMemo(
    () => guns.filter((gun) => gun.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [guns, searchTerm]
  );

  const getExcerpt = (gun) => {
    const text = Array.isArray(gun.description) ? gun.description[0] : gun.description;
    return text || 'Conheça os registros desta arma.';
  };

  return (
    <main className={style.page} style={{ '--page-background': `url(${backgroundImg})` }}>
      <header className={style.topbar}>
        <button className={style.menuButton} type="button" onClick={() => navigate('/home')} aria-label="Voltar para criaturas">☰</button>
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <label className={style.searchBox}>
          <span>⌕</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Pesquisar arma..." aria-label="Pesquisar arma" />
        </label>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>Meu Perfil</span></button>
      </header>

      <section className={style.content}>
        <p className={style.eyebrow}>EQUIPAMENTO DE CAÇADOR</p>
        <h1>Arsenal</h1>
        <p className={style.intro}>Ferramentas para enfrentar o que espreita nas sombras.</p>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.cardsGrid}>
          {filteredGuns.map((gun) => (
            <article key={gun.name} className={style.gunCard} onClick={() => navigate(`/guns/${encodeURIComponent(gun.name)}`)} onKeyDown={(event) => event.key === 'Enter' && navigate(`/guns/${encodeURIComponent(gun.name)}`)} tabIndex="0" role="button">
              <img src={gun.image} alt="" />
              <div className={style.cardShade} />
              <div className={style.cardContent}>
                <h2>{gun.name}</h2>
                <p>{getExcerpt(gun)}</p>
                <div className={style.cardFooter}><span>Ver detalhes</span><i aria-hidden="true">›</i></div>
              </div>
            </article>
          ))}
        </div>
        {!error && guns.length > 0 && filteredGuns.length === 0 && <p className={style.empty}>Nenhuma arma encontrada.</p>}
      </section>
    </main>
  );
}

export default Guns;
