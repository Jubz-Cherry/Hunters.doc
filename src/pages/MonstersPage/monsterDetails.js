import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../services/API';

function MonsterDetails() {
  const { name } = useParams();
  const [monster, setMonster] = useState(null);

  useEffect(() => {
    API.get('http://localhost:3001/monsters')
      .then(res => {
        const found = res.data.find(m => m.name.toLowerCase() === name.toLowerCase());
        setMonster(found);
      })
      .catch(err => console.error('Erro:', err));
  }, [name]);

  if (!monster) return <p>Carregando monstro...</p>;

  return (
<div className="monster-container">
  <img src={`http://localhost:3001${monster.image}`} alt={monster.name} />
  <h1>{monster.name}</h1>
  <p>{monster.description}</p>
  <p><strong>Origem:</strong> {monster.origin}</p>
  <p><strong>Fraquezas:</strong> {monster.weaknesses.join(', ')}</p>
</div>

  );
}

export default MonsterDetails;
