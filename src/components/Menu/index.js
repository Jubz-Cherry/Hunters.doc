import { usePreferences } from '../../preferences';
import styles from './Menu.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Menu({ inline = false, buttonClassName = '' }){
  const { t } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

    return(
        <>
            <div className={`${styles.menuWrapper} ${inline ? styles.inline : ''}`}>
          <button onClick={toggleMenu} className={`${styles.menuButton} ${buttonClassName}`} aria-label={t("Abrir menu", "Open menu")} type="button">
        &#9776;
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <p>
          <Link to="/guns">{t("Armas", "Weapons")}</Link>
          </p>
          <p>
          <Link to="/marks">{t("Marcas e Símbolos", "Marks and Symbols")}</Link>
          </p>
          <p>
          <Link to="/" onClick={handleLogout}>{t("Sair", "Log out")}</Link>
          </p>
        </div>
      )}
    </div>
        </>
    )
}

export default Menu;
