import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styles from "./styles.module.css";
import Switch from "../PerfilUsuario/Switch.jsx";
import { motion } from "framer-motion";
import {
  getStorageObject,
  getUserSession,
} from "../../utils/localStorage.utils.js";
import {
  deleteStorageObject,
  setStorageObject,
} from "../../utils/localStorage.utils.js";
import { handleProfileUpdateSubmit } from "../../utils/Usercrud.js";
import { UserContext } from "../../contexts/UserContext.js";
import pencilIcon from "../../assets/icons/pencil-svgrepo-com.svg";
import checkIcon from "../../assets/icons/checkmark-svgrepo-com.svg";

Modal.setAppElement("#root");

function PerfilUsuario({ modalState, changeModalState, setLogged }) {
  const { id } = getUserSession();

  const { user, setLocalUser } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const userDataFromToken = getStorageObject("token");
    const userData = getStorageObject("user");

    if (userDataFromToken !== null) {
      setLocalUser(userData);
      setUserInfo(userData);
    }
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditingField(field);
  };

  const handleSaveClick = async () => {
    try {
      // Verificar si el ID del usuario está definido
      if (!user._id) {
        console.error("ID del usuario no está definido");
        return;
      }

      // Obtener el token JWT del local storage
      const token = getStorageObject("token");
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      // Preparar los datos para la actualización
      const updateData = { [editingField]: userInfo[editingField] };

      // Enviar la actualización al backend y obtener la respuesta
      const updatedUser = await handleProfileUpdateSubmit(
        editingField,
        updateData,
        user._id,
        token
      );

      // Verificar si la respuesta del backend es válida

      if (updatedUser) {
        // Actualizar user con los cambios

        setLocalUser(updatedUser.updatedUser);
        console.log(updatedUser.updatedUser);
        deleteStorageObject("user");
        setStorageObject("user", updatedUser.updatedUser);
      } else {
        throw new Error("No se recibieron datos actualizados del usuario.");
      }

      // Confirmación en la consola

      // Salir del modo de edición
      setIsEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error(
        "Hubo un error al actualizar la información del usuario:",
        error
      );
    }
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    changeModalState(true);
  };

  const handleChange = (e) => {
    console.log(e);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [editingField]: e.target.value,
    }));
  };

  //const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  const renderEditableField = (field) => {
    if (isEditing && editingField === field) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.userInfoModDiv}
        >
          <input
            className={styles.userInfoModInput}
            type="text"
            value={userInfo[field]}
            onChange={handleChange}
          />
          <button className={styles.saveUserMod} onClick={handleSaveClick}>
            <img className={styles.checkIcon} src={checkIcon} alt="" />
          </button>
        </motion.div>
      );
    } else {
      return (
        <p className={styles.campoP2} onClick={() => handleEditClick(field)}>
          {userInfo[field]}
          <img className={styles.pencilIcon} src={pencilIcon} alt="" />
        </p>
      );
    }
  };

  const handleFormSubmit = (formData) => {
    setIsUserProfileEditModal(false);
  };

  const closeUserSession = () => {
    deleteStorageObject("user");
    deleteStorageObject("token");
    setLogged(false);
  };

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => changeModalState(false)}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      parentSelector={() => document.querySelector("#root")}
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.profile}
      >
        <div className={styles.flecha}></div>
        {user && (
          <h2 className={styles.profileHeader}>
            ¡Hola, {user.firstName.substring(0, user.firstName.indexOf(" "))}!
          </h2>
        )}
        <button
          className={styles.logoutButton}
          onClick={() => closeUserSession()}
        >
          Cerrar sesión
        </button>
        <div className={styles.separadorHeader}></div>
        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b className={styles.userProfileBold}>Nombre:</b>{" "}
            {renderEditableField("firstName")}
            <br />
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b className={styles.userProfileBold}>Email:</b>{" "}
            {renderEditableField("email")}
            <br />
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <p className={styles.campoP}>
            <b className={styles.userProfileBold}>Teléfono:</b>{" "}
            {renderEditableField("phone")}
          </p>
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b className={styles.userProfileBold}>Contraseña: </b> {"•••••••••"}
            {renderEditableField("Password")}
          </div>
        </div>
        <div className={styles.separador}></div>
        <div className={styles.preferenceContainer}>
          <div className={styles.preferenceTextContainer}>
            <div className={styles.campoP}>
              <b className={styles.userProfileBold}>Gestionar preferencias</b>
            </div>
            <p className={styles.managePreferences}>
              Usamos los datos de clientes para mejorar la experiencia de
              nuestro servicio y mostrar promociones relevantes.
            </p>
          </div>
          <div className={styles.campoP}>
            <p className={styles.preferenceDescription}>
              Glotón puede compartir datos de usuario (como teléfonos,
              identificadores de dispositivos o e-mails cifrados) con Facebook y
              plataformas similares para personalizar los anuncios y contenidos,
              medir su eficacia y crear audiencias. Siempre puedes optar por no
              recibir este tipo de comunicaciones desactivando esta opción.
            </p>
          </div>
        </div>
        <div className={styles.userSection}>
          <p className={styles.campoP}>Recibir ofertas especiales:</p>
          <Switch
            handleToggle={() =>
              setLocalUser({
                ...user,
                receivePromotions: !user.receivePromotions,
              })
            }
          />
        </div>
        <div className={styles.separador}></div>
        <div className={styles.userSection}>
          <p>Código promocional:</p>
          {renderEditableField("Codigo")}
        </div>
        <p className={styles.campoP}></p>
      </motion.div>
    </Modal>
  );
}

export default PerfilUsuario;
