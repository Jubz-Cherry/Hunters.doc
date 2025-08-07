import styles from './Banner.module.css';

function Banner({ bannerUrl }){
    return(
        <div className={styles.capa}
        style={{ backgroundImage: `url(${bannerUrl})` }}>
        </div>
        
    )
}

export default Banner;