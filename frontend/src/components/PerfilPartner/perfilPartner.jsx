import React, { useState } from 'react';

const PerfilPartner = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === email.id && password === password.id) {
console.log('he logrado por fin 🫡')
    } else {
        console.log('No pude hacer una 💩')
    }
    // ! la lógica de envío, como enviar los datos a una API
    console.log(email, password);
  };

  return (
    <div className="partner-registration-form">
      <h2>¡Hola de nuevo!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button onClick={handleSubmit} type="submit">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
    </div>
  );
};

export default PerfilPartner;
