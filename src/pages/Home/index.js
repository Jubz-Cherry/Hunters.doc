import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import API from '../../services/API';
import style from './Home.module.css';
import backgroundImg from '../../img/estrada.jpg';
import Menu from '../../components/Menu';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/monsters')
      .then((res) => setMonsters(res.data))
      .catch(() => setError('Não foi possível carregar o bestiário. Tente novamente em alguns instantes.'));
  }, []);

  const filteredMonsters = useMemo(
    () => monsters.filter((monster) => monster.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [monsters, searchTerm]
  );

  const getExcerpt = (monster) => {
    const text = Array.isArray(monster.description) ? monster.description[0] : monster.description;
    return text || 'Conheça os registros desta criatura.';
  };

  return (
    <main className={style.page} style={{ '--page-background': `url(${backgroundImg})` }}>
      <header className={style.topbar}>
        <Menu inline buttonClassName={style.menuButton} />
        <button className={style.brand} type="button" onClick={() => navigate('/home')}>Hunters.doc</button>
        <label className={style.searchBox}>
          <span>⌕</span>
          <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Pesquisar criatura..." aria-label="Pesquisar criatura" />
        </label>
        <button className={style.profileButton} type="button" onClick={() => navigate('/profile')}>◎ <span>Meu Perfil</span></button>
      </header>

      <section className={style.content}>
        <p className={style.eyebrow}>CONHEÇA O SOBRENATURAL</p>
        <h1>Criaturas</h1>
        <p className={style.intro}>Explore os seres que habitam as sombras.</p>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.cardsGrid}>
          {filteredMonsters.map((monster) => (
            <article key={monster.name} className={style.monsterCard} onClick={() => navigate(`/monsters/${encodeURIComponent(monster.name)}`)} onKeyDown={(event) => event.key === 'Enter' && navigate(`/monsters/${encodeURIComponent(monster.name)}`)} tabIndex="0" role="button">
              <img src={monster.image} alt="" />
              <div className={style.cardShade} />
              <div className={style.cardContent}>
                <h2>{monster.name}</h2>
                <p>{getExcerpt(monster)}</p>
                <div className={style.cardFooter}><span>Ver detalhes</span><i aria-hidden="true">›</i></div>
              </div>
            </article>
          ))}
        </div>
        {!error && monsters.length > 0 && filteredMonsters.length === 0 && <p className={style.empty}>Nenhuma criatura encontrada.</p>}
      </section>
    </main>
  );
}

export default Home;
