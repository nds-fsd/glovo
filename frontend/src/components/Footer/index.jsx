import React from "react";
import styles from "../Footer/styles.module.css";
import footerWaveSvg from "../../assets/images/footer-wave-desktop.svg";
import logoImg from "../../assets/icons/logo.svg";
import { useParams, useNavigate } from "react-router-dom";




export default function Footer() {


  const params = useParams();
  const navigate = useNavigate();

  const handleNavigateToFormularios = () => {
    navigate('../formularios'); 
  };



  return (
    <div className={styles.viewport}>
      <footer className={styles.footerContainer}>
        <img className={styles.footerWaveImg} src={footerWaveSvg} alt="" />
        <div className={styles.footerBackground}>
          <div className={styles.footerTextContainer}>
            <div className={styles.logoContainer}>
              <img className={styles.footerLogo} src={logoImg} alt="" />
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.verticalLinks}>
                <h4>Colabora con Gloton</h4>
                <a href="">Carreras</a>
                <a onClick={handleNavigateToFormularios} href="">Gloton para socios</a>
                <a href="">Repartidores</a>
                <a href="">Gloton Business</a>
              </div>
              <div className={styles.verticalLinks}>
                <h4>Links de interés</h4>
                <a href="">Acerca de nosotros</a>
                <a href="">Preguntas frecuentes</a>
                <a href="">Gloton Prime</a>
                <a href="">Blog</a>
                <a href="">Contacto</a>
                <a href="">Seguridad</a>
              </div>
              <div className={styles.verticalLinks}>
                <h4>Síguenos</h4>
                <a href="">Facebook</a>
                <a href="">Twitter</a>
                <a href="">Instagram</a>
              </div>
              <div className={styles.verticalLinks}>
                <a href="">CONDICIONES DE USO</a>
                <a href="">POLÍTICA DE PRIVACIDAD</a>
                <a href="">POLÍTICA DE COOKIES</a>
                <a href="">CUMPLIMIENTO</a>
              </div>
            </div>
            <aside className={styles.languageSelectorContainer}>
              <select name="languageSelector" id="">
                <option value="1">Español</option>
                <option value="2">English</option>
                <option value="3">Swahili</option>
              </select>
            </aside>
          </div>
        </div>
      </footer>
    </div>
  );
}
