import Cabecalho from '../../components/Cabecalho';
import style from './Home.module.css';
import backgroundImg from '../../img/download.jpg'
import ListItem from '../../components/ListItem';

function Home() {
  return (
    <>
  <Cabecalho/>
  <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
    <h1>Ola hunter, seja bem vindo ao seu diario!</h1>
    </div>;
    
    </>
  )
}

export default Home;
