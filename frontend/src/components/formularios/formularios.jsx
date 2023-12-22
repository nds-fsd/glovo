import { useForm, useWatch } from "react-hook-form";
import { mailValidator, phoneValidator, validateCity } from "./validators";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { partner } from "./PartnerService";

export const Formulario = () => {
const { 
    register, 
    formState:{ errors }, 
    watch, 
    handleSubmit, 
    setValue,
} = useForm();

  const [partner, setPartner] = useState({})
    useEffect(() => {
  const fetchData = async () => {
  try {
    const response = await axios.post('http://localhost:3003/create-partner', partner);
  } catch (error) {
  }
}
fetchData();
    }, [])
   const onSubmit = (data) => { 
      console.log(data)
    setPartner(data) 
  }


  
const incluirCodigo = watch("incluirCodigo");
    return (
    <div  className={styles.formContainer}>
        <h2>Empieza a vender con Gloton</h2>
        <p>Registrarse en Glovo nunca ha sido tan fácil. Hazte Partner ahora. {watch("")}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
    <label></label>
    <select {...register("pais")}>
        <option value="ES">🇪🇸 España</option>
        <option value="GEO">🇬🇪 Georgia</option>
        <option value="FR">🇫🇷 Francia</option>
        <option value="VE">🇻🇪 Venezuela</option>
    </select>
</div>
<div>
    <label className={styles.ciudad}></label>
    <input
  type="text"
  placeholder="Ciudad"
  {...register("ciudad", {
     validate: validateCity 
     })}/>
      {errors["ciudad"] && <p>{errors["ciudad"].message}</p>}
</div>
<div>
    <label className={styles.negocio}></label>
    <input type="text" placeholder="Nombre del negocio" {...register("brandName")}/>
</div>
<div className={styles.nombreApellidos}>
<div>
    <label className={styles.nombre}></label>
    <input type="text" placeholder="Nombre" {...register("nombre")}/>
</div>
<div>
    <label className={styles.apellidos}></label>
    <input type="text" placeholder="Apellidos" {...register("apellidos")}/>
</div>
</div>
<div>
    <label className={styles.mail}></label>
    <input type="email" placeholder="E-mail" {...register("e-mail", { validate: mailValidator })} />
    {errors["e-mail"] && <p>{errors["e-mail"].message}</p>}
</div>
<div>
    <label className={styles.telefono}></label>
    <input type="text" placeholder="Telefono" {...register("telefono", {
      validate: phoneValidator
  })}/>
   {errors["telefono"] && <p>{errors["telefono"].message}</p>}
</div>
<label></label>
<select {...register("Tipo de establecimiento")}>
<option value="Tipo de establecimiento">Tipo de establecimiento</option>
        <option value="restaurante">Restaurante (cafeteria, brunch y panaderia, helados, zumos y smoothies...)</option>
        <option value="farmacia">Farmacia</option>
        <option value="tienda">Tienda (regalos, belleza, electronica, tienda de mascotas...)</option>
        <option value="lofisteria">Floristeria</option>
    </select>
<div className={styles.codigo}>
  <input type="checkbox" {...register("incluirCodigo")} />
  <label>¿Tienes un código promocional?</label> 
</div>
 {incluirCodigo && (
  <div className={styles.aplicar}> 
    <input type="text" placeholder="Codigo Promocional" {...register("codigo", {
      validate : promoCode
    })} /> 
    <button className={styles.aplicarbtn}>Aplicar</button>
  </div>
)} 
<div className={styles.whatsapp}>
  <input type="checkbox" {...register("whatsapp")} />
  <label>Acepto recibir actualizaciones de Gloton a tarves de WhatsApp o plataformas similares</label> 
</div>
<div className={styles.privacidad}>
  <input type="checkbox" {...register("privacidad",{ required: "Debe aceptar la política de privacidad" } )}/>
  <label>Acepto la politica de privacidad</label> 
  {errors.privacidad && <p>{errors.privacidad.message}</p>}
</div>
<div className={styles.submit}>
<button className={styles.submitbtn} type="submit" id={styles.miInputId} value="Empezar">Empezar</button>
</div>
        </form>
    </div>
    );
}



export default Formulario;

