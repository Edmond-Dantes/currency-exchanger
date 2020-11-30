import cn from "classnames";
import { Modal } from "components";
import styles from "./ConfirmationModal.module.css";

export function ConfirmationModal({ payment, ...rest }) {
  if (!payment) return <Modal {...rest}></Modal>;
  const { name, img, max, currency } = payment;
  return (
    <Modal {...rest}>
      <div className={styles.contentWrapper}>
        <div className={cn(styles.imageWrapper, styles.imageWrapperWithImage)}>
          <img className={styles.image} alt={name} src={img} />
        </div>
        <div className={styles.descriptionWrapper}>
          You can add value to a maximum of{" "}
          <strong className={styles.highlightedDescription}>{max}</strong> {currency} per
          transaction
        </div>
      </div>
    </Modal>
  );
}
