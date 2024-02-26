import React, { useState } from "react";
import styles from "../Footer/styles.module.css";
import footerWaveSvg from "../../assets/images/footer-wave-desktop.svg";
import logoImg from "../../assets/icons/logo.svg";
import { useParams, useNavigate } from "react-router-dom";
import Formulario from "../formularios/formularios";
import BusinessModal from "../DashBoard/businessModal";

export default function Footer() {
  const params = useParams();
  const navigate = useNavigate();
  const [formulariosIsOpen, setFormulariosIsOpen] = useState(false);
  const [businessModalIsOpen, setBusinessModalIsOpen] = useState(false);

  const openFormularios = () => {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
    setFormulariosIsOpen(true);
  };

  const openBusinessModal = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setBusinessModalIsOpen(true);
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
                <p
                  className={styles.formularioButton}
                  onClick={openFormularios}
                >
                  Gloton para socios
                </p>
                <a href="">Repartidores</a>
                <p className={styles.businessModal} onClick={openBusinessModal}>
                  Gloton Business
                </p>
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
          </div>
        </div>
      </footer>
      <Formulario
        formulariosIsOpen={formulariosIsOpen}
        setFormulariosIsOpen={setFormulariosIsOpen}
      />
      <BusinessModal
        businessModalIsOpen={businessModalIsOpen}
        setBusinessModalIsOpen={setBusinessModalIsOpen}
      />
    </div>
  );
}
