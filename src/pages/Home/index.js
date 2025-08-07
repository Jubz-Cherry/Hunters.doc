import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho';
import style from './Home.module.css';
import backgroundImg from '../../img/estrada.jpg';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';
import API from '../../services/API';


function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [monsters, setMonsters] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    console.log("Termo buscado:", searchTerm);
  };

  const handleCardClick = (name) => {
    navigate(`/monsters/${name}`);
  };

  useEffect(() => {
    API.get('http://localhost:3001/monsters')
      .then((res) => setMonsters(res.data))
      .catch((err) => console.error('Erro ao buscar monstros:', err));
  }, []);

  const filtered = monsters.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Cabecalho searchTerm={searchTerm} onSearch={setSearchTerm} onSearchClick={handleSearchClick} />
      <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className={style.loginContainer}>
          <div className={'login-container'}>
            {filtered.map(monsters => (
              <div key={monsters.name} onClick={() => handleCardClick(monsters.name)}>
              <Card id={monsters.name} titulo={monsters.name} capa={monsters.image} />
              
              </div>
              ))}   
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
