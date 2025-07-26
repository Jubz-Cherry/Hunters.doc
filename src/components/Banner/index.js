import styles from './Banner.module.css';
import imagem from '../../img/vampires.jpg';


function Banner(){
    return(
        <div className={styles.capa}
        style={{ backgroundImage: `url('/imagens/banner-${imagem}.jpg')`}}></div>
    )
}

export default Banner;