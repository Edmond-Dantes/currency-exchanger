import cn from "classnames";
import styles from "./Layout.module.css";

export function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export function LayoutColumnWrapper({ children }) {
  return <div className={styles.columnWrapper}>{children}</div>;
}

export function LayoutColumn({ children, oneThird }) {
  return (
    <div className={cn(styles.column, { [styles.columnOneThird]: oneThird })}>
      {children}
    </div>
  );
}
