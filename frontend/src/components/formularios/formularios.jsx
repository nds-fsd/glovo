import styles from "./styles.module.css";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { mailValidator, phoneValidator, validateCity } from "./validators";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const Formulario = () => {
  const params = useParams();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm();

  const incluirCodigo = watch("incluirCodigo");
  const [partner, setPartner] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3003/create-partner",
        data
      );
      console.log(response.data);
      console.log("cambios");
      setIsDone(true);
    } catch (error) {
      setSubmitError("Failed to create partner. Please try again.");
      console.error("Error creating partner:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Modal
      parentSelector={() => document.querySelector("#root")}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      isOpen={true}
    >
      <div className={styles.everything}>
        <div className={styles.formContainer}>
          <h2>Empieza a vender con Gloton</h2>
          <p>
            Registrarse en Gloton nunca ha sido tan fácil. Hazte Partner ahora.{" "}
            {watch("")}
          </p>
          <form className={styles.formObject} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label></label>
              <select className={styles.options} {...register("pais")}>
                <option className={styles.individualOption} value="ES">
                  🇪🇸 España
                </option>
                <option className={styles.individualOption} value="GEO">
                  🇬🇪 Georgia
                </option>
                <option className={styles.individualOption} value="FR">
                  🇫🇷 Francia
                </option>
                <option className={styles.individualOption} value="VE">
                  🇻🇪 Venezuela
                </option>
              </select>
            </div>
            <div>
              <label className={styles.ciudad}></label>
              <input
                type="text"
                placeholder="Ciudad"
                {...register("ciudad", {
                  validate: validateCity,
                })}
              />
              {errors["ciudad"] && <p>{errors["ciudad"].message}</p>}
            </div>
            <div>
              <label className={styles.negocio}></label>
              <input
                type="text"
                placeholder="Nombre del negocio"
                {...register("brandName")}
              />
            </div>
            <div className={styles.nombreApellidos}>
              <div>
                <label className={styles.nombre}></label>
                <input
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre")}
                />
              </div>
              <div>
                <label className={styles.apellidos}></label>
                <input
                  type="text"
                  placeholder="Apellidos"
                  {...register("apellidos")}
                />
              </div>
            </div>
            <div>
              <label className={styles.mail}></label>
              <input
                type="email"
                placeholder="Email"
                {...register("e-mail", { validate: mailValidator })}
              />
              {errors["e-mail"] && <p>{errors["e-mail"].message}</p>}
            </div>
            <div>
              <label className={styles.telefono}></label>
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
              />
            </div>
            <div>
              <label className={styles.telefono}></label>
              <input
                type="text"
                placeholder="Teléfono"
                {...register("telefono", {
                  validate: phoneValidator,
                })}
              />
              {errors["telefono"] && <p>{errors["telefono"].message}</p>}
            </div>
            <label></label>
            <select
              className={styles.options}
              {...register("Tipo de establecimiento")}
            >
              <option
                className={styles.individualOption}
                value="Tipo de establecimiento"
              >
                Tipo de establecimiento
              </option>
              <option className={styles.individualOption} value="restaurante">
                Restaurante (cafeteria, brunch y panaderia, helados, zumos y
                smoothies...)
              </option>
              <option className={styles.individualOption} value="farmacia">
                Farmacia
              </option>
              <option className={styles.individualOption} value="tienda">
                Tienda (regalos, belleza, electronica, tienda de mascotas...)
              </option>
              <option className={styles.individualOption} value="lofisteria">
                Floristeria
              </option>
            </select>
            <div className={styles.bottomContainer}>
              <div className={styles.codigo}>
                <input type="checkbox" {...register("incluirCodigo")} />
                <label className={styles.bottomLabels}>
                  ¿Tienes un código promocional?
                </label>
              </div>
              {incluirCodigo && (
                <div className={styles.aplicar}>
                  <input
                    className={styles.codigoPromocionalInput}
                    type="text"
                    placeholder="Codigo Promocional"
                    {...register("codigo", {
                      //! validate : promoCode debemos añadir en futuro ...
                    })}
                  />
                  <button className={styles.aplicarbtn}>Aplicar</button>
                </div>
              )}
              <div className={styles.whatsapp}>
                <input type="checkbox" {...register("whatsapp")} />
                <label className={styles.bottomLabels}>
                  Acepto recibir actualizaciones de Gloton a través de WhatsApp
                  o plataformas similares
                </label>
              </div>
              <div className={styles.privacidad}>
                <input
                  type="checkbox"
                  {...register("privacidad", {
                    required: "Debe aceptar la política de privacidad",
                  })}
                />
                <label className={styles.bottomLabels}>
                  Acepto la politica de privacidad
                </label>
                {errors.privacidad && <p>{errors.privacidad.message}</p>}
              </div>
            </div>
            <div className={styles.submit}>
              <button
                id={styles.miInputId}
                type="submit"
                disabled={isSubmitting}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Formulario;
