import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import axios from "axios";
import "./styles.css";
import { RxPerson } from "react-icons/rx";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

Modal.setAppElement("#root");

// componente Switch
const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn && "#06D6A0" }}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

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

  const handleInitialRegistrationSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/users", data);
      setUser(response.data);
      closeModal();
    } catch (error) {
      console.error("Error en el registro inicial:", error);
    }
  };

  const handleProfileUpdateSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${user._id}`,
        {
          [editingField]: data[editingField],
        }
      );
      setUser({ ...user, [editingField]: data[editingField] });
      setEditingField(null);
      closeModal();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handlePasswordChangeSubmit = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    // Verifica si las nuevas contraseñas coinciden
    if (newPassword !== confirmPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3001/users/change-password/${user._id}`,
        {
          currentPassword,
          newPassword,
        }
      );
      alert("Contraseña actualizada con éxito");
      closeModal();
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/users/${user._id}`);
        alert("Cuenta eliminada con éxito.");
        setUser({});
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
  };

  const fieldTitles = {
    firstname: "Tu Nombre",
    lastname: "Tu Apellido",
    email: "Tu Email",
    phone: "Tu Teléfono",
  };

  const renderModalContent = () => {
    if (isChangingPassword) {
      return (
        <form onSubmit={handleSubmit(handlePasswordChangeSubmit)}>
          <input
            {...register("currentPassword")}
            type="password"
            placeholder="Contraseña actual"
            required
          />
          <input
            {...register("newPassword")}
            type="password"
            placeholder="Nueva contraseña"
            required
          />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirmar nueva contraseña"
            required
          />
          <button type="submit">Actualizar contraseña</button>
        </form>
      );
    } else if (isEditing) {
      const title = fieldTitles[editingField] || "Editar Campo";

      return (
        <form
          className="form-submit-button"
          onSubmit={handleSubmit(handleProfileUpdateSubmit)}
        >
          <h2 className="tu-nombre">{title}</h2>
          <RxPerson className="person-icon" />
          <input
            className="input"
            {...register(editingField)}
            defaultValue={user[editingField]}
          />
          <div className="separador"></div>
          <div className="submit-button">
            <button className="guardar-cambios" type="submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form
          className="register-form"
          onSubmit={handleSubmit(handleInitialRegistrationSubmit)}
        >
          <h2 className="hola">¡Hola!</h2>
          <p className="register-p">Selecciona una de estas opciones</p>
          <div>
            <RxPerson className="person-icon" />{" "}
            <input
              className="first-imput"
              {...register("firstname")}
              placeholder="Nombre"
              required
            />
          </div>
          <MdOutlineEmail className="email-icon" />{" "}
          <input
            className="first-imput"
            {...register("email")}
            type="email"
            placeholder="Email"
            required
          />
          <MdOutlinePassword className="password-icon" />{" "}
          <input
            className="first-imput"
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            required
          />
          <button
            className="guardar-cambios"
            type="submit"
            onClick={changeModalState}
          >
            Registrar
          </button>
        </form>
      );
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
