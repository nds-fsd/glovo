import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
//import axios from "axios";
import "./styles.modules.css";
import PasswordChangeModalContent from './UserPasswordModal.jsx';
import ProfileEditModalContent from './UserProfileEditModal.jsx';
// import UserRegisterModal from './UserRegisterModal.jsx';


Modal.setAppElement("#root");

function PerfilUsuario({ modalState, changeModalState }) {
  console.log("esto son los ", modalState);
  const [user, setUser] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    receivePromotions: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (user._id) {
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("receivePromotions", user.receivePromotions);
    }
  }, [user, setValue]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsChangingPassword(false);
    reset();
  };
  const handleGetStarted = () => {
    openModal();
  };
  const handleEditClick = (field) => {
    setEditingField(field);
    setIsEditing(true);
    openModal();
  };
  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    openModal();
  };

  const fieldTitles = {
    firstname: "Tu Nombre",
    lastname: "Tu Apellido",
    email: "Tu Email",
    phone: "Tu Teléfono",
  };
  const renderModalContent = () => {
    if (isChangingPassword) {
      return <PasswordChangeModalContent onSubmit={handlePasswordChangeSubmit} />;
    } else if (isEditing) {
      return <ProfileEditModalContent user={user} editingField={editingField} fieldTitles={fieldTitles} onSubmit={handleProfileUpdateSubmit} />;
    } else {
      return <InitialRegistrationModalContent onSubmit={handleInitialRegistrationSubmit} />;
    }
  };

  return (
    <div>
      <Modal isOpen={modalState} onRequestClose={changeModalState}>
        {renderModalContent()}
      </Modal>
      {!user._id ? (
        <></>
      ) : (
        <div>
          <h2 className="profile-header">¡Hola, {user.firstname}!</h2>
          <div className="separador-header"></div>
          <div>
            <p className="campo-p">
              Nombre:{" "}
              <button
                className="edit-button"
                onClick={() => handleEditClick("firstname")}
              >
                Editar
              </button>{" "}
              <br />
              {user.firstname}
            </p>
          </div>
          <div>
            <p className="campo-p">
              Email:{" "}
              <button
                className="edit-button"
                onClick={() => handleEditClick("email")}
              >
                Editar
              </button>{" "}
              <br /> {user.email}
            </p>
          </div>
          <div className="separador"></div>
          <div>
            <p className="campo-p">
              Teléfono:{" "}
              <button
                className="edit-button"
                onClick={() => handleEditClick("phone")}
              >
                Editar
              </button>{" "}
              <br />
              {user.phone}
            </p>
          </div>
          <div className="separador"></div>
          <div>
            <p className="campo-p">
              Contraseña:{" "}
              <button
                className="edit-button"
                onClick={handleChangePasswordClick}
              >
                Cambiar Contraseña
              </button>{" "}
              <br />
              {"•••••••••"}
            </p>
          </div>
          <div className="separador"></div>
          <div>
            <p className="campo-p">Gestionar preferencias</p>
            <p className="manage-preferences">
              Usamos los datos de clientes para mejorar la experiencia de
              nuestro servicio y mostrar promociones relevantes.
            </p>
          </div>
          <div className="campo-p">
            <p className="preference-description">
              Glovo puede compartir datos de usuario (como teléfonos,
              identificadores de dispositivos o e-mails cifrados) con Facebook y
              plataformas similares para personalizar los anuncios y contenidos,
              medir su eficacia y crear audiencias. Siempre puedes optar por no
              recibir este tipo de comunicaciones desactivando esta opción.
            </p>
          </div>
          <div className="user-section">
            <p>Recibir ofertas especiales y promociones:</p>
            <Switch
              isOn={user.receivePromotions}
              handleToggle={() =>
                setUser({ ...user, receivePromotions: !user.receivePromotions })
              }
            />
          </div>
          <div className="separador"></div>
          <div className="user-section">
            <p>Código promocional:</p>
            <button
              className="promo-button"
              onClick={() => handleEditClick("promo")}
            >
              Añadir
            </button>
          </div>
          <p className="campo-p">-</p>
          <div className="separador"></div>
          <div className="user-section">
            <button
              className="logout-button"
              onClick={() => handleEditClick("logout")}
            >
              Cerrar sesión
            </button>
          </div>
          <div className="user-section">
            <button className="logout-button" onClick={handleDelete}>
              Eliminar Cuenta
            </button>
          </div>
        </div>
      )}
    </div>
  );
            }
export default PerfilUsuario;