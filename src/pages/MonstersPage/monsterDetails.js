import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../services/API';
import style from './monsterDetails.module.css';
import Banner from '../../components/Banner';


function MonsterDetails() {
  const { name } = useParams();
  const [monsters, setMonster] = useState(null);

  useEffect(() => {
    API.get('http://localhost:3001/monsters')
      .then(res => {
        const found = res.data.find(m => m.name.toLowerCase() === name.toLowerCase());
        console.log('Monstro encontrado:', found);
        setMonster(found);
      })
      .catch(err => console.error('Erro:', err));
  }, [name]);

  if (!monsters) return <p>Carregando monstro...</p>;


  return (
    <>
    <Banner bannerUrl={monsters.banner}/>

    <div className={'form-container'}>
        <div className={style['login-container']}>
  
           <h1>{monsters.name}</h1>

            <p><strong>Origem: </strong> {monsters.origin}</p>

            <p><strong>Descrição: </strong>{monsters.description}</p>

            <p><strong>Aparência: </strong>{monsters.custom}</p>

            <p><strong>Comportamento: </strong>{monsters.behavior}</p>

            <p><strong>Transformação: </strong>{monsters.transformation}</p>

            <p><strong>Cura: </strong> {monsters.cure} </p>

            <p><strong>Fraquezas: </strong> {monsters.weaknesses.join(', ')} </p>

              
            </div>
        </div>
    </>
  );
}

export default MonsterDetails;
