import { useMemo } from "react";
import cn from "classnames";
import styles from "./PaymentSelector.module.css";

const SLOT_LIMIT = 10;

export function PaymentSelector({ options, onSelect }) {
  const fillerSlots = useMemo(() => {
    const fillerSlots = [];
    for (let i = 0; i < SLOT_LIMIT - options.length; i++) {
      fillerSlots.push(null);
    }
    return fillerSlots;
  }, [options]);
  const slots = [...options, ...fillerSlots];
  return (
    <div className={styles.wrapper}>
      {slots.map((slot, index) => {
        if (!slot) return <div key={index} className={styles.imageWrapper} />;

        const { name, img } = slot;
        return (
          <div
            key={index}
            className={cn(styles.imageWrapper, styles.imageWrapperWithImage)}
            onClick={() => {
              if (onSelect) onSelect(slot);
              console.log(slot);
            }}
          >
            <img className={styles.image} alt={name} src={img} />
          </div>
        );
      })}
    </div>
  );
}
