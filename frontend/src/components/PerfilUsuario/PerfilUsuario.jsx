import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import UserPasswordModal from './UserPasswordModal.jsx';
import UserProfileEditModal from './UserProfileEditModal.jsx';
import UserRegisterModal from './UserRegisterModal.jsx';
import styles from "./styles.module.css";
import { handleInitialRegistrationSubmit } from "../PerfilUsuario/Usercrud";
import Switch from "../PerfilUsuario/Switch.jsx";




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
  }, []);
  const handleEditClick = (field) => {
    setEditingField(field);
    setIsUserProfileEditModal(true);
  };
  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    changeModalState(true);
  };

  const fieldTitles = {
    firstname: "Tu Nombre",
    lastname: "Tu Apellido",
    email: "Tu Email",
    phone: "Tu Teléfono",
  };

  //const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  const [isUserProfileEditModal, setIsUserProfileEditModal] = useState(false);
  const handleUserEditModal = () => {
    setIsUserProfileEditModal((currentState) => {
      console.log("Cambiando estado de modal a", !currentState);
      return !currentState;
    });
  };

  const handleFormSubmit = (formData) => {
    console.log("Formulario enviado con:", formData);
    setIsUserProfileEditModal(false);
  };

  return (

    <Modal isOpen={modalState} onRequestClose={() => changeModalState(false)}
    className={styles.modalContent}
    overlayClassName={styles.modalOverlay}
    >
      
      {isUserProfileEditModal && (
        <UserProfileEditModal
          user={user}
          editingField={editingField}
          fieldTitles={fieldTitles}
          onSubmit={handleFormSubmit}
        />
      )}
        <div className={styles.profile}>
          <h2 className={styles.profileHeader}>¡Hola, {user.firstname}!</h2>
          <div className={styles.separadorHeader}></div>
          <div>
            <p className={styles.campoP}>
              Nombre: <br /> {" Jose Garcia "}
              {/* <button
                className={styles.editButton}
                onClick={() => handleEditClick("firstname")}
              >
                Editar
              </button>{" "} */}
              <br />
              {user.firstname}
            </p>
          </div>
    
          <div>
            <p className={styles.campoP}>
              Email: <br /> {"josegarcia1006 "}
              {/* <button
                className={styles.editButton}
                onClick={() => handleEditClick("email")}
              >
                Editar
              </button>{" "} */}
              <br /> {user.email}
            </p>
          </div>
          <div className={styles.separador}></div>
          <div>
            <p className={styles.campoP}>
              Teléfono:{" "}
              {/* <button
                className={styles.editButton}
                onClick={() => handleEditClick("phone")}
              >
                Editar
              </button>{" "} */}
              <br />
              {user.phone}
            </p>
          </div>
          <div className={styles.separador}></div>
          <div>
            <p className={styles.campoP}>
              Contraseña:{" "}
              {/* <button
                className={styles.editButton}
                onClick={handleChangePasswordClick}
              >
                Editar
              </button>{" "} */}
              <br />
              {"•••••••••"}
            </p>
          </div>
          <div className={styles.separador}></div>
          <div>
            <p className={styles.campoP}>Gestionar preferencias</p>
            <p className={styles.managePreferences}>
              Usamos los datos de clientes para mejorar la experiencia de
              nuestro servicio y mostrar promociones relevantes.
            </p>
          </div>
          <div className={styles.campoP}>
            <p className={styles.preferenceDescription}>
              Glovo puede compartir datos de usuario (como teléfonos,
              identificadores de dispositivos o e-mails cifrados) con Facebook y
              plataformas similares para personalizar los anuncios y contenidos,
              medir su eficacia y crear audiencias. Siempre puedes optar por no
              recibir este tipo de comunicaciones desactivando esta opción.
            </p>
          </div>
          <div className={styles.userSection}>
            <p>Recibir ofertas especiales y promociones:</p>
            <Switch
              isOn={user.receivePromotions}
              handleToggle={() =>
                setUser({ ...user, receivePromotions: !user.receivePromotions })
              }
            />
          </div>
          <div className={styles.separador}></div>
          <div className={styles.userSection}>
            <p>Código promocional:</p>
            {/* <button
              className={styles.promoButton}
              onClick={() => handleEditClick("promo")}
            >
              Añadir
            </button> */}
          </div>
          <p className={styles.campoP}>-</p>
          <div className={styles.separador}></div>
          <div className={styles.userSection}>
            {/* <button
              className={styles.logoutButton}
              onClick={() => handleEditClick("logout")}
            >
              Cerrar sesión
            </button> */}
          </div>
          <div className={styles.userSection}>
            {/* <button className={styles.logoutButton}>
              Eliminar Cuenta
            </button> */}
          </div>
        </div>
     
      
    </Modal>
    
  );
}

export default PerfilUsuario;