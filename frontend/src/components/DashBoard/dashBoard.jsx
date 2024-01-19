import React from 'react';
import styles from "./styles.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

const DashBoard = () => {
    const [email, setEmail] = useState('test@mail.com');
    const [password, setPassword] = useState('*****');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [transport, setTransport] = useState('');
    const [offer, setOffer] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('Texto inicial');


    const handleTextChange = (event) => {
        setText(event.target.value);
      };
    
      const toggleEditing = () => {
        setIsEditing(!isEditing);
      };
    


    const actualizarEmail = (nuevoEmail) => {
        setEmail(nuevoEmail);
      };
      

    const handleClick = () => {
        setEmail('nuevoemail@mail.com'); // Cambia esto por la lógica que necesites
        setPassword('nuevoPassword')
      };


  return (
    <div className={styles.container}>
        <div className={styles.personalInfo}>
      <div className={styles.info}>

      <div>
      {isEditing ? (
        <input type="text" value={text} onChange={handleTextChange} onBlur={toggleEditing} autoFocus />
      ) : (
        <span onClick={toggleEditing}>{text}</span>
      )}
      <button className={styles.primero} onClick={toggleEditing}><img src="" alt="" />✏️</button>
    </div>



        <div className={styles.email}>
        {/* <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
          <span onClick={() => actualizarEmail('nuevoemail@mail.com')} href="" role="img" aria-label="email">✉️</span>
          email: {email}
        </div>
        <div className={styles.password}>
          <span onClick={handleClick} href="" role="img" aria-label="password">🔒</span>
          password: ********
          {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </div>
        <div className={styles.category}>
          <span onClick={handleClick} href="" role="img" aria-label="category">📁</span>
          categoria: Restaurante
          {/* <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
        </div>
        <div className={styles.location}>
          <span onClick={handleClick} href="" role="img" aria-label="location">📍</span>
          direccion: avenida Gaudi, 08025 Barcelona
          {/* <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /> */}
        </div>
      <div className={styles.actions}>
        <div className={styles.transport}>
          <span onClick={handleClick} href="" role="img" aria-label="transport">🚚</span>
          Transporte: 1.50€
          {/* <input type="text" value={transport} onChange={(e) => setTransport(e.target.value)} /> */}
        </div>
        <div className={styles.offer}>
          <span onClick={handleClick} href="" role="img" aria-label="offer">🎁</span>
          Oferta: 2x1
          {/* <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} /> */}
        </div>
       </div>
    </div>

        </div>
        <button className={styles.disconnect}>Desconectar</button>
    </div>
  );
}

export default DashBoard;
