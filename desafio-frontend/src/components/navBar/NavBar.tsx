import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>Company Name</div>
      <div className={styles.navbarLinks}>
        <button className={styles.navbarLink} onClick={() => handleNavigation('/')}>Home</button>
        <button className={styles.navbarLink} onClick={() => handleNavigation('/events')}>Eventos</button>
        <button className={styles.navbarLink} onClick={() => handleNavigation('/places')}>Lugares</button>
      </div>
      <div className={styles.navbarUser}>Olá Thiago</div>
    </nav>
  );
};

export default NavBar;
