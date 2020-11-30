import cn from "classnames";
import styles from "./Modal.module.css";

export function Modal({ children, show, onAction, onClose }) {
  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {show && <div className={styles.mask} onClick={closeModal} />}
      <div className={cn(styles.wrapper, { [styles.show]: show })}>
        <div className={styles.content}>{children}</div>
        <div className={styles.buttonWrapper}>
          <button
            className={cn(styles.button, styles.closeButton)}
            onClick={closeModal}
          >
            Select another option
          </button>
          <button
            className={cn(styles.button, styles.actionButton)}
            onClick={() => {
              if (onAction) onAction();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}
