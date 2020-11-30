import cn from "classnames";
import styles from "./StepIndicator.module.css";

export function StepIndicator({ steps, onStepClick }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.connector}></div>
      <div className={styles.stepWrapper}>
        {steps.map(({ step, clickable, highlighted }) => (
          <span
            className={cn(styles.step, {
              [styles.clickable]: clickable,
              [styles.highlighted]: highlighted,
            })}
            onClick={() => {
              if (onStepClick && clickable) onStepClick(step);
            }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
