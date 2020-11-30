import { useState } from "react";
import styles from "./CurrencySelector.module.css";
import cn from "classnames";

export function CurrencySelector({ defaultCurrency, items, onSelect }) {
  const [focuseditem, setFocuseditem] = useState(defaultCurrency);
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <SelectorItem
          key={item}
          content={item}
          onClick={() => {
            setFocuseditem(item);
            onSelect(item);
          }}
          focused={focuseditem === item}
        />
      ))}
    </ul>
  );
}

function SelectorItem({ content, onClick, focused }) {
  return (
    <li
      className={cn(styles.item, { [styles.focusedItem]: focused })}
      onClick={onClick}
    >
      {content}
      {focused && <span className={styles.itemTail}></span>}
    </li>
  );
}
