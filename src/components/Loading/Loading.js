import cn from "classnames";
import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mask} />
      <div className={styles.container}>
        <div className={cn(styles.ball1, styles.circle)}></div>
        <div className={cn(styles.ball2, styles.circle)}></div>
        <div className={cn(styles.ball3, styles.circle)}></div>
        <div className={cn(styles.ball4, styles.circle)}></div>
        <div className={cn(styles.ball5, styles.circle)}></div>
        <div className={cn(styles.ball6, styles.circle)}></div>
      </div>
    </div>
  );
}
