import Cabecalho from '../../components/Cabecalho';
import style from './Home.module.css';
import backgroundImg from '../../img/estrada.jpg';
import Card from '../../components/Card';
import vampires from '../../img/vampires.jpg';
import werewolf from '../../img/lobi.jpg'

function Home() {
  return (
    <>
  <Cabecalho/>
  <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
    <div className={style.loginContainer}>
    <div className={'login-container'}>
      <Card id='1' titulo="Vampiro" capa={vampires}/>
      <Card id='2' titulo="Lobisomem" capa={werewolf}/>
    


      </div>
    </div>
    </div>
    </>
  )
}

export default Home;
