import styles from "../ConfirmationPage/styles.module.css";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

export default function ConfirmationPage() {
  const { order, setOrder } = useContext(OrderContext);

  return (
    <div className={styles.viewport}>
      <h1>Tu pedido ha sido confirmado</h1>
      <div>
        <p>Detalle</p>
      </div>

      {order.map((e) => {
        return (
          <>
            {" "}
            <p>{e.ammount}</p>
            <p>{e.producto.nombre}</p>
            <p>{e.producto.precio}</p>
          </>
        );
      })}
    </div>
  );
}
