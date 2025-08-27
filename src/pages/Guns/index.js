import style from './Guns.module.css';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho';
import backgroundImg from '../../img/estrada.jpg';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';
import API from '../../services/API';
import Dropdown from '../../components/Dropdown';

function Guns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [guns, setGuns] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    console.log("Termo buscado:", searchTerm);
  };

  const handleCardClick = (name) => {
    navigate(`/guns/${name}`);
  };

  useEffect(() => {
    API.get('http://localhost:3001/guns')
      .then((res) => setGuns(res.data))
      .catch((err) => console.error('Erro ao buscar armas:', err));
  }, []);

  const filtered = guns.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Cabecalho searchTerm={searchTerm} onSearch={setSearchTerm} onSearchClick={handleSearchClick} />
      <Dropdown/>
      <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className={style.loginContainer}>
          <div className={style.cardsWrapper}>
            {filtered.map(guns => (
              <div key={guns.name} onClick={() => handleCardClick(guns.name)}>
              <Card id={guns.name} titulo={guns.name} capa={guns.image} />
              
              </div>
              ))}   
          </div>
        </div>
      </div>
    </>
  );
}

export default Guns;
