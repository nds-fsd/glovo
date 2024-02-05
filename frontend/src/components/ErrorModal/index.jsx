import Modal from "react-modal";
import styles from "./styles.module.css";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";

export default function ErrorModal({ error, isErrorModalOpen }) {
  return (
    <Modal
      parentSelector={() => document.querySelector("#root")}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      isOpen={isErrorModalOpen}
    >
      <div className={styles.mainContainer}>
        <img className={styles.crossIcon} src={crossIcon} alt="" />
        <p className={styles.errorText}>{error}</p>
      </div>
    </Modal>
  );
}
