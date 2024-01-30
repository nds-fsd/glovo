import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styles from "./styles.module.css";
import Switch from "../PerfilUsuario/Switch.jsx";
import { motion } from "framer-motion";
import {getStorageObject  getUserSession} from '../../utils/localStorage.utils.js';
import { deleteStorageObject } from "../../utils/localStorage.utils.js";
import { handleProfileUpdateSubmit } from '../../utils/Usercrud.js';

Modal.setAppElement("#root");

function PerfilUsuario({ modalState, changeModalState, setLogged }) {
  console.log("esto son los ", modalState);
  const {id} = getUserSession()
  const [user, setUser] = useState({
    _id: id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    receivePromotions: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();

  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    const userDataFromToken = getStorageObject("token");
  useEffect(() => {
    const userDataFromToken = getStorageObject("token");
    if (userDataFromToken !== null) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        ...userDataFromToken,
      }));
    }
  }, []);

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
    console.log("Editando campo:", field);
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
      const updatedUser = await handleProfileUpdateSubmit(editingField, updateData, user._id, token);
  
      // Verificar si la respuesta del backend es válida
      if (updatedUser) {
        // Actualizar user con los cambios
        setUser({ ...user, ...updateData });
      } else {
        throw new Error("No se recibieron datos actualizados del usuario.");
      }
  
      // Confirmación en la consola
      console.log("Usuario actualizado:", updatedUser);
  
      // Salir del modo de edición
      setIsEditing(false);
      setEditingField(null);
  
    } catch (error) {
      console.error('Hubo un error al actualizar la información del usuario:', error);
    }
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    changeModalState(true);
  };

  const handleChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [editingField]: e.target.value,
    }));
  };
  

  const fieldTitles = {
    firstname: "Tu Nombre",
    lastname: "Tu Apellido",
    email: "Tu Email",
    phone: "Tu Teléfono",
  };

  //const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  const renderEditableField = (field) => {
    if (isEditing && editingField === field) {
      return (
        <div>
          <input
            type="text"
            value={userInfo[field]}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      );
    } else {
      return (
        <span>
          {userInfo[field]}
          <button className={styles.editButton} onClick={() => handleEditClick(field)}>Editar</button>
        </span>
      );
    }
  };

  const handleFormSubmit = (formData) => {
    console.log("Formulario enviado con:", formData);
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
    >
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={styles.profile}
      >
        <div className={styles.flecha}></div>
        <h2 className={styles.profileHeader}>¡Hola, {userInfo.firstName}!</h2>
        <button
          className={styles.logoutButton}
          onClick={() => closeUserSession()}
        >
          Cerrar sesión
        </button>
        <div className={styles.separadorHeader}></div>
        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b>Nombre:</b> {renderEditableField('firstName')}
            <br />
            {user.firstname}
          </div>
        </div>

        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b>Email:</b> {renderEditableField('email')}
            <br />
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b>Teléfono:</b>
            {isEditing && editingField === 'phone'
              ? renderEditableField('phone')
              : (
                <>
                  {user.phone || "añade tu número aquí 📱"}
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick('phone')}
                  >
                    Editar
                  </button>
                </>
              )
            }
          </div>
        </div>

        <div className={styles.userInfoContainer}>
          <div className={styles.campoP}>
            <b>Contraseña: </b>{" "}
            {"•••••••••"}
            {renderEditableField('Password')}
          </div>
        </div>
        <div className={styles.separador}></div>
        <div className={styles.preferenceContainer}>
          <div className={styles.preferenceTextContainer}>
            <div className={styles.campoP}>
              <b>Gestionar preferencias</b>
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
          {renderEditableField('Codigo')}
        </div>
        <p className={styles.campoP}></p>
      </motion.div>
    </Modal>
  );
}

export default PerfilUsuario;
